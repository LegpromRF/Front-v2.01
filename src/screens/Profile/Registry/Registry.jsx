import Layout from "@/src/layout/Layout";
import RegistryCard from "@/src/components/RegistryCard/RegistryCard";

import styles from './Registry.module.scss'

import Link from "next/link";
import TitleProfile from "@/src/components/TitleProfile/TitleProfile";
import Status from "@/src/components/Status/Status";
import Head from "next/head";



const Registry = () => {
  return ( 
    <>
    <Head>
      <title>Реестр заказов - LegpromRF</title>
    </Head>
    <Layout>
      <div className={styles.registry}>
        <TitleProfile>Реестр заказов</TitleProfile>
        <div className={styles.registry__head}>
          <div className={styles.registry__list}>
            <div className={styles.registry__item}><Link href="/profile/registry/">Все заказы</Link></div>
            <div className={[styles.registry__item, styles.registry__item_archive].join(' ')}><Link href="/profile/registry/">Архивные заказы</Link></div>
          </div>
          <Status />
        </div>
        <div className={styles.registry__cards}>

          <RegistryCard 
            title='Пошив платья для официантов' 
            number='№24500968' 
            edition='250' 
            datePublic='25.03.2023' 
            dateChange='24.06.2023' 
            budget='500 000' 
            region='Ростовская область' 
            alt='Описание' 
            status='В работе'
          />

          <RegistryCard 
            title='Пошив платья для официантов' 
            number='№24500968' 
            edition='250' 
            datePublic='25.03.2023' 
            dateChange='24.06.2023' 
            budget='500 000' 
            region='Ростовская область' 
            alt='Описание' 
            status='Отменен'
          />

          <RegistryCard 
            title='Пошив платья для официантов' 
            number='№24500968' 
            edition='250' 
            datePublic='25.03.2023' 
            dateChange='24.06.2023' 
            budget='500 000' 
            region='Ростовская область' 
            alt='Описание' 
            status='Закончен'
          />

          <RegistryCard 
            title='Пошив платья для официантов' 
            number='№24500968' 
            edition='250' 
            datePublic='25.03.2023' 
            dateChange='24.06.2023' 
            budget='500 000' 
            region='Ростовская область' 
            alt='Описание' 
            status='Закончен'
          />

          <RegistryCard 
            title='Пошив платья для официантов' 
            number='№24500968' 
            edition='250' 
            datePublic='25.03.2023' 
            dateChange='24.06.2023' 
            budget='500 000' 
            region='Ростовская область' 
            alt='Описание' 
            status='Закончен'
          />

          <RegistryCard 
            title='Пошив платья для официантов' 
            number='№24500968' 
            edition='250' 
            datePublic='25.03.2023' 
            dateChange='24.06.2023' 
            budget='500 000' 
            region='Ростовская область' 
            alt='Описание' 
            status='В работе'
          />

          <RegistryCard 
            title='Пошив платья для официантов' 
            number='№24500968' 
            edition='250' 
            datePublic='25.03.2023' 
            dateChange='24.06.2023' 
            budget='500 000' 
            region='Ростовская область' 
            alt='Описание' 
            status='Отменен'
          />

          <RegistryCard 
            title='Пошив платья для официантов' 
            number='№24500968' 
            edition='250' 
            datePublic='25.03.2023' 
            dateChange='24.06.2023' 
            budget='500 000' 
            region='Ростовская область' 
            alt='Описание' 
            status='Закончен'
          />

          <RegistryCard 
            title='Пошив платья для официантов' 
            number='№24500968' 
            edition='250' 
            datePublic='25.03.2023' 
            dateChange='24.06.2023' 
            budget='500 000' 
            region='Ростовская область' 
            alt='Описание' 
            status='Закончен'
          />

          <RegistryCard 
            title='Пошив платья для официантов' 
            number='№24500968' 
            edition='250' 
            datePublic='25.03.2023' 
            dateChange='24.06.2023' 
            budget='500 000' 
            region='Ростовская область' 
            alt='Описание' 
            status='Закончен'
          />
        </div>
      </div>
    </Layout>
    </>
   );
}
 
export default Registry;