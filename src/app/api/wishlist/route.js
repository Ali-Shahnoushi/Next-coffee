const { connectToDB } = require("@/configs/db");
import WishlistModel from "@/models/Wishlist";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    connectToDB();

    const body = await req.json();
    const { user, product } = body;

    //todo validation

    let wish = await WishlistModel.findOne({ user, product }).populate(
      "product"
    );

    if (wish) {
      await WishlistModel.findOneAndDelete({ user, product });

      return Response.json(
        { message: "این محصول از علاقه‌مندی های شما حذف شد", data: wish },
        { status: 202 }
      );
    }

    const productObject = await ProductModel.findOne({ _id: product });

    await WishlistModel.create({ user, product });

    return Response.json(
      { message: "علاقه مندی با موفقیت افزوده شد", data: productObject },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "server error in post a wishlist" },
      { status: 500 }
    );
  }
}
