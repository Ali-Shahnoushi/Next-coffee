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

    setWishlist(allWishlistProducts);

    const refreshInterval = setInterval(async () => {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: user?.refreshToken }),
      });

      if (res.status !== 200) {
        console.error("Failed to refresh access token");
      }
    }, 60 * 55 * 1000); // Refresh every 1 hour

    return () => clearInterval(refreshInterval);
  }, []);

  return <>{children}</>;
}
