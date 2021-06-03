import Link from "next/link";
import UserState from "../state/UserState";
import { useState } from "react";

const Navbar = ({ user }) => {
  const [btnFocus, setBtnFocus] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");

    UserState({
      id: null,
      firstName: null,
      lastName: null,
      cartSet: [],
      email: null,
      verified: false,
    });
  };

  return (
    <>
      {btnFocus ? (
        <button
          className="absolute  h-full w-full"
          onClick={() => setBtnFocus(false)}
        >
          {" "}
        </button>
      ) : null}

      <div className="p-3 border-b-2 border-gray-100 mb-10 ">
        <nav className="flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">
            <span className="uppercase font-extrabold cursor-pointer">
              Pasal
            </span>
          </Link>

          <div>
            {user.firstName ? (
              <div className="btn">
                <div className="relative inline-flex">
                  <svg
                    className="w-2  absolute top-0 right-0 m-4 pointer-events-none"
                    viewBox="0 0 412 232"
                  >
                    <path
                      d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                      fill="#648299"
                      fillRule="nonzero"
                    />
                  </svg>

                  <Link href="/cart">
                    <button
                      href="/cart"
                      className="btn text-gray-500 font-bold inline-flex"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>{" "}
                      Cart{" "}
                      {user.cartSet[0] ? (
                        <span className="border border-blue-300 px-3 ml-1 rounded-md">
                          {" "}
                          {user.cartSet[0].cartitemSet.length}{" "}
                        </span>
                      ) : null}
                    </button>
                  </Link>
                  <button
                    onClick={(e) => {
                      setBtnFocus(!btnFocus);
                    }}
                    className="  btn text-gray-600   bg-white hover:border-gray-400 focus:outline-none relative inline-flex"
                  >
                    {user.firstName + " " + user.lastName}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    {btnFocus ? (
                      <div className="absolute  z-10 top-6 left-0  bg-white w-39 pt-2 shadow-md rounded-lg ">
                        <div
                          className="block py-3 px-6  text-gray-500 hover:bg-red-500 hover:text-gray-100 "
                          onClick={logout}
                        >
                          {" "}
                          Logout{" "}
                        </div>
                      </div>
                    ) : null}
                  </button>
                </div>{" "}
              </div>
            ) : (
              <Link href="/auth" className="btn">
                Auth
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
