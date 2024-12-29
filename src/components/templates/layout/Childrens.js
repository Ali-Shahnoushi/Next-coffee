"use client";

import useStore from "@/utils/store";
import { useEffect } from "react";

export default function Childrens({ children, user }) {
  const { setUser, setWishlist } = useStore();
  const userData = user?.name
    ? {
        name: user.name,
        id: user._id,
        wishlist: user.wishlist,
        email: user.email,
        phone: user.phone,
        role: user.role,
      }
    : null;
  useEffect(() => {
    setUser(userData);
    const allWishlistProducts = user?.wishlist?.map(
      (wishlist) => wishlist.product
    );

    // const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // setCart(cart);

    setWishlist(allWishlistProducts);
  }, []);

  return <>{children}</>;
}
