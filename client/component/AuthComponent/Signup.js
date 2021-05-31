import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRef } from "react";

import { UserState } from "../../state/UserState";

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

      UserState({ ...formData, cartSet: [{ __typename: "CartType" }] });
    }
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(userSignup)}
          >
            <h2 className="text-gray-800 text-lg font-bold text-center mb-3">
              {" "}
              Signup{" "}
            </h2>

            <div className="mb-4 sm:flex sm:justify-between ">
              <div className="mb-4 sm:mr-3">
                <label className="label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="input"
                  id="firstName"
                  type="text"
                  placeholder="first Name"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "first name is required",
                    },
                    minLength: {
                      value: 2,
                      message: "first name should have minimum length of 2",
                    },
                  })}
                />

                {errors.firstName ? (
                  <div className="error"> {errors.firstName.message} </div>
                ) : null}
              </div>

              <div>
                <label className="label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="input"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "last name is required",
                    },
                    minLength: {
                      value: 2,
                      message: "last name should have minimum length of 2",
                    },
                  })}
                />

                {errors.lastName ? (
                  <div className="error"> {errors.lastName.message} </div>
                ) : null}
              </div>
            </div>

            <div className="mb-4 ">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                id="email"
                type="email"
                placeholder="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required",
                  },
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "invalid email address",
                  },
                })}
              />

              {errors.email ? (
                <div className="error"> {errors.email.message} </div>
              ) : null}
            </div>

            <div className="mb-6">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                id="password1"
                type="password"
                placeholder="password"
                {...register("password1", {
                  required: {
                    value: true,
                    message: "password is requried",
                  },
                  minLength: {
                    value: 8,
                    message: "should have a minimum length of 8",
                  },
                })}
              />

              {errors.password1 ? (
                <div className="error"> {errors.password1.message} </div>
              ) : null}
            </div>

            <div className="mb-6">
              <label className="label" htmlFor="password2">
                Confirm Password
              </label>
              <input
                className="input"
                id="password2"
                type="password"
                placeholder="Comfirm Password"
                {...register("password2", {
                  validate: (value) => {
                    return (
                      value === password1.current ||
                      "The password does not match"
                    );
                  },
                })}
              />

              {errors.password2 ? (
                <div className="error"> {errors.password2.message} </div>
              ) : null}
            </div>

            <div>
              <button
                className="btn bg-blue-500 text-white font-bold text-md "
                type="submit"
              >
                Signup
              </button>

              <div className="mt-3 mb-1"> Already have an account? </div>

              <button
                onClick={() => setIsLogin(true)}
                className="btn border-blue-300 border-2 font-light text-md"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
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
