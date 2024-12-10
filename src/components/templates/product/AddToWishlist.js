"use client";

import swal from "sweetalert";
import React, { useEffect, useCallback, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import useStore from "@/utils/store";

export default function AddToWishlist({ productID }) {
  const wishlist = useStore((state) => state.wishlist); // Access Zustand store
  const [isClient, setIsClient] = useState(false);

  const {
    user,
    setUser,
    addToWishlist: addToWishlists,
    removeFromWishlist,
  } = useStore();
  const [isLiked, setIsLiked] = useState(false);

  const addProductToWishlist = useCallback(
    async (e) => {
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
        const data = await res.json();
        await addToWishlists(data.data);
        setIsLiked(true);
        swal({
          icon: "success",
          timer: 1500,
          text: "محصول به علاقه‌مندی شما افزوده شد",
          showConfirmButton: false,
          buttons: [""],
        });
      } else if (res.status === 202) {
        const data = await res.json();
        swal({
          icon: "success",
          timer: 1500,
          text: "محصول از علاقه‌مندی های شما حذف شد",
          showConfirmButton: false,
          buttons: [""],
        });
        removeFromWishlist(data.data.product._id);
        setIsLiked(false);
      }
    },
    [user, productID]
  );

  useEffect(() => {
    if (isClient) {
      setIsLiked(
        wishlist.some((product) => product?._id === String(productID))
      );
    }
  }, [isClient, wishlist, productID]);

  useEffect(() => {
    const authUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        const data = await res.json();
        setUser({ ...data.user });
      }
    };
    authUser();
    setIsClient(true);
  }, []);

  if (isClient)
    return (
      <div onClick={addProductToWishlist}>
        {isLiked ? (
          <FaHeart color="#f44" cursor="pointer" size={26} />
        ) : (
          <CiHeart color="#f44" cursor="pointer" size={24} />
        )}
      </div>
    );
}
