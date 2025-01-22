import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import ProductModel from "@/models/Product";

export default async function Home() {
  const latestProducts = await ProductModel.find({}).sort({ _id: -1 }).limit(8);

  return (
    <>
      <Navbar />
      <Banner />
      <Latest products={JSON.parse(JSON.stringify(latestProducts))} />
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
