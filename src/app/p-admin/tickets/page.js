import Layout from "@/components/layouts/AdminPanelLayout";
import Tickets from "@/components/templates/p-admin/tickets/Tickets";
// import connectToDB from "@/configs/db";
import { authUser } from "@/utils/serverHelpers";
import TicketModel from "@/models/Ticket";
import { connectToDB } from "@/configs/db";

const page = async () => {
  connectToDB();
  const tickets = await TicketModel.find({})
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
