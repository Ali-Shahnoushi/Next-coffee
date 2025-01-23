"use client";

import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar, FaHeart } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import useStore from "@/utils/store";
import swal from "sweetalert";
import { useEffect, useState } from "react";

const ProductCard = ({ _id, title, price, score, img }) => {
  const validScore =
    typeof score === "number" && score >= 1 && score <= 5 ? score : 1;

  let wishlists = [];

  const { addItemToCart, addToWishlist, removeFromWishlist, wishlist } =
    useStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      wishlists = wishlist;
    }
  }, [isClient]);

  const cartItem = {
    id: _id,
    title,
    price,
    img,
    count: 1,
  };

  if (isClient)
    return (
      <Link href={`/product/${_id}`}>
        <div className={styles.card}>
          <div className={styles.details_container}>
            <img
              src={
                img ||
                "https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"
              }
              alt=""
            />{" "}
            <div className={styles.icons}>
              <span>
                <CiSearch />
                <p className={styles.tooltip}>مشاهده سریع</p>
              </span>
              <div
                onClick={async (e) => {
                  e.preventDefault();
                  const exist = wishlists.some(
                    (product) => product._id === _id
                  );
                  if (!exist) {
                    await addToWishlist({ _id, title, price, score, img });
                    swal({
                      icon: "success",
                      timer: 1500,
                      text: "محصول به علاقه‌مندی شما افزوده شد",
                      showConfirmButton: false,
                      buttons: [""],
                    });
                  } else {
                    swal({
                      icon: "success",
                      timer: 1500,
                      text: "محصول از علاقه‌مندی های شما حذف شد",
                      showConfirmButton: false,
                      buttons: [""],
                    });
                    removeFromWishlist(_id);
                  }
                }}
              >
                {wishlists.some((product) => product._id === _id) ? (
                  <FaHeart size={24} color="#f66" />
                ) : (
                  <CiHeart />
                )}
                <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addItemToCart(cartItem);
                swal({
                  icon: "success",
                  text: "محصول با موفقیت به سبد خرید اضافه شد",
                  timer: 1500,
                  buttons: [""],
                });
              }}
            >
              افزودن به سبد خرید
            </button>
          </div>

          <div className={styles.details}>
            <span>{title}</span>
            <div>
              {Array(validScore)
                .fill(0)
                .map((i, id) => (
                  <FaStar key={id} />
                ))}
              {Array(5 - validScore)
                .fill(0)
                .map((i, id) => (
                  <FaRegStar key={id} />
                ))}
            </div>
            <span>
              {price === 0 ? "رایگان" : price?.toLocaleString() + "تومان"}{" "}
            </span>
          </div>
        </div>
      </Link>
    );
};

export default ProductCard;
