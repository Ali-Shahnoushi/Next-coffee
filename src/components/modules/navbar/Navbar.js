"use client";

import React, { useEffect, useState } from "react";
import styles from "./Nabvar.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import useStore from "@/utils/store";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { user, wishlist, cart } = useStore();
  useEffect(() => {
    const stickNavbarTop = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 110) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    setCartCount(cart.reduce((sum, item) => sum + item.count, 0));

    window.addEventListener("scroll", stickNavbarTop);

    return () => {
      window.removeEventListener("scroll", stickNavbarTop);
    };
  }, [cart]);

  return (
    <nav className={isScrolled ? styles.navbar_fixed : styles.navbar}>
      <main>
        <div>
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" />
          </Link>
        </div>

        <ul className={styles.links}>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/category">فروشگاه</Link>
          </li>
          <li>
            <Link href="/blog">وبلاگ</Link>
          </li>
          <li>
            <Link href="/contact-us">تماس با ما</Link>
          </li>
          <li>
            <Link href="/about-us">درباره ما</Link>
          </li>
          <li>
            <Link href="/rules">قوانین</Link>
          </li>
          {!user ? (
            <li>
              <Link href="/login-register">ورود / عضویت</Link>
            </li>
          ) : (
            <div className={styles.dropdown}>
              <Link href="/p-user">
                <IoIosArrowDown className={styles.dropdown_icons} />
                عزیز <span>{user?.name}</span> !سلام
              </Link>
              <div className={styles.dropdown_content}>
                <Link href="/p-user/orders">سفارشات</Link>
                <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                <Link href="/p-user/comments">کامنت‌ها</Link>
                <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link>
                <Link href="/p-user/account-details">جزئیات اکانت</Link>
              </div>
            </div>
          )}
        </ul>

        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <FaShoppingCart color="#a5a5a5" />
            <span>{cartCount}</span>
          </Link>
          <Link href="/wishlist">
            <FaRegHeart color="#bb3333" />
            <span>{wishlist?.length ? wishlist.length : 0}</span>
          </Link>
        </div>
      </main>
    </nav>
  );
}

export default Navbar;
