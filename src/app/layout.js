import AOSInit from "@/utils/aos";
import "./globals.css";
import ScrollToTop from "@/utils/SctollToTop";
import { Toaster } from "react-hot-toast";
import { connectToDB } from "@/configs/db";
import { authUser } from "@/utils/serverHelpers";
import Childrens from "@/components/templates/layout/Childrens";

export const metadata = {
  title:
    "خرید قهوه اینترنتی بن‌مانو | انواع دانه و پودر قهوه تازه با بهترین کیفیت و قیمت",
  description:
    "از فروشگاه آنلاین قهوه انواع پودر قهوه ترک، اسپرسو، فرانسه، کپسول اسپرسو، پودرهای نوشیدنی و قهوه‌ فوری را با بهترین قیمت خریداری کنید!",
  icons: { icon: "/images/favicon.webp" },
};

export default async function RootLayout({ children }) {
  connectToDB();
  const user = await authUser();

  return (
    <html lang="fa">
      <body>
        <AOSInit />
        <Childrens user={user}>{children}</Childrens>
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
