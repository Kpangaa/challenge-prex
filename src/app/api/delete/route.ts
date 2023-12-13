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

    const userUpdate = await User.updateOne(
      {
        email: {
          $eq: email,
        },
      },
      {
        $pull: {
          myFilesUrl: url,
        },
      }
    );
    
    return NextResponse.json({
      success: true,
      message: "Imagen eliminada con exito!!!",
      user: userUpdate,
    });
  } catch (error) {
    return NextResponse.error()
  }
}
