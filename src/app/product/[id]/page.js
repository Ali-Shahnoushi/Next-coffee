import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/auth";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Tabs from "@/components/templates/product/Tabs";

const product = async () => {
  const user = await authUser();

  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details />
          <Gallery />
        </div>
        <Tabs />
        <MoreProducts />
      </div>
      <Footer />
    </div>
  );
};

export default product;
