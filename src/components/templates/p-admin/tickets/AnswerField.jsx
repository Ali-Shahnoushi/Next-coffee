"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import swal from "sweetalert";

export default function AnswerField({ ticketID }) {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function sendAnswer() {
    const messageOBJ = {
      body: message,
      ticketID,
    };

    const res = await fetch("/api/tickets/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageOBJ),
    });

    if (res.status === 201) {
      setMessage("");
      return swal({
        icon: "success",
        text: "پاسخ با موفقیت ثبت شد",
        button: [""],
        timer: 1500,
      }).then(() => {
        router.refresh();
      });
    }

    if (res.status === 421) {
      setMessage("");
      return swal({
        icon: "error",
        text: "پاسخی وارد نکرده اید!",
        button: [""],
        timer: 1500,
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: "10px",
        width: "77%",
      }}
    >
      <button
        onClick={sendAnswer}
        style={{
          width: "20%",
          padding: "10px",
          backgroundColor: "#33aa66",
          color: "#fff",
          fontSize: "16px",
          outline: "none",
          border: "1px solid #d0d0d0",
          borderRadius: "8px",
          borderLeft: "0",
          marginLeft: "8px",
        }}
      >
        ارسال
      </button>
      <textarea
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        style={{
          width: "80%",
          padding: "14px",
          outline: "0",
          border: "1px solid #c0c0c0",
          borderRadius: "8px",
          backgroundColor: "#fff",
          color: "#222",
        }}
        type="text"
        rows="4"
        cols="50"
        placeholder="پاسخ خود را بنویسید..."
      ></textarea>
      {/* <input /> */}
    </div>
  );
}
