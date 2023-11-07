import Layout from "@/src/layout/Layout";

import styles from './TailoringOrder.module.scss'

import HeaderProfile from "@/src/components/HeaderProfile/HeaderProfile";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import warning from 'public/icon/TailoringOrder/warning.svg'

const Tailoring = () => {

  const data = null;

  return ( 
    <>
    <Head>
      <title>Пошив изделий - LegpromRF</title>
    </Head>
    <Layout>
      <div className={styles.tailoring}>
        <div className={styles.tailoring__title}>
          <h2>Пошив платья для официантов</h2>
          <div className={styles.tailoring__number}>№24500968</div>
        </div>
        <div className={styles.tailoring__header}>
          <HeaderProfile title="Поставка материала" number="1" href='/profile/applications' active={false}/>
          <HeaderProfile title="Пошив изделия" number="2" href='/profile/tailoring' active={true}/>
          <HeaderProfile title="Сдача заказа" number="3" href='/profile/change' active={false}/>
        </div>
        <div className={styles.tailoring__content}>
          {
            data 
            ?
              <></>
            :
              <div className={styles.tailoring__warning}>
                <div className={styles.tailoring__warningHeader}>
                  <div className={styles.tailoring__warningTitle}>Вы не выбрали исполнителя для пошива изделия</div>
                  <div className={styles.tailoring__warningButton}>
                    <Link href="/profile/selection/">Подобрать исполнителя</Link>
                  </div>
                </div>
                <div className={styles.tailoring__warningIcon}>
                  <Image 
                    src={warning}
                    width={303}
                    height={325}
                  />
                </div>
              </div>
          }
        </div>
      </div>
    </Layout>
    </>
   );
}
 
export default Tailoring;