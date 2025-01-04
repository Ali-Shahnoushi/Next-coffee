import { connectToDB } from "@/configs/db";
import OrderModel from "@/models/Order";

export async function POST(req, { params }) {
  try {
    connectToDB();

    const orderID = params.id;

    if (!orderID.trim()) {
      return Response.json(
        { error: "order id is required !" },
        { status: 402 }
      );
    }

    await OrderModel.findOneAndUpdate(
      {
        _id: orderID,
      },
      { status: "DELIVERED" }
    );

    return Response.json({ message: "order delivered successfuly." });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
