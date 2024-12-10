import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/serverHelpers";
import { connectToDB } from "@/configs/db";
import useStore from "@/utils/store";
import React from "react";
import Product from "@/components/modules//product/ProductCard";
import styles from "@/styles/wishlist.module.css";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import Wishlist from "@/components/templates/wishlist/Wishes";

const page = async () => {
  connectToDB();
  const user = await authUser();

  return (
    <>
      <Navbar user={user ? user : false} />
      <Breadcrumb route={"علاقه مندی ها"} />
      <Wishlist />
      <Footer />
    </>
  );
};

export default page;
