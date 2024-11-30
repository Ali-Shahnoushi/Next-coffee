import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/products/table.module.css";
import Table from "@/components/templates/p-admin/products/Tables";
import ProductsModel from "@/models/Product";
import { connectToDB } from "@/configs/db";
import AddProduct from "@/components/templates/p-admin/products/AddProduct";

async function Page() {
  connectToDB();
  const products = await ProductsModel.find({});

  return (
    <AdminPanelLayout>
      <main>
        <AddProduct />
        {products.length === 0 ? (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        ) : (
          <Table
            products={JSON.parse(JSON.stringify(products))}
            title="لیست کامنت ها"
          />
        )}
      </main>
    </AdminPanelLayout>
  );
}

export default Page;
