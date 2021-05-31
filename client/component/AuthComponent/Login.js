import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useState } from "react";

import UserState from "../../state/UserState";

const Login = ({ setIsLogin }) => {
  const [serverErrors, setErrors] = useState("");

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = async (formData) => {
    let {
      data: { tokenAuth },
    } = await login({ variables: formData });

    if (tokenAuth.errors) {
      setErrors(tokenAuth.errors.nonFieldErrors[0].message);
    }

    if (!tokenAuth.success) {
      setErrors("please enter valid credentials");
    }

    if (!tokenAuth.errors && !loading) {
      localStorage.setItem("token", `JWT ${tokenAuth.token}`);

      UserState({ ...tokenAuth.user });
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-xs ">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onClick={handleSubmit(userLogin)}
        >
          <h2 className="text-gray-800 text-lg font-bold text-center mb-3">
            {" "}
            Login{" "}
          </h2>
          <div className="mb-4">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              type="email"
              placeholder="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "invalid email address",
                },
              })}
            />
          </div>
          <div className="mb-6">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              placeholder="password"
              {...register("password", { required: true, minLength: 8 })}
            />
          </div>

          {serverErrors ? (
            <div className="error mb-3"> {serverErrors} </div>
          ) : null}

          <div>
            <button
              className="btn bg-blue-500 text-white font-bold text-md "
              type="submit"
            >
              Login
            </button>

            <div className="mt-3">Don't have an account? </div>

            <button
              onClick={() => setIsLogin(false)}
              className="btn border-blue-300 border-2 font-light text-md"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      success
      user {
        firstName
        lastName
        id
        email
        cartSet {
          id
          total
          cartitemSet {
            id
            item {
              itemName
            }
          }
        }
      }
    }
  }
`;

export default Login;
