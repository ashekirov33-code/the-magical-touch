import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

function detectMimeType(buffer: Buffer, fallback: string) {
  if (buffer.length >= 12) {
    const isWebp =
      buffer[0] === 0x52 && // R
      buffer[1] === 0x49 && // I
      buffer[2] === 0x46 && // F
      buffer[3] === 0x46 && // F
      buffer[8] === 0x57 && // W
      buffer[9] === 0x45 && // E
      buffer[10] === 0x42 && // B
      buffer[11] === 0x50; // P

    if (isWebp) {
      return "image/webp";
    }
  }

  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }

  if (buffer.length >= 6) {
    const header = buffer.subarray(0, 6).toString("ascii");
    if (header === "GIF87a" || header === "GIF89a") {
      return "image/gif";
    }
  }

  return fallback;
}

type RouteProps = {
  params: Promise<{ path: string[] }>;
};

export async function GET(_: Request, { params }: RouteProps) {
  const resolvedParams = await params;
  let decodedParts: string[];

  try {
    decodedParts = resolvedParams.path.map((segment) => decodeURIComponent(segment));
  } catch {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const galleryRoot = path.resolve(process.cwd(), "gallery");
  const candidateParts = [decodedParts];

  if (decodedParts[0] === "gallery") {
    candidateParts.push(["gallery1", ...decodedParts.slice(1)]);
  }

  for (const parts of candidateParts) {
    const filePath = path.resolve(galleryRoot, ...parts);

    if (!filePath.startsWith(galleryRoot)) {
      continue;
    }

    try {
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) {
        continue;
      }

      const ext = path.extname(filePath).toLowerCase();
      const fallbackType = MIME_TYPES[ext] ?? "application/octet-stream";
      const buffer = await readFile(filePath);
      const contentType = detectMimeType(buffer, fallbackType);

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=86400, immutable",
        },
      });
    } catch {
      continue;
    }
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}