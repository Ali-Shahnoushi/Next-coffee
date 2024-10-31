import "./globals.css";

export const metadata = {
  title:
    "خرید قهوه اینترنتی بن‌مانو | انواع دانه و پودر قهوه تازه با بهترین کیفیت و قیمت",
  description:
    "از فروشگاه آنلاین قهوه انواع پودر قهوه ترک، اسپرسو، فرانسه، کپسول اسپرسو، پودرهای نوشیدنی و قهوه‌ فوری را با بهترین قیمت خریداری کنید!",
  icons: { icon: "/images/favicon.webp" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>{children}</body>
    </html>
  );
}
