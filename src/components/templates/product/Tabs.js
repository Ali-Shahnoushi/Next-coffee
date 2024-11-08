"use client";
import React from "react";
import styles from "./tabs.module.css";
import { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "@/components/templates/product/Comments";
const Tabs = ({ product }) => {
  const [tab, setTab] = useState("description");
  return (
    <div data-aos="fade-left" className={styles.tabs}>
      <input
        onChange={() => setTab("description")}
        type="radio"
        id="description"
        name="tab-control"
        checked={tab == "description" ? "checked" : ""}
      />
      <input
        onChange={() => setTab("moreInfoes")}
        type="radio"
        id="moreInfoes"
        name="tab-control"
        checked={tab == "moreInfoes" ? "checked" : ""}
      />
      <input
        onChange={() => setTab("comments")}
        type="radio"
        id="comments"
        name="tab-control"
        checked={tab == "comments" ? "checked" : ""}
      />
      <ul>
        <li title="Features">
          <label htmlFor="description" role="button">
            {" "}
            توضیحات{" "}
          </label>
        </li>
        <li title="Delivery Contents">
          <label htmlFor="moreInfoes" role="button">
            {" "}
            اطلاعات بیشتر{" "}
          </label>
        </li>
        <li title="Shipping">
          <label htmlFor="comments" role="button">
            {" "}
            نظرات (
            {
              product.comments.filter((comment) => comment.isAccepted).length
            }){" "}
          </label>
        </li>
      </ul>

      <div className={styles.contents}>
        <section className={styles.tabs_content}>
          <Description desc={product.description} />
        </section>
        <section className={styles.tabs_content}>
          <MoreInfoes
            weight={product.weight}
            suitableFor={product.suitableFor}
            smell={product.smell}
          />
        </section>
        <section className={styles.tabs_content}>
          <Comments
            productId={product._id}
            title={product.title}
            comments={product.comments}
          />
        </section>
      </div>
    </div>
  );
};

export default Tabs;
