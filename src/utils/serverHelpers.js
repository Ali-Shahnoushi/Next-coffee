import UserModel from "@/models/User";
import WishlistModel from "@/models/Wishlist";
import { cookies } from "next/dist/client/components/headers";
import { connectToDB } from "@/configs/db";
import { verifyToken } from "./auth";

const authUser = async () => {
  connectToDB();
  const token = cookies().get("token");

  let user = null;
  let wishlist = null;
  if (token) {
    const tokenPayload = verifyToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne(
        { email: tokenPayload.email },
        "-password -__v"
      );
      wishlist = await WishlistModel.find({ user: user._id })
        .populate("product", "title price score img")
        .lean();
    }
  }
  const userData = user?._doc
    ? {
        ...user._doc,
        wishlist,
      }
    : null;

  return userData;
};

const authAdmin = async () => {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });
      if (user.role === "ADMIN") {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export { authUser, authAdmin };
