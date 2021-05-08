import Head from "next/head";

import { makeVar, useLazyQuery, gql } from "@apollo/client";
import Navbar from "../Navbar/Navbar";
import Progress from "./Progress
import { useEffect } from "react";

export const UserState = makeVar({
  id: null,
  firstName: null,
  token: null,
  lastName: null,
});

const Layout = ({ children, title = "Pasal" }) => {
  const [getMe, { res }] = useLazyQuery(ME_QUERY);

  useEffect(() => {
    let token = localStorage.getItem("token");

    UserState({ ...UserState(), token });

    getMe();

    console.log(res);
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        <title> {title} </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Progress />
      <Navbar />
      {children}
    </>
  );
};

const ME_QUERY = gql`
  query {
    me {
      id
      firstName
      lastName
    }
  }
`;

export default Layout;
