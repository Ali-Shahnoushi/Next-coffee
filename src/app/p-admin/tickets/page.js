import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/tickets/table.module.css";
import Table from "@/components/templates/p-admin/tickets/Table";
import TicketModel from "@/models/Ticket";
import { connectToDB } from "@/configs/db";

async function Page() {
  connectToDB();
  const tickets = await TicketModel.find({})
    .populate("user department")
    .sort({ _id: -1 })
    .lean();

  return (
    <AdminPanelLayout>
      <main>
        {tickets.length === 0 ? (
          <p className={styles.empty}>تیکتی وجود ندارد</p>
        ) : (
          <Table
            tickets={JSON.parse(JSON.stringify(tickets))}
            title="لیست تیکت ها"
          />
        )}
      </main>
    </AdminPanelLayout>
  );
}

export default Page;
