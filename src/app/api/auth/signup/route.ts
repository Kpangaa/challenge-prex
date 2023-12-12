import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDataBase } from "@/libs/mongodb";

export async function POST(request: Request) {
  try {
    await connectDataBase();

    const { email, password } = await request.json();

    if (password < 6)
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );

    const userFound = await User.findOne({ email });
    console.log("🚀 ~ file: route.ts:20 ~ POST ~ userFound:", userFound);

    if (userFound)
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    console.log(savedUser);

    return NextResponse.json(
      {
        email,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
        _id: savedUser._id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.error();
  }
}

export async function GET(request: Request) {
  try {
    await connectDataBase();
    let start = request.url.search("email");
    const params = new URLSearchParams(request.url.slice(start - 1));
    const email = params.get("email");
    const userFound = await User.findOne({ email });
    return NextResponse.json(userFound);
  } catch (error) {
    console.log(error);
  }
}
