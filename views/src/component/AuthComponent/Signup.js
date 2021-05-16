import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRef } from "react";

import styles from "./Login.module.scss";
import { UserState } from "../../App";

const Signup = ({ setIsLogin }) => {
  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const password1 = useRef({});
  password1.current = watch("password1", "");

  const userSignup = async (formData) => {
    const {
      data: { register },
    } = await signup({
      variables: { ...formData, username: formData.email },
    });

    if (register.errors) {
      for (let key in register.errors) {
        if (key !== "username") {
          setError(key, {
            type: "server",
            message: register.errors[key][0].message,
          });
        }
      }
    }

    if (!loading && !register.errors) {
      localStorage.setItem("token", `JWT ${register.token}`);

      UserState({ ...formData, cartSet: [] });
    }
  };

  return (
    <form
      className={styles.loginCard + " card"}
      onSubmit={handleSubmit(userSignup)}
      needs-validation
    >
      <h2 className="text-center mt-3">
        {" "}
        <span className="material-icons">login</span> Signup{" "}
      </h2>

      <div className="card-body">
        <div className="mb-3 has-validation">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            className={
              errors.firstName ? "form-control is-invalid" : "form-control"
            }
            id="firstName"
            {...register("firstName", {
              required: true,
              minLength: {
                value: 2,
                message: "first name should have minimum length of 2",
              },
            })}
          />

          {errors.firstName ? (
            <div className="invalid-feedback">{errors.firstName.message}</div>
          ) : null}
        </div>

        <div className="mb-3 has-validation">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            className={
              errors.lastName ? "form-control is-invalid" : "form-control"
            }
            id="lastName"
            {...register("lastName", {
              required: true,
              minLength: {
                value: 2,
                message: "last name should have minimum length of 2",
              },
            })}
          />

          {errors.lastName ? (
            <div className="invalid-feedback">{errors.lastName.message}</div>
          ) : null}
        </div>

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
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "invalid email address",
              },
            })}
          />

          {errors.email ? (
            <div className="invalid-feedback">{errors.email.message}</div>
          ) : null}
        </div>
        <div className="mb-3 ">
          <label htmlFor="password" className="form-label">
            <span className="material-icons">password</span>Password
          </label>
          <input
            type="password"
            className={
              errors.password1 ? "form-control is-invalid" : "form-control"
            }
            id="password"
            {...register("password1", { required: true, minLength: 8 })}
          />

          <div className="invalid-feedback">
            Must have a minimum length of 8
          </div>
        </div>

        <div className="mb-3 ">
          <label htmlFor="confirmPassword" className="form-label">
            <span className="material-icons">password</span>Confirm Password
          </label>
          <input
            type="password"
            className={
              errors.password2 ? "form-control is-invalid" : "form-control"
            }
            id="password"
            {...register("password2", {
              validate: (value) => {
                return (
                  value === password1.current || "The password does not match"
                );
              },
            })}
          />

          {errors.password2 ? (
            <div className="invalid-feedback">{errors.password2.message}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-secondary d-block">
          Signup
        </button>
        <div className="mt-4">
          Already a user?{" "}
          <button
            className="btn btn-outline-secondary d-block"
            onClick={() => setIsLogin(true)}
          >
            {" "}
            Login{" "}
          </button>
        </div>
      </div>
    </form>
  );
};

const SIGNUP_MUTATION = gql`
  mutation (
    $email: String!
    $password1: String!
    $password2: String!
    $firstName: String!
    $lastName: String!
  ) {
    register(
      email: $email
      password1: $password1
      password2: $password2
      firstName: $firstName
      lastName: $lastName
      username: $email
    ) {
      success
      errors
      token
    }
  }
`;

export default Signup;
