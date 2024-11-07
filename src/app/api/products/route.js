const { connectToDB } = require("@/configs/db");
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const {
      title,
      price,
      shortDescription,
      description,
      weight,
      suitableFor,
      smell,
      tags,
    } = body;

    const product = await ProductModel.create({
      title,
      price,
      shortDescription,
      description,
      weight,
      suitableFor,
      smell,
      tags,
    });

    return Response.json(
      { message: "محصول با موفقیت ساخته شد", data: product },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "server error in post a product", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await ProductModel.find({}, "-__v").populate("comments");
    return Response.json(products);
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "server error in fetch all products", error },
      { status: 500 }
    );
  }
}
