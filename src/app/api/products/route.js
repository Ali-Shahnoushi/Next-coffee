const { connectToDB } = require("@/configs/db");
import ProductModel from "@/models/Product";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    connectToDB();
    const formData = await req.formData();
    const title = formData.get("title");
    const price = formData.get("price");
    const shortDescription = formData.get("shortDescription");
    const description = formData.get("description");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tags = formData.get("tags");
    const img = formData.get("img");

    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = String(Date.now()) + img.name;
    const imgPath = path.join(process.cwd(), "public/uploads/" + filename);

    await writeFile(imgPath, buffer);

    const product = await ProductModel.create({
      title,
      price,
      shortDescription,
      description,
      weight,
      suitableFor,
      smell,
      tags,
      img: `http://localhost:3000/uploads/${filename}`,
    });

    return Response.json(
      { message: "Product created successfully :))", data: product },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);

    return Response.json({ message: err }, { status: 500 });
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
