"use client";
import React, { useEffect } from "react";
import styles from "@/styles/p-user/accountDetails.module.css";
import swal from "sweetalert";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import useStore from "@/utils/store";

function AccountDetails() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { setUser, user } = useStore();

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      setName(data.user.name);
      // setEmail(data.email);
      setPhone(data.user.phone);
    };
    getUser();
  }, []);

  const updateUser = async () => {
    // Validation (You)

    const userNewInfos = {
      name,
      // email,
      phone,
    };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userNewInfos),
    });

    if (res.status === 200) {
      swal({
        button: [""],
        text: "اطلاعات حساب‌کاربری بروز شد",
        icon: "success",
        timer: 1500,
      }).then(async (result) => {
        setUser({ ...user, name, phone });
      });
    }
  };

  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span> جزئیات اکانت</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <div>
              <label>نام</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="لطفا نام خود را وارد کنید"
                type="text"
              />
            </div>
            {/* <div>
              <label>ایمیل</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="لطفا ایمیل خود را وارد کنید"
                type="text"
              />
            </div> */}
            <div>
              <label>شماره تماس</label>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
              />
            </div>
          </section>
          <section>
            <div className={styles.uploader}>
              <img src="/images/shahin.jpg" alt="" />
              <div>
                <div>
                  <button>
                    <IoCloudUploadOutline />
                    تغییر
                  </button>
                  <input type="file" name="" id="" />
                </div>
                <button>
                  <MdOutlineDelete />
                  حذف
                </button>
              </div>
            </div>
            <div>
              <label>رمز عبور</label>
              <div className={styles.password_group}>
                <input type="password" />
                <button>تغییر رمز عبور</button>
              </div>
            </div>
          </section>
        </div>
        <button
          type="submit"
          onClick={updateUser}
          className={styles.submit_btn}
        >
          ثبت تغییرات
        </button>
      </div>
    </main>
  );
}

export default AccountDetails;
