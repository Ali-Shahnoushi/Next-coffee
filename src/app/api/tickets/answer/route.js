import { connectToDB } from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/serverHelpers";
export async function POST(req) {
  try {
    connectToDB();

    const { title, body, department, subDepartment, priority, ticketID } =
      await req.json();

    const user = await authUser();

    await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
      hasAnswer: false,
      isAnswer: true,
      mainTicket: ticketID,
    });

    await TicketModel.findOneAndUpdate({ _id: ticketID }, { hasAnswer: true });

    return Response.json(
      { message: "answer sent successfuly!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
