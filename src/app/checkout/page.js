import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import styles from "@/styles/checkout.module.css";
import { authUser } from "@/utils/serverHelpers";
import Link from "next/link";
import stylesDetail from "@/components/templates/checkout/details/details.module.css";
import OrderAndDetails from "@/components/templates/checkout/OrderAndDetails";

const page = async () => {
  const user = await authUser();

  return (
    <>
      <Navbar />
      <Stepper step="checkout" />
      <div className={styles.container} data-aos="fade-up">
        <main className={styles.checkout}>
          {user ? (
            <>
              <OrderAndDetails />
            </>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "30%",
                }}
                className={stylesDetail.create_account}
              >
                <h5
                  style={{
                    color: "#222",
                  }}
                >
                  ایجاد حساب کاربری
                </h5>
                <section>
                  <p
                    style={{
                      color: "#5e5e5e",
                    }}
                    r
                  >
                    برای ثبت سفارش ابتدا وارد شوید
                  </p>
                  <Link href="/login">
                    <button
                      style={{
                        backgroundColor: "#486",
                        color: "#fff",
                        borderRadius: "4px",
                      }}
                    >
                      ورود
                    </button>
                  </Link>
                </section>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default page;
