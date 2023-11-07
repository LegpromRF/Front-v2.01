import TitleProfile from "@/src/components/TitleProfile/TitleProfile";
import Layout from "@/src/layout/Layout";
import Head from "next/head";

const Chat = () => {
  return ( 
    <>
      <Head>
        <title>Сообщения - LegpromRF</title>
      </Head>
      <Layout>
        <div>
          <TitleProfile>Чат</TitleProfile>
        </div>
      </Layout>
    </>
  
   );
}
 
export default Chat;