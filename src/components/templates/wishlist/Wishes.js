"use client";

import useStore from "@/utils/store";
import React from "react";
import ProductCard from "@/components/modules//product/ProductCard";
import styles from "@/styles/wishlist.module.css";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";

export default function Wishes() {
  const { wishlist } = useStore();

  return (
    <>
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section>
          {wishlist?.length > 0 &&
            wishlist.map((wish) => (
              <ProductCard
                key={wish._id}
                _id={wish._id}
                title={wish.title}
                price={wish.price}
                score={wish.score}
                img={wish.img}
              />
            ))}
        </section>
      </main>

      {wishlist.length === 0 && (
        <div className={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}
    </>
  );
}
