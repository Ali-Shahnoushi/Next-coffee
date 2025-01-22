import Link from "next/link";
import styles from "./ticket.module.css";
import MessageModel from "@/models/Message";

const Ticket = async ({ _id, title, createdAt, department, status }) => {
  const answer = await MessageModel.findOne({ mainTicket: _id })
    .sort({
      _id: -1,
    })
    .populate("user");

  const hasAnswer = answer.user.role === "ADMIN";

  return (
    <Link
      href={`/p-user/tickets/answer/${_id}`}
      className={styles.ticket}
      style={{ backgroundColor: status === "CLOSED" ? "#b1b1b1" : "unset" }}
    >
      <div>
        <p>{title}</p>
        <p className={styles.department}>{department.title}</p>
      </div>
      <div style={{ flexDirection: "row", padding: "0" }}>
        {status === "CLOSED" && (
          <span
            className={styles.no_answer}
            style={{
              backgroundColor: "#b11",
            }}
          >
            بسته شده
          </span>
        )}
        <div>
          <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
          <p className={hasAnswer ? styles.answer : styles.no_answer}>
            {hasAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}
          </p>
        </div>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
