import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Answer from "@/components/templates/p-admin/tickets/Answer";
import { connectToDB } from "@/configs/db";
import messageModel from "@/models/Message";
import AnswerField from "@/components/templates/p-admin/tickets/AnswerField";
import { revalidatePath } from "next/cache";

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
        </h1>

        <div
          style={{
            paddingBottom: "150px",
          }}
        >
          {tickets.map((ticket) => {
            return (
              <Answer
                type={ticket.user.role}
                {...JSON.parse(JSON.stringify(ticket))}
              />
            );
          })}
        </div>

        <AnswerField ticketID={ticketID} />
      </main>
    </Layout>
  );
};

export default page;
