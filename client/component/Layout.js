import Head from "next/head";
import Navbar from "./Navbar";
import { useLazyQuery, useReactiveVar, gql } from "@apollo/client";
import UserState from "../state/UserState";
import { useRouter } from "next/router";

import { useEffect } from "react";

const Layout = ({ title = "Pasal", children, isNotPrivate, isPrivate }) => {
  const userState = useReactiveVar(UserState);
  const router = useRouter();
  const [meQuery] = useLazyQuery(ME_QUERY, {
    onCompleted: (data) => {
      UserState(data.me);
    },
  });

  useEffect(() => {
    meQuery();
  }, []);

  useEffect(() => {
    if (isNotPrivate) {
      if (userState.firstName) {
        router.replace("/");
        return null;
      }
    }
  }, [userState.lastName]);

  useEffect(() => {
    if (isPrivate) {
      if (!userState.firstName) {
        router.replace(`/auth/?next=${router.pathname}`);
        return null;
      }
    }
  }, [userState.lastName]);

  return (
    <div className="text-gray-600">
      <Head>
        <title> {title} </title>
      </Head>

      <Navbar user={userState} />

      {children}
    </div>
  );
};

export const ME_QUERY = gql`
  query {
    me {
      id
      firstName
      lastName
      email
      cartSet {
        id
        total
        __typename
        cartitemSet {
          id
          item {
            id
            itemName
            price
          }
        }
      }
    }
  }
`;

export default Layout;
