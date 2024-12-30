"use client";
import styles from "@/styles/login-register.module.css";
import { useState } from "react";
import { authTypes } from "@/utils/constants";

import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";

export default function LoginOrRegister() {
  const [authType, setAuthType] = useState(authTypes.LOGIN);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showloginForm = () => setAuthType(authTypes.LOGIN);

  return (
    <div className={styles.login_register}>
      <div className={styles.form_bg} data-aos="fade-up">
        {authType === authTypes.LOGIN ? (
          <Login showRegisterForm={showRegisterForm} />
        ) : (
          <Register showloginForm={showloginForm} />
        )}
      </div>
      <section>
        <img src="/images/forgot-password-bg.webp" alt="" />
      </section>
    </div>
  );
}