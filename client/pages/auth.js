import Layout from "../component/Layout";

import { useState, useEffect } from "react";
import Login from "../component/AuthComponent/Login";
import Signup from "../component/AuthComponent/Signup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Layout isNotPrivate>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </Layout>
  );
};

export default Auth;
