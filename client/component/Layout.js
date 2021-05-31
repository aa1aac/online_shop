import Head from "next/head";
import Navbar from "./Navbar";
import { useReactiveVar } from "@apollo/client";
import UserState from "../state/UserState";
import { useRouter } from "next/router";

const Layout = ({ title = "Pasal", children, isNotPrivate, isPrivate }) => {
  const userState = useReactiveVar(UserState);
  const router = useRouter();

  if (isNotPrivate) {
    if (userState.firstName) {
      router.replace("/");
      return null;
    }
  }

  if (isPrivate) {
    if (!userState.firstName) {
      router.replace(`auth/?next=${router.pathname}`);
      return null;
    }
  }

  return (
    <div className="text-gray-600">
      <Head>
        <title> {title} </title>
      </Head>

      <Navbar />

      {children}
    </div>
  );
};

export default Layout;
