import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";

import { UserState } from "../../App";
import styles from "./nav.module.scss";

const NavigationBar = () => {
  const userState = useReactiveVar(UserState);

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.navigation}>
      <Link className="navbar-brand" to="/">
        Pasal
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {userState ? (
          <Nav>
            {userState.firstName ? (
              <div className="">
                {" "}
                Hi {userState.firstName} {userState.lastName} !
              </div>
            ) : (
              <Link className="nav-link" to="/auth">
                auth
              </Link>
            )}
          </Nav>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
