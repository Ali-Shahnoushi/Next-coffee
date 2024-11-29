import { connectToDB } from "@/configs/db";
import DiscountModel from "@/models/Discount";

export async function PUT(req) {
  const { code } = await req.json();
  try {
    connectToDB();

    //todo validation

    const discount = await DiscountModel.findOne({ code });

    if (!discount) {
      return Response.json({ message: "coupon not found !" }, { status: 404 });
    } else if (discount.uses === discount.maxUse) {
      return Response.json(
        { message: "coupon usage limit !" },
        { status: 422 }
      );
    } else {
      await DiscountModel.findOneAndUpdate({ code }, { $inc: { uses: 1 } });

      return Response.json(discount);
    }
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
