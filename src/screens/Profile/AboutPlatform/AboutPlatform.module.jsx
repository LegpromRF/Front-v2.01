import Layout from "@/src/layout/Layout";

import styles from './AboutPlatform.module.scss'
import TitleProfile from "@/src/components/TitleProfile/TitleProfile";
import Head from "next/head";

const AboutPlatform = () => {
  return ( 
    <>
    <Head>
      <title>О платформе - Le</title>
    </Head>
      <Layout>
        <TitleProfile>О платформе</TitleProfile>
      </Layout>
    </>
   );
}
 
export default AboutPlatform;