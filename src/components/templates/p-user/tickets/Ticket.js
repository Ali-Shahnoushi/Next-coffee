import Link from "next/link";
import styles from "./ticket.module.css";
import MessageModel from "@/models/Message";

const Ticket = async ({ _id, title, createdAt, department }) => {
  const answer = await MessageModel.findOne({ mainTicket: _id })
    .sort({
      _id: -1,
    })
    .populate("user");

  const hasAnswer = answer.user.role === "ADMIN";

  return (
    <Link href={`/p-user/tickets/answer/${_id}`} className={styles.ticket}>
      <div>
        <p>{title}</p>
        <p className={styles.department}>{department.title}</p>
      </div>
      <div>
        <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        <p className={hasAnswer ? styles.answer : styles.no_answer}>
          {hasAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}
        </p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
