import { NextRequest, NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("rider-videos/")) {
          throw new Error("Invalid upload destination");
        }
        return {
          allowedContentTypes: ["video/mp4", "video/quicktime", "video/webm"],
          maximumSizeInBytes: 100 * 1024 * 1024,
          addRandomSuffix: true
        };
      },
      onUploadCompleted: async () => {
        // The final URL is attached to the inquiry when the contact form is submitted.
      }
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Rider video upload failed:", error);
    return NextResponse.json({ error: "Could not upload rider video" }, { status: 400 });
  }
}
