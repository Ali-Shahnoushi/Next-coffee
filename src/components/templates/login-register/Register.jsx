import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import swal from "sweetalert";
import toast from "react-hot-toast";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Register = ({ showloginForm }) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOTP, setIsRegisterWithOTP] = useState(false);
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    if (!name.trim()) toast.error("نام خود را وارد کنید");
    if (!password.trim()) toast.error("رمزعبور را وارد کنید");
    if (!phone.trim()) toast.error("شماره تلفن خود را وارد کنید");

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone && phone.trim())
      toast.error("یک شماره تلفن معتبر وارد کنید", { icon: "ℹ️" });

    const isValidEmail = validateEmail(email);
    if (!isValidEmail && email.trim())
      toast.error("یک ایمیل معتبر وارد کنید", { icon: "ℹ️" });

    const isValidPassword = validatePassword(password);
    if (!isValidPassword && password.trim())
      toast.error(
        "یک رمزعبور معتبر وارد کنید \n حداقل ۸ کاراکتر \n دارای حروف کوچک و بزرگ، عدد \n دارای کاراکتر های خاص",
        { icon: "ℹ️" }
      );

    if (
      !name.trim() ||
      !password.trim() ||
      !phone.trim() ||
      !isValidPhone ||
      !isValidPassword
    ) {
      return false;
    }

    const user = { name, email, phone, password };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log(res);

    if (res.status === 201) {
      setName("");
      setPassword("");
      setEmail("");
      setPhone("");

      swal({
        title: "ثبت نام با موفقیت انجام شد",
        icon: "success",
        buttons: "ورود به پنل کاربری",
      }).then(router.push("/"));
    }

    if (res.status === 422) {
      swal({
        title: "خطا",
        text: "کاربری با این ایمیل یا شماره تلفن قبلا ثبت شده است!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const hideOPTform = () => setIsRegisterWithOTP(false);

  return (
    <>
      {!isRegisterWithOTP ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="نام"
            />
            <input
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />
            {isRegisterWithPass && (
              <input
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="رمز عبور"
              />
            )}

            <p
              onClick={() => setIsRegisterWithOTP(true)}
              style={{ marginTop: "1rem" }}
              className={styles.btn}
            >
              ثبت نام با کد تایید
            </p>
            <button
              onClick={() => {
                if (isRegisterWithPass) {
                  signUp();
                  return;
                }
                setIsRegisterWithPass(true);
              }}
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p onClick={showloginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOPTform={hideOPTform} />
      )}
    </>
  );
};

export default Register;
