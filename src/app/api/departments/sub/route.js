const { connectToDB } = require("@/configs/db");
import departmentModel from "@/models/Department";
import subDepartmentModel from "@/models/SubDepartment";

export async function POST(req) {
  try {
    connectToDB();

    const reqBody = await req.json();
    const { title, department } = reqBody;

    // todo validation (me)

    await subDepartmentModel.create({ title, department });

    return Response.json(
      { message: "department created successfuly!" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}


