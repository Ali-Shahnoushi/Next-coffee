import Layout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
// import connectToDB from "@/configs/db";
import { authUser } from "@/utils/serverHelpers";
import TicketModel from "@/models/Ticket";
import { connectToDB } from "@/configs/db";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const tickets = await TicketModel.find({ user: user._id, isAnswer: false })
    .populate("department", "title")
    .sort({ createdAt: "desc" })
    .lean();

  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;
