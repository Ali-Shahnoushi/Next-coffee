import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import PayOrder from "@/components/templates/complate-order/PayOrder";
import { connectToDB } from "@/configs/db";
import OrderModel from "@/models/Order";
import styles from "@/styles/complate-order.module.css";
import { authUser } from "@/utils/serverHelpers";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const lastOrder = await OrderModel.findOne({ user: user._id }).sort({
    _id: -1,
  });

  if (!lastOrder) {
    redirect("/cart");
  }

  return (
    <>
      <Navbar />
      <Stepper step="complate" />
      <main className={styles.container} data-aos="fade-left">
        <div className={styles.box}>
          <ul>
            <li>شماره سفارش: {lastOrder._id}</li>
            <li>نام مشتری: {`${lastOrder.firstname} ${lastOrder.lastname}`}</li>
            <li>
              تاریخ: {new Date(lastOrder.updatedAt).toLocaleDateString("fa-IR")}
            </li>
            <li>
              {" "}
              قیمت نهایی:{" "}
              <strong>
                {" "}
                {lastOrder.totalAmount.toLocaleString()} تومان
              </strong>{" "}
            </li>
            <li>روش پرداخت: بانک ملی</li>
          </ul>
          <div>
            <PayOrder lastOrder={JSON.parse(JSON.stringify(lastOrder))} />
            <Link href={"/checkout"}>
              <button className={styles.cancel}> بازگشت</button>{" "}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default page;
