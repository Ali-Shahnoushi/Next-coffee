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

export async function GET() {
  try {
    connectToDB();

    const now = new Date();
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastYearStart = new Date(now.getFullYear(), 0, 1);
    const lastYearEnd = new Date(now.getFullYear() + 1, 0, 1);
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Persian month names mapping
    const persianMonths = [
      "فروردین", // 1
      "اردیبهشت", // 2
      "خرداد", // 3
      "تیر", // 4
      "مرداد", // 5
      "شهریور", // 6
      "مهر", // 7
      "آبان", // 8
      "آذر", // 9
      "دی", // 10
      "بهمن", // 11
      "اسفند", // 12
    ];

    const monthlySales = await OrderModel.aggregate([
      {
        $match: {
          updatedAt: { $gte: lastYearStart, $lt: lastYearEnd },
        },
      },
      {
        $group: {
          _id: {
            $month: "$updatedAt",
          },
          totalSales: { $sum: "$totalAmount" },
        },
      },
    ]);

    const salesMap = new Map();
    monthlySales.forEach(({ _id, totalSales }) => {
      salesMap.set(_id, totalSales);
    });

    const monthlySalesFormatted = persianMonths.map((monthName, index) => ({
      date: monthName,
      sale: salesMap.get(index + 1) || 0,
    }));

    const lastMonthSales = await OrderModel.aggregate([
      {
        $match: {
          updatedAt: { $gte: lastMonthStart, $lt: lastMonthEnd }, // Filter for the last month
        },
      },
      {
        $group: {
          _id: null, // Group all documents into one
          totalSales: { $sum: "$totalAmount" }, // Sum total sales for the last month
        },
      },
    ]);

    const currentMonthSales = await OrderModel.aggregate([
      {
        $match: {
          updatedAt: { $gte: currentMonthStart, $lt: now }, // Filter for the current month
        },
      },
      {
        $group: {
          _id: null, // Group all documents into one
          totalSales: { $sum: "$totalAmount" }, // Sum total sales for the current month
        },
      },
    ]);

    const lastMonthName = persianMonths[(now.getMonth() - 1 + 12) % 12]; // Handle January (month 0)
    const currentMonthName = persianMonths[now.getMonth()];

    // 4. Format the result as [{ date: "month", sale: 5920000 }, { date: "month", sale: 7920000 }]
    const lastAndCurrentMonthSalesFormatted = [
      {
        date: lastMonthName,
        sale: lastMonthSales[0]?.totalSales || 0, // Use optional chaining in case there are no sales
      },
      {
        date: currentMonthName,
        sale: currentMonthSales[0]?.totalSales || 0,
      },
    ];

    return Response.json(
      {
        message: "get sells report successfuly.",
        monthlySalesFormatted,
        lastAndCurrentMonthSales: lastAndCurrentMonthSalesFormatted,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
