import { connectToDB } from "@/configs/db";
import CommentModel from "@/models/Comment";

export async function PUT(req) {
  try {
    connectToDB();
    const { id } = await req.json();
    
    await CommentModel.findOneAndUpdate({ _id: id }, { isAccepted: true });

    return Response.json({ message: "comment is accepted !" });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
