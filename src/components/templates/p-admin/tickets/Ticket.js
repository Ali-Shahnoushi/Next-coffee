"use client";

import Link from "next/link";
import styles from "./ticket.module.css";
import swal from "sweetalert";

const Ticket = ({ _id, title, createdAt, department, status }) => {
  const closeTicket = async () => {
    const res = await fetch(`/api/tickets/close/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201)
      swal({
        icon: "success",
        timer: 1500,
        text: "تیکت با موفقیت بسته شد",
        showConfirmButton: false,
        buttons: [""],
      });
  };
  return (
    <Link
      href={`/p-admin/tickets/answer/${_id}`}
      className={styles.ticket}
      style={{ backgroundColor: status === "CLOSED" ? "#b1b1b1" : "unset" }}
    >
      <div>
        <p>{title}</p>
        <p className={styles.department}>{department.title}</p>
      </div>

      <div
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
        }}
      >
        <div>
          {status === "OPEN" && (
            <button
              style={{
                padding: "4px 8px",
                backgroundColor: "#d55",
                outline: 0,
                border: 0,
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                closeTicket();
              }}
            >
              بستن تیکت
            </button>
          )}
        </div>
        <div>
          <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
          <p className={status === "CLOSED" ? styles.answer : styles.no_answer}>
            {status === "CLOSED" ? "بسته شده" : "پاسخ داده نشده"}
          </p>
        </div>  
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
