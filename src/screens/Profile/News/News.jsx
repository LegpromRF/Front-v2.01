import TitleProfile from "@/src/components/TitleProfile/TitleProfile";
import Layout from "@/src/layout/Layout";

import styles from './News.module.scss'



import Head from "next/head";




const News = () => {

  

  return ( 
    <>
      <Head>
        <title>Новости - LegpromRF</title>
      </Head>
      <Layout>
        <div>
          <TitleProfile>Новости</TitleProfile>
        </div>
      </Layout>
    </>
   );
}
 
export default News;