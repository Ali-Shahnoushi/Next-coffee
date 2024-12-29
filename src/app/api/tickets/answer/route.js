import { connectToDB } from "@/configs/db";
import messageModel from "@/models/Message";
import { authUser } from "@/utils/serverHelpers";
export async function POST(req) {
  try {
    connectToDB();

    const { body, ticketID } = await req.json();

    const user = await authUser();

    await messageModel.create({
      body,
      user: user._id,
      mainTicket: ticketID,
    });

    if (!body.trim()) {
      return Response.json({ message: "invalid data" }, { status: 421 });
    }

    return Response.json(
      { message: "answer sent successfuly!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
