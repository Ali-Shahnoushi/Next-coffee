import { connectToDB } from "@/configs/db";
import { authUser } from "@/utils/serverHelpers";
import wishlistModel from "@/models/Wishlist";
import product from "@/app/product/[id]/page";

export async function DELETE(req, { params }) {
  try {
    connectToDB();
    const user = await authUser();
    if (!user)
      return Response.json(
        { message: "you're not logged in" },
        { status: 401 }
      );

    const productID = params.id;
    await wishlistModel.findOneAndDelete({
      user: user._id,
      product: productID,
    });

    return Response.json({
      message: "product removed from wishlist successfuly!",
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
