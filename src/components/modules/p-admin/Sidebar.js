"use client";
import styles from "./sidebar.module.css";
import { ImHome, ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms, MdLogout } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import swal from "sweetalert";
import useStore from "@/utils/store";

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const { setUser, setWishlist, setCart, user } = useStore();
  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        setUser(null);
        setWishlist([]);
        setCart([]);
        localStorage.clear();
        const res = await fetch("/api/auth/signout", {
          method: "POST",
        });
        if (res.status === 200) {
          swal({
            icon: "success",
            text: "با موفقیت از حساب خود خارج شدید",
            showConfirmButton: false,
            buttons: [""],
            timer: 1500,
          }).then(() => router.push("/"));
        }
      }
    });
  };
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <p>خوش اومدی {user?.name} عزیز</p>
      </div>
      <ul className={styles.sidebar_main}>
        {path.includes("/p-user") ? (
          <>
            <Link href={"/"}>
              <ImHome />
              صفحه اصلی
            </Link>
            <Link
              href={"/p-user"}
              className={path === "/p-user" ? styles.sidebar_link_active : ""}
            >
              <ImReply />
              پیشخوان
            </Link>
            <Link
              href={"/p-user/orders"}
              className={
                path === "/p-user/orders" ? styles.sidebar_link_active : ""
              }
            >
              <FaShoppingBag />
              سفارش ها
            </Link>
            <Link
              href={"/p-user/tickets"}
              className={
                path === "/p-user/tickets" ? styles.sidebar_link_active : ""
              }
            >
              <MdSms />
              تیکت های پشتیبانی
            </Link>
            <Link
              href={"/p-user/comments"}
              className={
                path === "/p-user/comments" ? styles.sidebar_link_active : ""
              }
            >
              <FaComments />
              کامنت ها
            </Link>
            <Link
              href={"/p-user/wishlist"}
              className={
                path === "/p-user/wishlist" ? styles.sidebar_link_active : ""
              }
            >
              <FaHeart />
              علاقه مندی
            </Link>
            <Link
              href={"/p-user/account-details"}
              className={
                path === "/p-user/account-details"
                  ? styles.sidebar_link_active
                  : ""
              }
            >
              <TbListDetails />
              جزئیات اکانت
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/p-admin"}
              className={path === "/p-admin" ? styles.sidebar_link_active : ""}
            >
              <ImReply />
              پیشخوان
            </Link>

            <Link
              href={"/p-admin/products"}
              className={
                path === "/p-admin/products" ? styles.sidebar_link_active : ""
              }
            >
              <FaShoppingBag />
              محصولات
            </Link>
            <Link
              href={"/p-admin/users"}
              className={
                path === "/p-admin/users" ? styles.sidebar_link_active : ""
              }
            >
              <FaUsers />
              کاربران
            </Link>
            <Link
              href={"/p-admin/comments"}
              className={
                path === "/p-admin/comments" ? styles.sidebar_link_active : ""
              }
            >
              <FaComments />
              کامنت ها
            </Link>

            <Link
              href={"/p-admin/tickets"}
              className={
                path === "/p-admin/tickets" ? styles.sidebar_link_active : ""
              }
            >
              <MdSms />
              تیکت ها
            </Link>
            <Link
              href={"/p-admin/discounts"}
              className={
                path === "/p-admin/discounts" ? styles.sidebar_link_active : ""
              }
            >
              <MdOutlineAttachMoney />
              تخفیفات
            </Link>
          </>
        )}
      </ul>
      <div className={styles.logout} onClick={logoutHandler}>
        <MdLogout />
        خروج
      </div>
    </aside>
  );
};

export default Sidebar;
