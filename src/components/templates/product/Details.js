import { FaFacebookF, FaRegStar, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import AddToWishlist from "./AddToWishlist";

const Details = ({ product }) => {
  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb title={product.title} />
      <h2>{product.title}</h2>

      <div className={styles.rating}>
        <div className={styles.stars}>
          {Array(product.score)

          
            .fill(0)
            .map((i, id) => (
              <FaStar key={id} />
            ))}
          {Array(5 - +product.score)
            .fill(0)
            .map((i, id) => (
              <FaRegStar key={id} />
            ))}
        </div>
        <p>
          (دیدگاه{" "}
          {product.comments.filter((comment) => comment.isAccepted).length}{" "}
          کاربر)
        </p>
      </div>

      <p className={styles.price}>{product.price.toLocaleString()} تومان</p>
      <span className={styles.description}>{product.shortDescription}</span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button>افزودن به سبد خرید</button>
        <div>
          <span>-</span>1<span>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <AddToWishlist productID={product._id} />
        <div>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: {product._id}</strong>
        <p>
          <strong>برچسب:</strong> {product.tags.join(" ,")}
        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;
