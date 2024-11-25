import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";
import { connectToDB } from "@/configs/db";
import TicketModel from "@/models/Ticket";

const page = async ({ params }) => {
  const ticketID = params.id;
  connectToDB();
  const ticket = await TicketModel.findOne({ _id: ticketID }).populate(
    "user",
    "name"
  );

  const answerTicket = await TicketModel.findOne({ mainTicket: ticket._id });

  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>{ticket.title}</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>

        <div>
          <Answer type="user" {...JSON.parse(JSON.stringify(ticket))} />

          {!answerTicket ? (
            <div className={styles.empty}>
              <p>هنوز پاسخی دریافت نکردید</p>
            </div>
          ) : (
            <Answer
              {...JSON.parse(JSON.stringify(answerTicket))}
              type="admin"
            />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default page;
