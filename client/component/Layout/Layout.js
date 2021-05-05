import Head from "next/head";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children, title = "Pasal" }) => {
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
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
