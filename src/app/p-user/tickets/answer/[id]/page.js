import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";
import { connectToDB } from "@/configs/db";
import TicketModel from "@/models/Ticket";
import messageModel from "@/models/Message";
import AnswerField from "@/components/templates/p-admin/tickets/AnswerField";

const page = async ({ params }) => {
  const ticketID = params.id;
  connectToDB();
  const tickets = await messageModel
    .find({ mainTicket: ticketID })
    .populate("user mainTicket", "name role")
    .populate("mainTicket");

  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>{tickets[0].mainTicket.title}</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>

        <div
          style={{
            paddingBottom: "150px",
          }}
        >
          {tickets.map((ticket) => (
            <Answer
              type={ticket.user.role}
              {...JSON.parse(JSON.stringify(ticket))}
            />
          ))}
          {tickets[0].mainTicket.status === "OPEN" ? (
            <AnswerField ticketID={ticketID} />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                bottom: "0px",
                width: "77%",
                fontSize: "18px",
                color: "#fff",
                padding: "12px 0",
                backgroundColor: "#0c6",
              }}
            >
              این تیکت بسته شده است
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default page;
