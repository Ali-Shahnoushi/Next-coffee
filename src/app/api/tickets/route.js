import { authUser } from "@/utils/serverHelpers";
const { connectToDB } = require("@/configs/db");
import ticketModel from "@/models/Ticket";
import messageModel from "@/models/Message";

export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();

    const reqBody = await req.json();
    const { title, body, department, subDepartment, priority } = reqBody;

    // todo validation (me)

    const mainTicket = await ticketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
    });

    await messageModel.create({
      body,
      user: user._id,
      mainTicket,
    });

    return Response.json(
      { message: "ticket created successfuly!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
