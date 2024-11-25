import { connectToDB } from "@/configs/db";
import UserModel from "@/models/User";
import { authUser } from "@/utils/serverHelpers";

export async function DELETE(req, { params }) {
  // return Response.json({ message: "________ DELETE API _________" });
  try {
    connectToDB();
    // const { id } = await req.json();
    // const { id } = body;
    // console.log("___req1 ", id);
    // Validation (You)

    await UserModel.findOneAndDelete({ _id: params.id });
    return Response.json({ message: "User removed successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}