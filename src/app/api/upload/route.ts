import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

import { v2 as cloudinary } from "cloudinary";
import { connectDataBase } from "@/libs/mongodb";

const {CLOUDINARY_API_SECRET_KEY, CLOUDINARY_API_KEY} = process.env

cloudinary.config({
  cloud_name: "dqcz2mhzo",
  api_key: CLOUDINARY_API_KEY ? CLOUDINARY_API_KEY : "197859677822312",
  api_secret: CLOUDINARY_API_SECRET_KEY ? CLOUDINARY_API_SECRET_KEY : "5EhtsCCO73fH-oS7Y_KesD25XyA",
});

interface ResponseCloudinary {
  public_id: string;
  version: number;
  width: number;
  height: number;
  format: string;
  type: string;
  url: string;
  secure_url: string;
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const email: string | null = data.get("email") as unknown as string;

  if (!file) {
    return NextResponse.json({ success: false });
  }
  try {
    await connectDataBase();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response: ResponseCloudinary = await new Promise(
      (resolve, rejects) => {
        cloudinary.uploader
          .upload_stream({}, (err, result) => {
            if (err) {
              rejects(err);
            }
            resolve(result as any);
          })
          .end(buffer);
      }
    );
    const url = response.secure_url;

    await User.findOneAndUpdate(
      {
        email: {
          $eq: email,
        },
      },
      {
        $addToSet: {
          myFilesUrl: url,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully!!!",
      url: (response as any).secure_url,
    });
  } catch (error) {
    NextResponse.error()
  }
}
