import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useState } from "react";

import styles from "./Login.module.scss";
import { UserState } from "../../App";

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

    if (!tokenAuth.errors && !loading) {
      localStorage.setItem("token", `JWT ${tokenAuth.token}`);

      UserState({ ...tokenAuth.user });
    }

    // console.log(UserState());
  };

  return (
    <form
      className={styles.loginCard + " card"}
      onSubmit={handleSubmit(userLogin)}
      needs-validation
    >
      <h2 className="text-center mt-3">
        {" "}
        <span className="material-icons">login</span> Login{" "}
      </h2>

      <div className="card-body">
        <div className="mb-3 has-validation">
          <label htmlFor="email" className="form-label">
            <span className="material-icons">email</span> Email address
          </label>
          <input
            className={
              errors.email ? "form-control is-invalid" : "form-control"
            }
            id="email"
            {...register("email", {
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />

          <div className="invalid-feedback">invalid email address</div>
        </div>
        <div className="mb-3 ">
          <label htmlFor="password" className="form-label">
            <span className="material-icons">password</span>Password
          </label>
          <input
            type="password"
            className={
              errors.password ? "form-control is-invalid" : "form-control"
            }
            id="password"
            {...register("password", { required: true, minLength: 8 })}
          />

          <div className="invalid-feedback">
            Must have a minimum length of 8
          </div>
        </div>

        {serverErrors ? (
          <div className="alert alert-primary" role="alert">
            {serverErrors}
          </div>
        ) : null}
        <button type="submit" className="btn btn-secondary d-block">
          Login
        </button>
        <div className="mt-4">
          Don't have an account?{" "}
          <button
            className="btn btn-outline-secondary d-block"
            onClick={() => setIsLogin(false)}
          >
            {" "}
            Signup{" "}
          </button>
        </div>
      </div>
    </form>
  );
};

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      errors
      success
      user {
        id
        firstName
        verified
        lastName
        isSeller
      }
      token
    }
  }
`;

export default Login;
