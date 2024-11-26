"use client";

import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
export default function DataTable({ users, title, bannedUsers }) {
  const router = useRouter();

  const changeRole = async (userID) => {
    //todo validation

    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userID }),
    });
    if (res.status === 200) {
      swal({
        icon: "success",
        text: "نقش کاربر با موفقیت تغییر یافت",
        buttons: [""],
        timer: 1500,
      }).then(() => {
        router.refresh();
      });
    }
  };

  const removeUser = async (userID) => {
    //todo validation

    swal({
      icon: "warning",
      text: "آیا از حذف این کاربر اطمینان دارید؟",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/user/${userID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 200) {
          swal({
            icon: "success",
            text: "کاربر با موفقیت حذف شد",
            buttons: [""],
            timer: 1500,
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

  const banUser = async (email, phone) => {
    //todo validation

    swal({
      icon: "warning",
      text: "آیا از بن کردن این کاربر اطمینان دارید؟",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user/ban", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phone }),
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 200) {
          swal({
            icon: "success",
            text: "کاربر با موفقیت بن شد",
            buttons: [""],
            timer: 1500,
          }).then(() => {
            router.refresh();
          });
        }
      }
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
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                style={
                  bannedUsers.some(
                    (bannedUser) => bannedUser.phone === user.phone
                  )
                    ? { backgroundColor: "grey" }
                    : {}
                }
                key={user._id}
              >
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      changeRole(user._id);
                    }}
                    type="button"
                    className={styles.edit_btn}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      removeUser(user._id);
                    }}
                    type="button"
                    className={styles.delete_btn}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      banUser(user.email, user.phone);
                    }}
                    type="button"
                    className={styles.delete_btn}
                  >
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
