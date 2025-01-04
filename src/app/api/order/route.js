import { connectToDB } from "@/configs/db";
import OrderModel from "@/models/Order";
import ProductModel from "@/models/Product";
import DiscountModel from "@/models/Discount";
import { authUser } from "@/utils/serverHelpers";

export async function POST(req) {
  let totalPrice = 0;
  const validatedProducts = [];

  try {
    connectToDB();
    const user = await authUser();
    const reqBody = await req.json();
    const {
      products,
      discount,
      firstname,
      lastname,
      phone,
      state,
      city,
      address,
      postalCode,
      note,
    } = reqBody;

    if (!Array.isArray(products) || products.length === 0) {
      return Response.json(
        {
          error: "Products array is required and cannot be empty.",
        },
        { status: 400 }
      );
    }

    for (const item of products) {
      if (!item.product) {
        return Response.json(
          {
            error: "Each product must have a 'product' field.",
          },
          { status: 400 }
        );
      }

      if (
        !item.quantity ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0
      ) {
        return Response.json(
          {
            error: "Each product must have a valid 'quantity' field.",
          },
          { status: 400 }
        );
      }

      if (!item.price || typeof item.price !== "number" || item.price <= 0) {
        return Response.json(
          {
            error: "Each product must have a valid 'price' field.",
          },
          { status: 400 }
        );
      }

      const productData = await ProductModel.findById(item.product);
      if (!productData) {
        return Response.json(
          {
            error: `Product with ID ${item.product} not found.`,
          },
          { status: 404 }
        );
      }

      const productPrice = productData.price * item.quantity;
      totalPrice += productPrice;

      validatedProducts.push({
        product: item.product,
        quantity: item.quantity,
        price: productData.price,
      });
    }

    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !state.trim() ||
      !city.trim() ||
      !postalCode.trim()
    ) {
      return Response.json(
        { error: "invalid data or empty data!" },
        { status: 422 }
      );
    }

    // const totalPrice = products.reduce((sum, product) => {
    //   return sum + product.price * product.count;
    // }, 0);

    if (discount) {
      const discountData = await DiscountModel.findById(discount);
      const totalPriceDiscount =
        totalPrice -
        (totalPrice * discountData.percent) / 100 +
        (((totalPrice * discountData.percent) / 100) * 10) / 100 +
        30_000;

      const newOrder = await OrderModel.create({
        user: user._id,
        products: validatedProducts,
        totalAmount: totalPriceDiscount,
        firstname,
        lastname,
        phone,
        address,
        state,
        city,
        postalCode,
        discount,
        note,
      });

      return Response.json(
        { message: "order created successfully.", order: newOrder },
        { status: 201 }
      );
    }

    const newOrder = await OrderModel.create({
      user: user._id,
      products: validatedProducts,
      totalAmount: totalPrice + 30_000 + (totalPrice * 10) / 100,
      firstname,
      lastname,
      phone,
      address,
      state,
      city,
      postalCode,
      discount,
      note,
    });

    return Response.json(
      { message: "order created successfully.", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
