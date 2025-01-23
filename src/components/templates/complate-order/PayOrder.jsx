"use client";

import useStore from "@/utils/store";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

export default function PayOrder({ lastOrder }) {
  const { setCart, setDiscount } = useStore();

  const router = useRouter();

  const payOrder = async () => {
    swal({
      title: "آیا از پرداخت اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/order/paid/${lastOrder._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 402) {
          return swal({
            text: "پرداخت با خطا مواجه شد",
            icon: "error",
            buttons: [""],
            timer: 1500,
          });
        }
        if (res.status === 200) {
          return swal({
            text: "پرداخت با موفقیت انجام شد",
            icon: "success",
            buttons: [""],
            timer: 1500,
          }).then(() => {
            setCart([]);
            setDiscount("");
            router.push("/");
          });
        }
      }
    });
  };
  return <button onClick={payOrder}>پرداخت</button>;
}
