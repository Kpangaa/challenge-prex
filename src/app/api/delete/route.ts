import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectDataBase } from "@/libs/mongodb";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  console.log("🚀 ~ file: route.ts:7 ~ POST ~ data:", data)
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
    console.log("🚀 ~ file: route.ts:27 ~ POST ~ userUpdate:", userUpdate)

    return NextResponse.json({
      success: true,
      message: "Imagen eliminada con exito!!!",
      user: userUpdate,
    });
  } catch (error) {
    console.log(error);
  }
}