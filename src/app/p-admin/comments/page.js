import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/comments/table.module.css";
import Table from "@/components/templates/p-admin/comments/Tables";
import CommentModel from "@/models/Comment";
import { connectToDB } from "@/configs/db";

async function Page() {
  connectToDB();
  const comments = await CommentModel.find({})
    .populate("productID")
    .sort({ _id: -1 })
    .lean();

  return (
    <AdminPanelLayout>
      <main>
        {comments.length === 0 ? (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        ) : (
          <Table
            comments={JSON.parse(JSON.stringify(comments))}
            title="لیست کامنت ها"
          />
        )}
      </main>
    </AdminPanelLayout>
  );
}

export default Page;
