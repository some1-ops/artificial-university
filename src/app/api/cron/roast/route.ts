import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  // Check authorization header for Vercel Cron
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== \`Bearer \${process.env.CRON_SECRET}\`) {
  //   return new Response('Unauthorized', { status: 401 });
  // }

  try {
    // 1. Fetch users who haven't been active in 24 hours and have a streak > 0
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: inactiveUsers, error } = await supabase
      .from("users")
      .select("id, email, streak_count, stake_locked")
      .lt("last_active", yesterday.toISOString())
      .gt("streak_count", 0);

    if (error) {
      throw error;
    }

    if (!inactiveUsers || inactiveUsers.length === 0) {
      return NextResponse.json({ message: "No inactive users found. Everyone is grinding." });
    }

    const roastedUsers = [];

    // 2. Process penalties
    for (const user of inactiveUsers) {
      const penalty = Number(user.stake_locked || 0);

      // If they had money staked, forfeit it and add to platform community pool
      if (penalty > 0) {
        const { data: stats } = await supabase
          .from("platform_stats")
          .select("community_pool")
          .eq("id", 1)
          .single();
        
        const currentPool = Number(stats?.community_pool || 1430.00);
        const newPool = currentPool + penalty;

        await supabase
          .from("platform_stats")
          .update({ community_pool: newPool })
          .eq("id", 1);
      }

      await supabase
        .from("users")
        .update({
          streak_count: 0, // Reset streak
          stake_locked: 0.00,
          stake_status: "forfeited",
        })
        .eq("id", user.id);

      roastedUsers.push({
        id: user.id,
        email: user.email,
        penalty: `$${penalty.toFixed(2)}`,
        message: "Bro, you really paid $29 this month just to ghost the dashboard? The market doesn't care that you're tired. Log in and finish the OFM module before I drop your rank on the leaderboard."
      });
    }

    return NextResponse.json({
      success: true,
      roasted_count: roastedUsers.length,
      details: roastedUsers,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: "INTERNAL_SERVER_ERROR", message: err.message }, { status: 500 });
  }
}
