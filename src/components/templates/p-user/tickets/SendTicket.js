"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/p-user/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function SendTicket() {
  const router = useRouter();

  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [departmentID, setDepartmentID] = useState(-1);
  const [subDepartmentID, setSubDepartmentID] = useState(-1);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);
  const [body, setBody] = useState("");

  useEffect(() => {
    const getAllDepartments = async () => {
      const res = await fetch("/api/departments");
      const data = await res.json();
      setDepartments([...data]);
    };

    getAllDepartments();
  }, []);

  useEffect(() => {
    const getAllSubDepartments = async () => {
      if (departmentID !== -1) {
        const res = await fetch(`/api/departments/sub/${departmentID}`);

        if (res.status === 200) {
          const data = await res.json();
          setSubDepartments([...data]);
        }
      }
    };

    getAllSubDepartments();
  }, [departmentID]);

  const sendTicket = async () => {
    // todo validation

    const ticket = {
      title,
      body,
      department: departmentID,
      subDepartment: subDepartmentID > 0 ? subDepartmentID : null,
      priority,
    };

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      setDepartments([]);
      setSubDepartments([]);
      setDepartmentID(-1);
      setSubDepartmentID(-1);
      setTitle("");
      setPriority(1);
      setBody("");
      swal({
        icon: "success",
        text: "تیکت با موفقیت ثبت شد",
        button: [""],
        timer: 1500,
      }).then(() => {
        router.push("/p-user/tickets");
      });
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>ارسال تیکت جدید</span>
        <Link href="/p-user/tickets"> همه تیکت ها</Link>
      </h1>

      <div className={styles.content}>
        <div className={styles.group}>
          <label>دپارتمان را انتخاب کنید:</label>
          <select
            onChange={(e) => {
              setDepartmentID(e.target.value);
            }}
          >
            <option value={-1}>لطفا یک دپارتمان را انتخاب نمایید.</option>
            {departments.map((department, i) => (
              <option key={i} value={department._id}>
                {department.title}
              </option>
            ))}
          </select>
        </div>
        {subDepartments.length > 0 && (
          <div className={styles.group}>
            <label>نوع تیکت را انتخاب کنید:</label>
            <select
              onChange={(e) => {
                setSubDepartmentID(e.target.value);
              }}
            >
              <option>لطفا یک مورد را انتخاب نمایید.</option>
              {subDepartments.map((department, i) => (
                <option key={i} value={department._id}>
                  {department.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.group}>
          <label>عنوان تیکت را وارد کنید:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان"
            type="text"
          />
        </div>
        <div className={styles.group}>
          <label>سطح اولویت تیکت را انتخاب کنید:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
            <option value={1}>کم</option>
            <option value={2}>متوسط</option>
            <option value={3}>بالا</option>
          </select>
        </div>
      </div>
      <div className={styles.group}>
        <label>محتوای تیکت را وارد نمایید:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
        ></textarea>
      </div>
      <div className={styles.uploader}>
        <span>حداکثر اندازه: 6 مگابایت</span>
        <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
        <input type="file" />
      </div>

      <button onClick={sendTicket} className={styles.btn}>
        <IoIosSend />
        ارسال تیکت
      </button>
    </main>
  );
}
