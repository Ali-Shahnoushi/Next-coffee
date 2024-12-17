import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import Cart from "@/components/templates/cart/Cart";
import { authUser } from "@/utils/serverHelpers";

const page = async () => {
  const user = await authUser();

  return (
    <>
      <Navbar user={user ? user : false} />
      <Stepper step="cart" />

      <Cart />

      <Footer />
    </>
  );
};

export default page;
