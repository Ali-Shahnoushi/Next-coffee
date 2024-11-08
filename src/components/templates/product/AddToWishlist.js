"use client";
import swal from "sweetalert";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";

export default function AddToWishlist({ productID }) {
  const [user, setUser] = useState(null);
  const [wishes, setWishes] = useState(null);
  useEffect(() => {
    const authUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        const data = await res.json();
        setUser({ ...data.user });
        setWishes([...data.wishes]);
      }
    };
    authUser();
  }, [addToWishlist]);

  async function addToWishlist(e) {
    e.preventDefault();

    if (!user?._id) {
      return swal({
        title: "خطا",
        icon: "error",
        timer: 1500,
        text: "لطفا برای ثبت علاقه‌مندی ابتدا وارد شوید",
        buttons: ["متوجه شدم"],
      });
    }

    const wish = {
      product: productID,
      user: user._id,
    };

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish),
    });

    if (res.status === 201) {
      swal({
        icon: "success",
        timer: 1500,
        text: "محصول به علاقه‌مندی شما افزوده شد",
        showConfirmButton: false,
        buttons: [""],
      });
    } else if (res.status === 202) {
      swal({
        icon: "success",
        timer: 1500,
        text: "محصول از علاقه‌مندی های شما حذف شد",
        showConfirmButton: false,
        buttons: [""],
      });
    }
  }
  return (
    <div onClick={addToWishlist}>
      {wishes?.some((wish) => wish.product === productID) ? (
        <>
          <FaHeart color="#f44" cursor="pointer" size={26}/>
        </>
      ) : (
        <>
          <CiHeart color="#f44" cursor="pointer"size={24} />
        </>
      )}
    </div>
  );
}
