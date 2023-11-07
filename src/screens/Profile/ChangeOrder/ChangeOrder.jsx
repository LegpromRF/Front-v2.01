import Layout from "@/src/layout/Layout";
import Head from "next/head";
import HeaderProfile from "@/src/components/HeaderProfile/HeaderProfile";

import camera from 'public/icon/ChangeOrder/camera.svg'

import styles from './ChangeOrder.module.scss'
import Image from "next/image";
import Link from "next/link";

const ChangeOrder = () => {

  const data = null;

  return ( 
    <>
      <Head>
        <title>Сдача заказа - LegpromRF</title>
      </Head>
      <Layout>
        <div className={styles.change}>
          <div className={styles.change__title}>
            <h2>Пошив платья для официантов</h2>
            <div className={styles.change__number}>№24500968</div>
          </div>
          <div className={styles.change__header}>
            <HeaderProfile title="Поставка материала" number="1" href='/profile/applications' active={false}/>
            <HeaderProfile title="Пошив изделия" number="2" href='/profile/tailoring' active={false}/>
            <HeaderProfile title="Сдача заказа" number="3" href='/profile/change' active={true}/>
          </div>
          <div className={styles.change__date}>Сдача заказ назначена на 25 июня 2023 года</div>
          <div className={styles.change__content}>
            <div className={styles.change__wrapper}>
              <div className={styles.change__left}>
              <div className={styles.change__gallery}>
              {
                data 
                ?
                  <></> 
                :
                  <div className={styles.change__body}>
                    <div className={styles.change__images}>
                      <Image 
                        src={camera}
                        width={77}
                        height={68.76}
                      />
                      <h3>Фото еще <br /> не предоставлено</h3>
                    </div>
                  </div>
              }
              </div>
              <div className={styles.change__description}>
                <div className={styles.change__descriptionBody}>
              {
                data 
                ?
                  <></> 
                :
                  <div className={styles.change__descWarning}>
                    <h3>Описание еще <br /> не предоставлено</h3>
                  </div>
              }
                </div>
              </div>
              </div>
              <div className={styles.change__info}>
                <div className={styles.change__infoBody}>
                  <div className={styles.change__card}>
                      <div className={styles.change__infoCompany}>
                        <div className={styles.change__infoCompanyBody}>
                          <div className={styles.change__name}>Название компании</div>
                          <div className={styles.change__type}>Поставка материала</div>
                        </div>
                      </div>
                      <div className={styles.change__control}>
                        <div className={styles.change__status}>Просмотреть статус</div>
                        <div className={styles.change__message}><Link href="/profile/change/">Написать</Link></div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
   );
}
 
export default ChangeOrder;