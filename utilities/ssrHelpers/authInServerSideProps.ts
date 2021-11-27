import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { verifyIdToken } from "../../firebase/adminSDK";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    await verifyIdToken(cookies.token);

    return {
      props: {},
    };
  } catch (err) {
    if (err) {
      console.error(err);
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return { props: {} as never };
  }
};
