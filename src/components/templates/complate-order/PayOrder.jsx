"use client";

import useStore from "@/utils/store";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

<<<<<<< HEAD
export default function PayOrder() {
=======
export default function PayOrder({ lastOrder }) {
>>>>>>> 85628159c6abd6d530540a3f7202dcdd5bf9ce01
  const { setCart, setDiscount } = useStore();

  const router = useRouter();

  const payOrder = async () => {
    swal({
<<<<<<< HEAD
      title: "آیا از خروج اطمینان دارید؟",
=======
      title: "آیا از پرداخت اطمینان دارید؟",
>>>>>>> 85628159c6abd6d530540a3f7202dcdd5bf9ce01
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
<<<<<<< HEAD
        const res = await fetch(`/api/order/paid/${lastOrder._id}`);
=======
        const res = await fetch(`/api/order/paid/${lastOrder._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
>>>>>>> 85628159c6abd6d530540a3f7202dcdd5bf9ce01

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
