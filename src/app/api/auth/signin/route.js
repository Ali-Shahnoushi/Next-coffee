import { connectToDB } from "@/configs/db";
const {
  validateEmail,
  validatePassword,
  validatePhone,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
} = require("@/utils/auth");
import UserModel from "@/models/User";

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

    await UserModel.findOneAndUpdate({ email }, { $set: { refreshToken } });

    return Response.json(
      { message: "کاربر با موفقیت وارد شد" },
      {
        status: 200,
        headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true;` },
      }
    );
  } catch (error) {
    console.log("error =>", error);

    return Response.json({ message: error }, { status: 500 });
  }
}
