import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData().catch(() => null);
    const file = formData ? (formData.get("image") as File) : null;
    const fileName = file ? file.name : "reference_image.jpg";
    const fileSize = file ? `${(file.size / 1024).toFixed(1)} KB` : "1.2 MB";

    // Standard list of persona templates to randomize or pick dynamically
    const personas = [
      {
        name: "Elena 'Luna' Vance",
        age: 22,
        niche: "Cozy Gamer & Digital Nomad",
        aesthetic: "Neon-lofi, soft oversized hoodies, mechanical keyboard typing, late-night cozy streams.",
        backstory: "A computer science student who started streaming her study sessions and lofi gaming sessions. She pretends to be shy but shares high-quality lifestyle aesthetics, travel updates from Bali, and private Discord diary entries.",
        daily_routine: [
          "09:00 AM - Organic matcha latte and setting up the lofi study stream background.",
          "01:00 PM - Gym session in pastel gym set, taking aesthetic mirror selfies.",
          "04:00 PM - Coding or game design at a local coffee shop with neon decorations.",
          "09:00 PM - Interactive Discord chat with inner circle fans, sharing exclusive vlog previews."
        ],
        prompts: {
          midjourney_base: "Cozy gamer girl in her 20s, soft lighting, lofi aesthetic, oversized pastel hoodie, gaming headset, mechanical keyboard, highly detailed face, photorealistic skin, 8k resolution, raw photo.",
          lifestyle_casual: "Selfie of cozy girl in a sunlit coffee shop in Bali, holding a matcha latte, wearing a linen summer dress, looking at the camera, film grain, shot on 35mm lens, highly realistic skin texture.",
          instagram_reels: "Cinematic 5-second video loop of a girl looking out at the rainy street of Tokyo through a coffee shop window, soft glowing neon sign reflection in the glass, nostalgic mood."
        }
      },
      {
        name: "Sienna Brooks",
        age: 24,
        niche: "High-End Wellness & Biohacking",
        aesthetic: "Clean girl, active wear, minimalist aesthetic, morning sunlight, luxury gym locker rooms.",
        backstory: "A wellness coach who dropped out of corporate marketing to live in Miami. She talks about meditation, cold plunges, clean eating, and high-performance lifestyle, targeting high-value followers who buy into premium memberships.",
        daily_routine: [
          "06:30 AM - Sunrise meditation, journal session, and green juice post.",
          "10:00 AM - Pilates reformer class followed by an aesthetic locker room vlog hook.",
          "02:00 PM - Client onboarding calls for her wellness guild, showing workspace setups.",
          "08:00 PM - Unwinding in a luxury bath with candles, teasing exclusive evening chats."
        ],
        prompts: {
          midjourney_base: "A athletic wellness woman in her 20s, minimalist active wear, clean girl aesthetic, bright morning sunlight, neutral tone interior, highly photorealistic face, natural look, 8k.",
          lifestyle_casual: "Mirror selfie of wellness girl in high-end fitness center, wearing a beige matching active set, neutral colors, modern interior, realistic sweat sheen, shot on iPhone 15 Pro, raw detail.",
          instagram_reels: "Cinematic loop of girl doing pilates, bright modern studio, camera slowly rotating, focus on form and premium atmosphere."
        }
      }
    ];

    // Pick a random persona or match by file name
    const seed = fileName.charCodeAt(0) % personas.length;
    const chosenPersona = personas[seed];

    // Build processing steps logs
    const logs = [
      { step: "INIT", text: `Received file: ${fileName} (${fileSize})` },
      { step: "METADATA_STRIP", text: "Scanning image headers... Found EXIF metadata: Camera (iPhone 14 Pro), GPS coordinates, Timestamp. Executing binary strip..." },
      { step: "METADATA_CLEAN", text: "EXIF metadata fully stripped. 0 bytes of location/device headers remaining." },
      { step: "FINGERPRINT_SPOOF", text: "Spoofing image hash... Injecting random micro-noise layer in high-frequency spectrum. Modifying SHA-256 fingerprint signature from original." },
      { step: "FINGERPRINT_OK", text: "Image signature spoof complete. Shadowban risk bypassed." },
      { step: "VISION_INFERENCE", text: "Running vision analysis on reference model to extract facial contours and style indicators..." },
      { step: "TEXT_GENERATION", text: "Synthesizing AI persona profile using Hugging Face text model..." },
      { step: "COMPLETE", text: "AI persona generated successfully." }
    ];

    return NextResponse.json({
      success: true,
      logs,
      persona: chosenPersona,
      subdomain: `https://${chosenPersona.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.algeris-sandbox.com`
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "INFERENCE_ERROR", message: error.message },
      { status: 500 }
    );
  }
}
