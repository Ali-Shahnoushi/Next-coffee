import Image from "next/image";
import styles from "./answer.module.css";

const Answer = ({ type, body, createdAt, user }) => {
  return (
    <section
      className={type == "USER" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        <div>
          <div>
            <p>{user.name}</p>
            <span>{type == "USER" ? "" : "ادمین"}</span>
          </div>
          <Image
            style={{ height: "50px", width: "50px" }}
            width={100}
            height={100}
            src="/images/admin.jpg"
            alt={user.name}
          />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p style={{ whiteSpace: "pre-wrap" }}>{body}</p>
      </div>
    </section>
  );
};

export default Answer;
