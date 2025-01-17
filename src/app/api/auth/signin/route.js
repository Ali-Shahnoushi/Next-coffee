import { connectToDB } from "@/configs/db";
const {
  validateEmail,
  validatePassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
} = require("@/utils/auth");
import UserModel from "@/models/User";
import WishlistModel from "@/models/Wishlist";
import bannedModel from "@/models/Banned";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { phone, email, password } = body;

    const isValidEmail = validateEmail(email);

    //   const isValidPhone = validatePhone(phone);

    const isValidPassword = validatePassword(password);

    if (!isValidPassword || !isValidEmail) {
      return Response.json(
        { message: "ایمیل یا رمزعبور صحیح نیست" },
        { status: 419 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user)
      return Response.json(
        { message: "ایمیل یا رمزعبور صحیح نیست" },
        { status: 422 }
      );

    const isPasswordCorrect = await verifyPassword(password, user.password);

    if (!isPasswordCorrect) {
      return Response.json(
        { message: "ایمیل یا رمزعبور صحیح نیست" },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    const isUserBanned = await bannedModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (isUserBanned) {
      cookies().delete("token");

      return Response.json({ message: "user is banned !" }, { status: 403 });
    }

    await UserModel.findOneAndUpdate({ email }, { $set: { refreshToken } });
    const userWithoutPass = await UserModel.findOne(
      { email },
      "-password -__v -refreshToken"
    );
    const userWishlist = await WishlistModel.find({ user: userWithoutPass._id })
      .populate("product", "title price score img")
      .lean();

    const userData = userWithoutPass?._doc
      ? {
          ...userWithoutPass._doc,
          userWishlist,
        }
      : null;

    const headers = new Headers();

    headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true;`);

    return Response.json(
      { message: "کاربر با موفقیت وارد شد", data: userData },
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.log("error =>", error);

    return Response.json({ message: error }, { status: 500 });
  }
}
