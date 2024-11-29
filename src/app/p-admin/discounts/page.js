import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import Table from "@/components/templates/p-admin/discounts/Tables";
import DiscountModel from "@/models/Discount";
import { connectToDB } from "@/configs/db";
import AddDiscount from "@/components/templates/p-admin/discounts/AddDiscount";

async function Page() {
  connectToDB();
  const discounts = await DiscountModel.find({}).sort({ _id: -1 }).lean();

  return (
    <AdminPanelLayout>
      <main>
        <AddDiscount />

        {discounts.length === 0 ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <Table
            discounts={JSON.parse(JSON.stringify(discounts))}
            title="لیست تخفیف ها"
          />
        )}
      </main>
    </AdminPanelLayout>
  );
}

export default Page;
