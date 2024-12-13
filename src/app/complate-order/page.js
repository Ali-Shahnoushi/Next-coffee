"use client"
import Footer from "@/components/modules/footer/Footer"
import Navbar from "@/components/modules/navbar/Navbar"
import Stepper from "@/components/modules/stepper/Stepper"
import styles from '@/styles/complate-order.module.css'  
import Link from "next/link"

const page = () => { 
    return (
        <>
            <Navbar />
            <Stepper step="complate" />
            <main className={styles.container} data-aos="fade-left">
                <div className={styles.box}>
                    <ul>
                        <li>شماره سفارش: 128387</li>
                        <li>تاریخ: ۰۵ بهمن ۱۴۰۲</li>
                        <li> قیمت نهایی: <strong> 230,000 تومان</strong> </li>
                        <li>روش پرداخت: بانک ملی</li> 
                    </ul>
                    <div>
                         <button>پرداخت</button>
                         <Link href={'/checkout'}><button> بازگشت</button> </Link>
                        </div>
                </div>

            </main>

            <Footer />
        </>
    )
}

export default page
