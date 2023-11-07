import TitleProfile from "@/src/components/TitleProfile/TitleProfile";
import Layout from "@/src/layout/Layout";
import Head from "next/head";

const Catalog = () => {
  return ( 
    <>
      <Head>
        <title>Каталог компании - LegpromRF</title>
      </Head>
      <Layout>
        <TitleProfile>Каталог</TitleProfile>
      </Layout>
    </>
   );
}
 
export default Catalog;