"use client";
import stateData from "@/utils/stateData";
import styles from "./details.module.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import useStore from "@/utils/store";

const stateOptions = stateData();
const Details = ({ callback }) => {
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [citySelectedOption, setCitySelectedOption] = useState(null);
  const [citySelectorDisabel, setCitySelectorDisabel] = useState(true);
  const [cityOption, setCityOption] = useState([]);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState(null);

  const { user, cart, discount } = useStore();

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

  async function setDetails() {
    if (
      stateSelectedOption.trim() &&
      citySelectedOption.trim() &&
      lastname.trim() &&
      firstname.trim() &&
      address.trim() &&
      postalCode.trim() &&
      phone.trim() &&
      note.trim()
    ) {
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
        state,
        city,
        postalCode,
        discount,
        note,
      };
      callback(orderInfos);
    }
  }

  return (
    <div className={styles.details}>
      <p className={styles.details_title}>جزئیات صورتحساب</p>

      <form className={styles.form}>
        <div className={styles.groups}>
          <div className={styles.group}>
            <label>
              نام خانوادگی <span>*</span>
            </label>
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
            />
          </div>
          <div className={styles.group}>
            <label>
              نام <span>*</span>
            </label>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
            />
          </div>
        </div>
        <div className={styles.group}>
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
        <div className={styles.group}>
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
        <div className={styles.group}>
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
        <div className={styles.group}>
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
        <div className={styles.group}>
          <label>
            شماره موبایل <span>*</span>
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
          />
        </div>

        <div className={styles.destination}>
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
  );
};

export default Details;
