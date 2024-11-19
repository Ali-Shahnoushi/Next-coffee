import UserModel from "@/models/User";
import { cookies } from "next/dist/client/components/headers";
import { connectToDB } from "@/configs/db";
import { verifyToken } from "./auth";

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

export { authUser };
