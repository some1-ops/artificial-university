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
      // Deduct from stake if they break their streak (e.g., $1 penalty)
      const newStake = Math.max(0, user.stake_locked - 1);
      
      await supabase
        .from("users")
        .update({
          streak_count: 0, // Reset streak
          stake_locked: newStake,
        })
        .eq("id", user.id);

      // In a real app, trigger an email/SMS here using Resend or Twilio
      roastedUsers.push({
        id: user.id,
        email: user.email,
        penalty: "$1.00",
        message: "Wake up. Your streak is dead and your capital is bleeding. Get back in the Arena."
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
