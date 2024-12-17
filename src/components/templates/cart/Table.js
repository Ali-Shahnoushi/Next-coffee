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
  const [changeAddress, setChangeAddress] = useState(false);

  const { cart, removeFromCart, addItemToCart } = useStore();

  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [citySelectedOption, setCitySelectedOption] = useState(null);
  const [citySelectorDisable, setCitySelectorDisable] = useState(true);
  const [cityOption, setCityOption] = useState([]);

  useEffect(calcTotalPrice, [cart]);

  useEffect(() => {
    setCitySelectedOption(null);
    if (stateSelectedOption?.value) {
      const city = stateSelectedOption?.value.map((data) => {
        return {
          value: data,
          label: data,
        };
      });
      setCityOption(city);
      setCitySelectorDisable(false);
    } else {
      setCitySelectorDisable(true);
    }
  }, [stateSelectedOption]);

  function calcTotalPrice() {
    let price = 0;

    if (cart.length) {
      price = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
      setTotalPrice(price + 30000);
    }

    setTotalPrice(price + 30000);
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
            {cart.map((item, i) => (
              <tr key={i}>
                <td>{(item.count * item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span
                      onClick={() => {
                        removeFromCart(item.id);
                      }}
                    >
                      -
                    </span>
                    <p>{item.count}</p>
                    <span
                      onClick={() => {
                        addItemToCart(item);
                      }}
                    >
                      +
                    </span>
                  </div>
                </td>
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img src={item.img} alt="" />
                  <Link href={`/product/${item.id}`}>{item.title}</Link>
                </td>

                <td>
                  <IoMdClose
                    onClick={() => {
                      removeFromCart(item.id, true);
                    }}
                    className={styles.delete_icon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section>
          {/* <button className={styles.update_btn}> بروزرسانی سبد خرید</button> */}
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

        <div
          style={{ flexDirection: "column" }}
          className={totalStyles.subtotal}
        >
          {cart.map((item, i) => (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={i}
            >
              <p>{(item.count * item.price).toLocaleString()} تومان</p>
              <p>
                {item.title} × {item.count}
              </p>
            </span>
          ))}
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
            <Select
              defaultValue={citySelectedOption}
              onChange={setCitySelectedOption}
              isDisabled={citySelectorDisable}
              isClearable={citySelectorDisable}
              isRtl={true}
              isSearchable={true}
              options={cityOption}
              placeholder={"شهر"}
            />
            <input
              type="text"
              placeholder="کد پستی"
              maxLength={16}
              minLength={16}
            />
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
