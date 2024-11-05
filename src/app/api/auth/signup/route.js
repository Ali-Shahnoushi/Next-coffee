import { connectToDB } from "@/configs/db";
import UserModel from "@/models/User";
import {
  generateAccessToken,
  hashPassword,
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req) {
  try {
    connectToDB();

    const body = await req.json();
    const { name, email, phone, password } = body;

    const isValidPhone = validatePhone(phone);

    const isValidEmail = validateEmail(email);

    const isValidPassword = validatePassword(password);

    if (
      !name.trim() ||
      !password.trim() ||
      !phone.trim() ||
      !isValidPhone ||
      !isValidPassword ||
      (email.trim() && !isValidEmail)
    ) {
      return Response.json(
        {
          message: "اطلاعات ارسال شده به سمت سرور معتبر نیست",
        },
        { status: 423 }
      );
    }

    const isUserExist = email
      ? await UserModel.findOne({
          $or: [{ email }, { phone }],
        })
      : await UserModel.findOne({
          $or: [{ phone }],
        });

    if (isUserExist) {
      return Response.json(
        {
          message: "کاربری با این ایمیل یا شماره تلفن قبلا ثبت شده است!",
        },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const accessToken = generateAccessToken({ email });

    const users = await UserModel.find({});

    await UserModel.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role: users.length > 0 ? roles.USER : roles.ADMIN,
    });

    return Response.json(
      {
        message: "کاربر با موفقیت ثبت‌نام شد!",
      },
      {
        status: 201,
        headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true;` },
      }
    );
  } catch (error) {
    console.log(error);
    Response.json({ error });
  }
}
