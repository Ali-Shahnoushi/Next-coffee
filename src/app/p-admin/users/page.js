import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/users/table.module.css";
import Table from "@/components/templates/p-admin/users/Table";
import { connectToDB } from "@/configs/db";
import UserModel from "@/models/User";
import bannedModel from "@/models/Banned";

const page = async () => {
  connectToDB();
  const users = await UserModel.find({}).lean();
  const bannedUsers = await bannedModel.find({}).lean();

  return (
    <Layout>
      <main>
        {users.length === 0 ? (
          <p className={styles.empty}>کاربری وجود ندارد</p>
        ) : (
          <Table
            bannedUsers={JSON.parse(JSON.stringify(bannedUsers))}
            users={JSON.parse(JSON.stringify(users))}
            title="لیست کاربران"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
