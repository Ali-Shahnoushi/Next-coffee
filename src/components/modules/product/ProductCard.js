import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import useStore from "@/utils/store";
import swal from "sweetalert";

const ProductCard = ({ _id, title, price, score, img }) => {
  const validScore =
    typeof score === "number" && score >= 1 && score <= 5 ? score : 1;

  const { addItemToCart } = useStore();

  const cartItem = {
    id: _id,
    title,
    price,
    count: 1,
  };

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
            <div>
              <CiHeart />
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
