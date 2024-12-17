"use client";

import useStore from "@/utils/store";
import React from "react";
import Table from "@/components/templates/cart/Table";
import Link from "next/link";
import styles from "@/styles/cart.module.css";
import { TbShoppingCartX } from "react-icons/tb";

export default function Cart() {
  const { cart } = useStore();
  return (
    <>
      {cart.length ? (
        <main className={styles.cart} data-aos="fade-up">
          <Table />
        </main>
      ) : (
        <div className={styles.cart_empty} data-aos="fade-up">
          <TbShoppingCartX />
          <p>سبد خرید شما در حال حاضر خالی است. </p>
          <span>
            قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.
          </span>
          <span>در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}
    </>
  );
}
