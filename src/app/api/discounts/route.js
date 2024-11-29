const { connectToDB } = require("@/configs/db");
import DiscontModel from "@/models/Discount";

export async function POST(req) {
  try {
    connectToDB();
    const { code, percent, maxUse } = await req.json();

    await DiscontModel.create({ code, percent, maxUse });

    return Response.json(
      { message: "discount created successfuly!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
