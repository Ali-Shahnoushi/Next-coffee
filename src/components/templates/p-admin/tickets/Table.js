"use client";

import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
export default function DataTable({ tickets, title }) {
  const router = useRouter();

  const showTicketMessage = (body, username) => {
    swal({
      title: username,
      text: body,
      buttons: "خواندم",
    });
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr style={{}} key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.title}</td>
                <td>{ticket.user.name}</td>
                <td>{ticket.department.title}</td>
                <td>
                  <button
                    onClick={() => {
                      showTicketMessage(ticket.body, ticket.user.name);
                    }}
                    type="button"
                    className={styles.edit_btn}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
