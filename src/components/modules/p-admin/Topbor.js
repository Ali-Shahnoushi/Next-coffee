"use client";

import useStore from "@/utils/store";
import styles from "./topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
const Topbar = () => {
  const { user } = useStore();
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div>
            <p>{user?.name}</p>
            <span>{user.role == "ADMIN" ? "ادمین" : "کاربر"}</span>
          </div>
          <img src="/images/admin.jpg" alt="" />
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <div className={styles.notification}>
            <IoIosNotifications />
            <span>2</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Topbar;
