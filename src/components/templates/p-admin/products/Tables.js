"use client";

import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
export default function DataTable({ products, title }) {
  const router = useRouter();

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
              <th>نام</th>
              <th>قیمت</th>
              <th>امتیاز</th>
              <th>مشاهده جزئیات</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr style={{}} key={product._id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.score}</td>
                <td>
                  <button
                    onClick={() => {
                      showTicketMessage(product.body, product.username);
                    }}
                    type="button"
                    className={styles.edit_btn}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      showTicketMessage(product.body, product.username);
                    }}
                    type="button"
                    className={styles.edit_btn}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      showTicketMessage(product.body, product.username);
                    }}
                    type="button"
                    className={styles.edit_btn}
                  >
                    حذف
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
