"use client";

import stateData from "@/utils/stateData";
import detailsStyles from "./details/details.module.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import useStore from "@/utils/store";
import orderStyles from "./order/order.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

const stateOptions = stateData();

export default function OrderAndDetails() {
  const [stateSelectedOption, setStateSelectedOption] = useState({
    label: "اصفهان",
  });
  const [citySelectedOption, setCitySelectedOption] = useState({
    value: "اصفهان",
  });
  const [citySelectorDisabel, setCitySelectorDisabel] = useState(true);
  const [cityOption, setCityOption] = useState([]);
  const [lastname, setLastname] = useState("محسنی");
  const [firstname, setFirstname] = useState("حسن");
  const [address, setAddress] = useState(
    "ملک شهر، خ انقلاب، ک مینا، مجتمع ستاره، واحد۳"
  );
  const [postalCode, setPostalCode] = useState("8196636416");
  const [phone, setPhone] = useState("09033144290");
  const [note, setNote] = useState("");

  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  const { user, cart, discount } = useStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && cart.length === 0) router.push("/cart");
  }, [isClient]);

  function calcTotalPrice() {
    let price = 0;

    if (cart.length) {
      price = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
    }

    return price;
  }

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
      setCitySelectorDisabel(false);
    }
  }, [stateSelectedOption]);

  async function checkout() {
    if (
      !stateSelectedOption?.label?.trim() ||
      !citySelectedOption?.value?.trim() ||
      !lastname?.trim() ||
      !firstname?.trim() ||
      !address?.trim() ||
      !postalCode?.trim() ||
      !phone?.trim()
    ) {
      return swal({
        text: "تمامی فیلد ها را پر کنید",
        icon: "warning",
        buttons: [""],
        timer: 1500,
      });
    }

    const orderInfos = {
      user: user.id,
      products: cart.map(({ count, id, price }) => ({
        quantity: count,
        product: id,
        price,
      })),
      firstname,
      lastname,
      phone,
      address,
      state: stateSelectedOption.label,
      city: citySelectedOption.value,
      postalCode,
      discount: discount?._id,
      note: note?.trim(),
    };

    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfos),
    });

    if (res.status === 201) {
      swal({
        text: "سفارش ثبت شد",
        icon: "success",
        buttons: [""],
        timer: 1500,
      }).then(() => {
        return router.push("/complate-order");
      });
    }
  }

  return (
    <>
      <div className={orderStyles.order}>
        <p className={orderStyles.title}>سفارش شما</p>
        <main className={orderStyles.main}>
          <div>
            <p>جمع جزء</p>
            <p>محصول</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {cart.map((item, i) => (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
                key={i}
              >
                <p>{(item.count * item.price).toLocaleString()} تومان</p>
                <p className={orderStyles.product_name}>
                  {item.title} × {item.count}
                </p>
              </span>
            ))}
          </div>
          {discount && (
            <div>
              <p>
                <strong>
                  {" "}
                  {(
                    (calcTotalPrice() * discount.percent) /
                    100
                  ).toLocaleString()}{" "}
                  تومان
                </strong>
              </p>
              <p>تخفیف</p>
            </div>
          )}
          <div>
            <p>
              پیک موتوری: <strong> 30,000 تومان</strong>
            </p>
            <p>حمل و نقل</p>
          </div>

          <div>
            <div>
              <h2>
                {discount
                  ? (
                      calcTotalPrice() -
                      (calcTotalPrice() * discount.percent) / 100 +
                      (10 * calcTotalPrice() * discount.percent) / 100 / 100 +
                      30000
                    ).toLocaleString()
                  : (
                      calcTotalPrice() +
                      (10 * calcTotalPrice()) / 100 +
                      30000
                    ).toLocaleString()}
                تومان
              </h2>
              <p>
                (شامل <strong>۱۰ ٪</strong> ارزش افزوده)
              </p>
            </div>
            <h3>مجموع</h3>
          </div>
        </main>
        <div className={orderStyles.transaction}>
          <div>
            <input type="radio" name="payment_method" value="melli" />
            <label> بانک ملی</label>
            <img
              width={24}
              height={40}
              src="https://set-coffee.com/wp-content/plugins/WooCommerce-melli/images/logo.png"
              alt="بانک ملی"
            ></img>
          </div>
          <div>
            <input type="radio" name="payment_method" value="zarinpal" />
            <label>پرداخت امن زرین پال </label>
            <img
              width={40}
              height={40}
              src="https://set-coffee.com/wp-content/plugins/zarinpal-woocommerce-payment-gateway/assets/images/logo.png"
              alt="زرین پال"
            ></img>
          </div>
          <div className={orderStyles.paymentBox}>
            <p>
              پرداخت امن به وسیله کلیه کارت های عضو شتاب از طریق درگاه زرین پال
            </p>
          </div>
          <div className={orderStyles.warning}>
            <p>
              اطلاعات شخصی شما برای پردازش سفارش و پشتیبانی از تجربه شما در این
              وبسایت و برای اهداف دیگری که در{" "}
              <strong>سیاست حفظ حریم خصوصی</strong> توضیح داده شده است استفاده
              می‌شود.
            </p>
          </div>
          <div className={orderStyles.accept_rules}>
            <input type="checkbox" name="" />
            <p>
              {" "}
              من<strong> شرایط و مقررات</strong> سایت را خوانده ام و آن را می
              پذیرم. <span>*</span>
            </p>
          </div>
          <button onClick={checkout} className={orderStyles.submit}>
            ثبت سفارش
          </button>{" "}
        </div>
      </div>
      <div className={detailsStyles.details}>
        <p className={detailsStyles.details_title}>جزئیات صورتحساب</p>

        <form className={detailsStyles.form}>
          <div className={detailsStyles.groups}>
            <div className={detailsStyles.group}>
              <label>
                نام <span>*</span>
              </label>
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
              />
            </div>
            <div className={detailsStyles.group}>
              <label>
                نام خانوادگی <span>*</span>
              </label>
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className={detailsStyles.group}>
            <label>
              استان<span>*</span>
            </label>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={""}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
            />
          </div>
          <div className={detailsStyles.group}>
            <label>
              شهر<span>*</span>
            </label>
            <Select
              defaultValue={citySelectedOption}
              onChange={setCitySelectedOption}
              isDisabled={citySelectorDisabel}
              isClearable={true}
              isRtl={true}
              isSearchable={true}
              options={cityOption}
              placeholder={""}
            />
          </div>
          <div className={detailsStyles.group}>
            <label>
              آدرس<span>*</span>
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              cols="30"
              rows="8"
              placeholder="آدرس را بنویسید"
            ></textarea>
          </div>
          <div className={detailsStyles.group}>
            <label>
              کدپستی (بدون فاصله)<span>*</span>
            </label>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              minLength={16}
              maxLength={16}
            />
          </div>
          <div className={detailsStyles.group}>
            <label>
              شماره موبایل <span>*</span>
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
            />
          </div>

          <div className={detailsStyles.destination}>
            <label>توضیحات سفارش (اختیاری) </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              cols="30"
              rows="8"
              placeholder="اگر توضیحی در مورد سفارش خود دارید در اینجا ثبت کنید"
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
}
