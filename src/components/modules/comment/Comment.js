import { FaRegStar, FaStar } from "react-icons/fa";

import styles from "./comment.module.css";
const Comment = ({ username, body, score, date }) => {
  return (
    <section className={styles.comment}>
      <img src="/images/admin.jpg" className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div style={{ margin: "0 4px" }} className={styles.user_info}>
            <strong>{username}</strong>
            <p> {new Date(date).toLocaleDateString("fa-IR")} </p>
          </div>
          <div className={styles.stars}>
            {Array(score)
              .fill(0)
              .map((i, id) => (
                <FaStar key={id} />
              ))}
            {Array(5 - +score)
              .fill(0)
              .map((i, id) => (
                <FaRegStar key={id} />
              ))}
          </div>
        </div>
        <p>{body}</p>
      </div>
    </section>
  );
};

export default Comment;
