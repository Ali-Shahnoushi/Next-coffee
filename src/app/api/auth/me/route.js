import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User";
import WishlistModel from "@/models/Wishlist";
const { connectToDB } = require("@/configs/db");
const { cookies } = require("next/headers");

export async function GET(req) {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    let wishes = null;
    const tokenPayload = verifyToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne(
        { email: tokenPayload.email },
        "-password -__v -refreshToken"
      );

      if (user) {
        wishes = await WishlistModel.find({ user: user._id });
      }

      return Response.json({ user, wishes });
    } else {
      return Response.json(
        { message: "شما سطح دسترسی لازم را ندارید" },
        { status: 401 }
      );
    }
  }
}
