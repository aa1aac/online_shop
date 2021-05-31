import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";

import { UserState } from "../../App";
import styles from "./nav.module.scss";

const NavigationBar = () => {
  const userLogout = () => {
    localStorage.removeItem("token");
    UserState({
      id: null,
      lastName: null,
      verified: null,
      token: null,
      firstName: null,
      cartSet: [],
    });
  };

  const userState = useReactiveVar(UserState);

  return (
    <>
      {/* new navbar */}

      {/* <nav className="navigation-bar">
        <Link className="brand" to="/">
          Pasal
        </Link>

        {userState.firstName ? (
          <div className="nav">
            <button className="button"> Logout</button>
          </div>
        ) : null}
      </nav> */}

      {/* old navbar */}
      <Navbar collapseOnSelect expand="lg" className={styles.navigation}>
        <Link className="navbar-brand" to="/">
          Pasal
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {userState.firstName ? (
            <>
              <Nav>
                <NavDropdown
                  title={userState.firstName + " " + userState.lastName}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.2">
                    Change Password
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => userLogout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Nav className="ml-auto">
                <Link to="/cart" className="nav-link">
                  Cart{" "}
                  <span className="badge badge-secondary">
                    {userState.cartSet.length
                      ? userState.cartSet[0].cartitemSet.length
                      : "0"}
                  </span>
                </Link>
              </Nav>
            </>
          ) : (
            <Nav>
              <Link className="nav-link" to="/auth">
                auth
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavigationBar;
