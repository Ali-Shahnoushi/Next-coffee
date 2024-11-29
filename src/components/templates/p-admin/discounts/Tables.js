"use client";

import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
export default function DataTable({ discounts, title }) {
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
              <th>کد</th>
              <th>درصد تخفیف</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount, index) => (
              <tr style={{}} key={discount._id}>
                <td>{index + 1}</td>
                <td>{discount.code}</td>
                <td>{discount.percent}</td>
                <td>{discount.maxUse}</td>
                <td>{discount.uses}</td>
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
