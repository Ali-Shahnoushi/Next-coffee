const { connectToDB } = require("@/configs/db");
import departmentModel from "@/models/Department";

export async function POST(req) {
  try {
    connectToDB();

    const reqBody = await req.json();
    const { title } = reqBody;

    // todo validation (me)

    await departmentModel.create({ title });

    return Response.json(
      { message: "department created successfuly!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    connectToDB();

    const departments = await departmentModel.find({});

    return Response.json(departments);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
