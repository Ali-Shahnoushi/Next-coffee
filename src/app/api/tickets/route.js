import { authUser } from "@/utils/serverHelpers";
const { connectToDB } = require("@/configs/db");
import ticketModel from "@/models/Ticket";

export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();

    const reqBody = await req.json();
    const { title, body, department, subDepartment, priority } = reqBody;

    // todo validation (me)

    await ticketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
    });

    return Response.json(
      { message: "ticket created successfuly!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
