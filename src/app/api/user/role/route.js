import { connectToDB } from "@/configs/db";
import userModel from "@/models/User";

export async function PUT(req) {
  try {
    connectToDB();

    const body = await req.json();

    const { id } = body;

    const user = await userModel.findOne({ _id: id });

    await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: user.role === "USER" ? "ADMIN" : "USER",
        },
      }
    );

    return Response.json({ message: "user role updated successfuly!" });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
