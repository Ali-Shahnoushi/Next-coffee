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

  const answerTicket = await TicketModel.findOne({
    mainTicket: tickets[0]._id,
  }).populate("user");

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

          {/* {!answerTicket ? (
            <div className={styles.empty}>
              <p>هنوز پاسخی دریافت نکردید</p>
            </div>
          ) : (
            <Answer
              {...JSON.parse(JSON.stringify(answerTicket))}
              type="admin"
            />
          )} */}

          <AnswerField ticketID={ticketID} />
        </div>
      </main>
    </Layout>
  );
};

export default page;
