import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

const ClientPayloadSchema = z.object({
  horseSlug: z.string().min(1).max(120),
  type: z.enum(["PHOTO", "VIDEO_GENERAL", "VIDEO_COMPETITION", "VIDEO_TRAINING"]),
  alt: z.string().max(300).optional()
});

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid upload request" }, { status: 400 });
  }

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        let payload: unknown;
        try {
          payload = typeof clientPayload === "string" ? JSON.parse(clientPayload) : clientPayload;
        } catch {
          throw new Error("Invalid upload details");
        }
        const parsed = ClientPayloadSchema.safeParse(payload);
        if (!parsed.success) throw new Error("A valid horse and media type are required");

        const horse = await db.horse.findUnique({
          where: { slug: parsed.data.horseSlug },
          select: { id: true }
        });
        if (!horse) throw new Error("Horse not found");

        return {
          allowedContentTypes: parsed.data.type === "PHOTO" ? IMAGE_TYPES : VIDEO_TYPES,
          maximumSizeInBytes: 100 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            horseSlug: parsed.data.horseSlug,
            type: parsed.data.type,
            alt: parsed.data.alt ?? ""
          })
        };
      }
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Horse media upload token failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not start upload" },
      { status: 400 }
    );
  }
}
