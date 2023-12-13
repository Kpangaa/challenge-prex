import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectDataBase } from "@/libs/mongodb";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const url: string | null = data.get("url") as unknown as string;
  const email: string | null = data.get("email") as unknown as string;
  if (!url || !email) {
    return NextResponse.json({ success: false });
  }
  try {
    await connectDataBase();

    await User.findOneAndUpdate(
      {
        email: {
          $eq: email,
        },
      },
      {
        $addToSet: {
          shareFileUrl: url,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Imagen compartida con exito!!!",
      url,
    });
  } catch (error) {
    console.log(error);
  }
}
