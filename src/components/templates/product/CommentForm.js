import styles from "./commentForm.module.css";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import swal from "sweetalert";

const CommentForm = ({ productId }) => {
  const [body, setBody] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(1);
  const [isSaveUserData, setIsSaveUserData] = useState(false);

  useEffect(() => {
    const useraInfo = JSON.parse(localStorage.getItem("user-info"));
    if (useraInfo) {
      setUsername(useraInfo.username);
      setEmail(useraInfo.email);
    }
  }, []);

  const sendComment = async () => {
    if (isSaveUserData) {
      const userInfo = { username, email };

      localStorage.setItem("user-info", JSON.stringify(userInfo));
    }

    const comment = { productID: productId, username, body, score, email };

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    if (res.status === 201) {
      swal({
        timer: 1500,
        buttons: ["بسیارخب"],
        icon: "success",
        text: "نظر ثبت شد و پس از بررسی نمایش داده می‌شود",
      });
      setBody("");
      setUsername("");
      setEmail("");
      setScore(1);
    } else {
      swal({
        timer: 1500,
        buttons: ["بسیارخب"],
        icon: "error",
        title: "خطا",
        text: "خطایی هنگام ثبت نظر رخ داده",
      });
    }
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          <FaStar
            color={score >= 1 ? "gold" : "#d9d9d9"}
            onClick={() => setScore(1)}
          />
          <FaStar
            color={score >= 2 ? "gold" : "#d9d9d9"}
            onClick={() => setScore(2)}
          />
          <FaStar
            color={score >= 3 ? "gold" : "#d9d9d9"}
            onClick={() => setScore(3)}
          />
          <FaStar
            color={score >= 4 ? "gold" : "#d9d9d9"}
            onClick={() => setScore(4)}
          />
          <FaStar
            color={score >= 5 ? "gold" : "#d9d9d9"}
            onClick={() => setScore(5)}
          />
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
        ></textarea>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          value={isSaveUserData}
          onChange={() => {
            setIsSaveUserData((prev) => !prev);
          }}
        />
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button onClick={sendComment}>ثبت</button>
    </div>
  );
};

export default CommentForm;
