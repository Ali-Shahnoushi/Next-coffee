"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Select from "react-select";
import swal from "sweetalert";
import useStore from "@/utils/store";

const stateOptions = stateData();

const Table = () => {
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);

  const { cart, setCart } = useStore();

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  useEffect(calcTotalPrice, [cart]);

  function calcTotalPrice() {
    let price = 0;

    if (cart.length) {
      price = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
      setTotalPrice(price);
    }

    setTotalPrice(price);
  }

  const useDiscount = async () => {
    const res = await fetch("/api/discounts/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discount }),
    });

    if (res.status === 404) {
      return swal({
        buttons: ["تلاش مجدد"],
        icon: "error",
        text: "کد تخفیف وارد شده متعبر نیست",
      });
    } else if (res.status === 422) {
      return swal({
        buttons: ["تلاش مجدد"],
        icon: "error",
        text: "کد تخفیف وارد شده منقضی شده",
      });
    } else if (res.status === 200) {
      const discountCode = await res.json();
      const newPrice = totalPrice - (totalPrice * discountCode.percent) / 100;
      setTotalPrice(newPrice);
      return swal({
        buttons: [""],
        timer: 1500,
        icon: "success",
        text: "کد تخفیف با موفقیت اعمال شد",
      });
    }
  };

  return (
    <>
      {" "}
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th> جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr>
                <td>{(item.count * item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span>-</span>
                    <p>{item.count}</p>
                    <span>+</span>
                  </div>
                </td>
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
                    alt=""
                  />
                  <Link href={"/"}>{item.title}</Link>
                </td>

                <td>
                  <IoMdClose className={styles.delete_icon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
          <div>
            <button onClick={useDiscount} className={styles.set_off_btn}>
              اعمال کوپن
            </button>
            <input
              type="text"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
              placeholder="کد تخفیف"
            />
          </div>
        </section>
      </div>
      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء </p>
          <p>205,000 تومان</p>
        </div>

        <p className={totalStyles.motor}>
          {" "}
          پیک موتوری: <strong> 30,000 </strong>
        </p>
        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
          <span>حمل و نقل به تهران (فقط شهر تهران).</span>
        </div>
        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
            />
            <input type="text" placeholder="شهر" />
            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>
        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
