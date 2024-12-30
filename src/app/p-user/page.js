import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/templates/p-user/index/Box";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import { authUser } from "@/utils/serverHelpers";
import ticketModel from "@/models/Ticket";
import commentModel from "@/models/Comment";
import wishlistModel from "@/models/Wishlist";

const page = async () => {
  const user = await authUser();

  const tickets = await ticketModel
    .find({ user: user._id })
    .limit(3)
    .populate("department subDepartment")
    .sort({ createdAt: "desc" })
    .lean();

  const allTickets = await ticketModel.find({ user: user._id });
  const allComments = await commentModel.find({ user: String(user._id) });
  const AllWishlist = await wishlistModel.find({ user: user._id });

  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={allTickets.length} />
          <Box title="مجموع کامنت ها " value={allComments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={AllWishlist.length} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
