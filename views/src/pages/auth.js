import { useState } from "react";
import Login from "../component/AuthComponent/Login";
import Signup from "../component/AuthComponent/Signup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Auth;
