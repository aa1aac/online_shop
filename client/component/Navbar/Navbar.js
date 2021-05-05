import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <Navbar expand="lg" collapseOnSelect>
      <Link href="/">
        <a className="navbar-brand" href="/">
          <span className="material-icons">storefront</span>
          Mero Pasal
        </a>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link">
                {" "}
                <span className="material-icons">home</span> {" "}Home
              </a>
            </Link>
          </li>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
