const { connectToDB } = require("@/configs/db");
import TicketModel from "@/models/Ticket";

export async function POST(req, { params }) {
  try {
    connectToDB();
    // const user = await authUser();
    // const admin = await authAdmin();

    const ticketID = params.id;

    // todo validation (me)

    const ticket = await TicketModel.findOneAndUpdate(
      { _id: ticketID },
      { status: "CLOSED" }
    );

    if (!ticket) {
      return Response.json(
        { message: "ticket id not found !" },
        { status: 403 }
      );
    }

    return Response.json(
      { message: "ticket closed successfuly!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return Response.json({ message: error }, { status: 500 });
  }
}
