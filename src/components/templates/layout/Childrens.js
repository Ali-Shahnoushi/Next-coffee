"use client";

import useStore from "@/utils/store";
import { useEffect } from "react";

export default function Childrens({ children, user }) {
  const { setUser, setWishlist } = useStore();
  const userData = {
    name: user.name,
    wishlist: user.wishlist,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
  useEffect(() => {
    setUser(userData);
    const allWishlistProducts = user.wishlist.map(
      (wishlist) => wishlist.product
    );

    setWishlist(allWishlistProducts);
  }, []);

  return <>{children}</>;
}
