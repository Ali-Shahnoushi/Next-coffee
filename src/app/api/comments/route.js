const { connectToDB } = require("@/configs/db");
import CommentModel from "@/models/Comment";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const { username, body, email, score, productID } = reqBody;

    //todo validation

    const comment = await CommentModel.create({
      username,
      body,
      email,
      score,
      productID,
    });

    const updateProduct = await ProductModel.findOneAndUpdate(
      { _id: productID },
      {
        $push: {
          comments: comment._id,
        },
      }
    );

    return Response.json(
      { message: "کامنت با موفقیت ساخته شد", data: comment },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "server error in post a comment", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    connectToDB();
    const comments = await CommentModel.find({}, "-__v");
    await CommentModel.findOneAndUpdate({}, { isAccepted: true });
    return Response.json(comments);
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "server error in fetch all comments", error },
      { status: 500 }
    );
  }
}
