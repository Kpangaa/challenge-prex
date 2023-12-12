import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    myFilesUrl: {
      type: Array,
    },
    shareFileUrl: { type: Array },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);
export default User;
