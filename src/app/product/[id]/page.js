import ProductModel from "@/models/Product";
import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { authUser } from "@/utils/serverHelpers";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Tabs from "@/components/templates/product/Tabs";
import { connectToDB } from "@/configs/db";

const product = async ({ params }) => {
  const user = await authUser();

  connectToDB();

  const productID = params.id;
  const product = await ProductModel.findOne({ _id: productID }).populate(
    "comments"
  );

  const relatedProducts = await ProductModel.find({
    $and: [{ smell: product.smell }, { _id: { $ne: product._id } }],
  });

  return (
    <div className={styles.container}>
      <Navbar user={user ? user : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery img={product.img} />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts
          relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
        />
      </div>
      <Footer />
    </div>
  );
};

export default product;
