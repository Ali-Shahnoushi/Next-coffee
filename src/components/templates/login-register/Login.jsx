import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import toast from "react-hot-toast";
import { validateEmail } from "@/utils/auth";
const Login = ({ showRegisterForm }) => {
  const [isLoginWithOPT, setIsLoginWithOPT] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const hideOPTform = () => setIsLoginWithOPT(false);

  const loginWithPassword = async () => {
    if (!phoneOrEmail.trim()) toast.error("ایمیل خود را وارد کنید");
    if (!password.trim()) toast.error("رمزعبور را وارد کنید");
    const isValidEmail = validateEmail(phoneOrEmail);
    if (!isValidEmail && phoneOrEmail.trim())
      toast.error("یک ایمیل معتبر وارد کنید", { icon: "ℹ️" });

    if (!phoneOrEmail.trim() || !password.trim() || !isValidEmail) {
      return false;
    }

    const user = { email: phoneOrEmail.trim(), password: password.trim() };

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log(res);

    if (res.status === 200) toast.success("با موفقیت وارد شدید");
    if ([422, 419, 401].includes(res.status))
      toast.error("ایمیل یا رمزعبور صحیح نمی‌باشد");
  };

  const loginWithPhone = () => {};

  return (
    <>
      {!isLoginWithOPT ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="ایمیل / شماره موبایل"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button onClick={loginWithPassword} className={styles.btn}>
              ورود
            </button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              onClick={() => setIsLoginWithOPT(true)}
              className={styles.btn}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button onClick={showRegisterForm} className={styles.btn_light}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <>
          <Sms hideOPTform={hideOPTform} />
        </>
      )}
    </>
  );
};

export default Login;
