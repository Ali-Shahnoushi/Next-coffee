const { connectToDB } = require("@/configs/db");
import WishlistModel from "@/models/Wishlist";

export async function POST(req) {
  try {
    connectToDB();

    const body = await req.json();
    const { user, product } = body;

    //todo validation

    const wish = await WishlistModel.findOne({ user, product });

    if (wish) {
      await WishlistModel.findOneAndDelete({ user, product });

      return Response.json(
        { message: "این محصول از علاقه‌مندی های شما حذف شد" },
        { status: 202 }
      );
    } else {
      await WishlistModel.create({ user, product });

      return Response.json(
        { message: "علاقه مندی با موفقیت افزوده شد" },
        { status: 201 }
      );
    }

  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "server error in post a wishlist" },
      { status: 500 }
    );
  }
}
