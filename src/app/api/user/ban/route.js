import { connectToDB } from "@/configs/db";
import BannedModel from "@/models/Banned";
import UserModel from "@/models/User";
export async function POST(req) {
  try {
    connectToDB();

    const body = await req.json();

    const { email, phone } = body;

    await BannedModel.create({ email, phone });

    // const user = await UserModel.findOne({
    //   $or: [{ email }, { phone }],
    // });

    // await UserModel.findOneAndDelete({
    //   $or: [{ email: user.email }, { phone: user.phone }],
    // });

    return Response.json({ message: "user banned successfuly!" });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
