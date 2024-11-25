import { connectToDB } from "@/configs/db";
import subDepartmentModel from "@/models/SubDepartment";
import { isValidObjectId } from "mongoose";

export async function GET(req, { params }) {
  try {
    connectToDB();

    const id = params.id;

    if (!isValidObjectId(id)) {
      return Response.json(
        { message: "invalid depratment id!" },
        { status: 422 }
      );
    }

    const subDepartment = await subDepartmentModel.find({ department: id });

    return Response.json(subDepartment);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
