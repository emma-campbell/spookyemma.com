import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export const GET = async (req: NextRequest) => {
  try {
    const filePath = path.join(process.cwd(), 'public/images/seo/seoDefaults/ogImage.png');
    const imageBuffer = await fs.readFile(filePath);
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("Error serving OG Image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
