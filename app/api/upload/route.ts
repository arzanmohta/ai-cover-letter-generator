// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, Fields, Files } from "formidable";
import { extractTextFromFile } from "../../../lib/extractText";
import fs from "fs";

export const dynamic = "force-dynamic"; // ensure API route works in Next.js

export async function POST(req: NextRequest) {
  const form = new IncomingForm({
    multiples: false,
    uploadDir: "/tmp",
    keepExtensions: true,
  });

  return new Promise<NextResponse>((resolve) => {
    form.parse(req as any, async (err, fields: Fields, files: Files) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: err.message }, { status: 500 })
        );
      }

      try {
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        if (!file) {
          return resolve(
            NextResponse.json({ error: "No file uploaded" }, { status: 400 })
          );
        }

        const text = await extractTextFromFile(
          file.filepath || (file as any).path,
          file.mimetype || ""
        );

        resolve(NextResponse.json({ text }));
      } catch (e: any) {
        resolve(
          NextResponse.json({ error: e.message }, { status: 500 })
        );
      }
    });
  });
}
