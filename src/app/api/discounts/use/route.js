import { connectToDB } from "@/configs/db";
import DiscountModel from "@/models/Discount";
import OrderModel from "@/models/Order";
import { authUser } from "@/utils/serverHelpers";

export async function PUT(req) {
  const { code } = await req.json();
  try {
    connectToDB();

    //todo validation
    const user = await authUser();

    const discount = await DiscountModel.findOne({ code });

    const isUsed = await OrderModel.findOne({
      user: user._id,
      discount: discount._id,
    });

    if (!discount) {
      return Response.json({ message: "coupon not found !" }, { status: 404 });
    } else if (discount.uses === discount.maxUse) {
      return Response.json(
        { message: "coupon usage limit !" },
        { status: 422 }
      );
    } else if (isUsed) {
      return Response.json({ message: "this code is used !" }, { status: 423 });
    } else {
      await DiscountModel.findOneAndUpdate({ code }, { $inc: { uses: 1 } });

      return Response.json(discount);
    }
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
