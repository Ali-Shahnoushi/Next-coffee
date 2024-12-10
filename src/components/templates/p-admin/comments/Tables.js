"use client";

import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
export default function DataTable({ comments, title }) {
  const router = useRouter();

  const showTicketMessage = (body, username) => {
    swal({
      title: username,
      text: body,
      buttons: "خواندم",
    });
  };

  const acceptComment = async (commentID) => {
    const res = await fetch("/api/comments/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    const data = await res.json();

    if (res.status === 200) {
      swal({
        icon: "success",
        text: "تایید کامنت با موفقیت انجام شد",
        buttons: [""],
        timer: 1500,
      }).then(() => {
        router.refresh();
      });
    }
  };

  const rejectComment = async (commentID) => {
    const res = await fetch("/api/comments/reject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      swal({
        icon: "success",
        text: "این کامنت مسدود شد",
        buttons: [""],
        timer: 1500,
      }).then(() => {
        router.refresh();
      });
    }
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
              <th>ایمیل</th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>تاریخ ثبت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>پاسخ</th>
              <th>تایید\رد</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr style={{}} key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td>{comment.score}</td>
                <td>{comment.productID.title}</td>
                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                <td>
                  <button
                    onClick={() => {
                      showTicketMessage(comment.body, comment.username);
                    }}
                    type="button"
                    className={styles.edit_btn}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {}}
                    type="button"
                    className={styles.edit_btn}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {}}
                    type="button"
                    className={styles.delete_btn}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  {comment.isAccepted ? (
                    <button
                      onClick={() => {
                        rejectComment(comment._id);
                      }}
                      type="button"
                      className={styles.delete_btn}
                    >
                      رد
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        acceptComment(comment._id);
                      }}
                      type="button"
                      className={styles.delete_btn}
                    >
                      تایید
                    </button>
                  )}
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
