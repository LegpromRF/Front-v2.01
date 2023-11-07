import Layout from "@/src/layout/Layout";

import Head from "next/head";
import Link from "next/link";

import styles from './ArchiveOrders.module.scss'

import TitleProfile from "@/src/components/TitleProfile/TitleProfile";
import HeaderProfile from "@/src/components/HeaderProfile/HeaderProfile"
import Status from "@/src/components/Status/Status";
import OrdersCard from "@/src/components/OrdersCard/OrdersCard";

const ArchiveOrders = () => {
  return ( 
    <>
    <Head>
      <title>Архивные заказы - LegpromRF</title>
    </Head>
    <Layout>
      <div className={styles.archive}>
        <TitleProfile>Архивные заказы</TitleProfile>
        <div className={styles.archive__header}>
          <div className={styles.archive__list}>
            <HeaderProfile title="Все заказы" number="1" href='/profile/orders' active={false}/>
            <HeaderProfile title="Архивные заказы" number="2" href='/profile/archive' active={true}/>
          </div>
          <div className={styles.archive__status}><Status /></div>
        </div>
        <div className={styles.archive__cards}>
      <Link href="/profile/createorder/" className={styles.archive__add}>
          <div className={styles.archive__addBody}>
            <h3 className={styles.archive__addTitle}>Создать новое ТЗ</h3>
            <p className={styles.archive__addSubTitle}>профессиональное техническое <br /> задание за 15 минут </p>
            <div className={styles.archive__addStatus}>
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path d="M0 0H37C40.866 0 44 3.13401 44 7V44L0 0Z" fill="#EBEBEB"/>
                <path d="M44 44H7C3.13401 44 0 40.866 0 37V0L44 44Z" fill="#DADADA"/>
                <circle cx="21.5" cy="21.5" r="6.5" fill="white"/>
                <path d="M0 0H37C40.866 0 44 3.13401 44 7V44L0 0Z" fill="#EBEBEB"/>
                <path d="M44 44H7C3.13401 44 0 40.866 0 37V0L44 44Z" fill="#DADADA"/>
                <circle cx="21.5" cy="21.5" r="6.5" fill="white"/>
              </svg>
            </div>
          </div>
        </Link>
        <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          href='/'
          status="Закончен"
        />  
        <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          href='/'
          status="Отменен"
        />  
        <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          href='/'
          status="Закончен"
        />  
        <OrdersCard 
          title="Пошив платья для официантов" 
          number="№24500968" 
          href='/'
          status="Отменен"
        />  
      </div> 
      </div>
    </Layout>
    </>
   );
}
 
export default ArchiveOrders;