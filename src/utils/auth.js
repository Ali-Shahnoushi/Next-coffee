import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import UserModel from "@/models/User";
import { cookies } from "next/dist/client/components/headers";
import { connectToDB } from "@/configs/db";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
};

const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "60d",
  });

  return token;
};

const verifyToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
    return tokenPayload;
  } catch (error) {
    console.log("verify access token has a error =>", error);
    return false;
  }
};

const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: "15d",
  });

  return token;
};

const validateEmail = (email) => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;

  return pattern.test(email);
};

const validatePhone = (phone) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;

  return pattern.test(phone);
};

const validatePassword = (password) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;

  return pattern.test(password);
};

const authUser = async () => {
  connectToDB();
  const token = cookies().get("token");

  let user = null;
  if (token) {
    const tokenPayload = verifyToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });
    }
  }

  return user;
};

export {
  hashPassword,
  verifyPassword,
  authUser,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  validateEmail,
  validatePhone,
  validatePassword,
};
