import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const BasicHeader = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/api"><Link to="/api"/>Ed Dev Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/api/posts" className="headerButts">
                    Posts
                </Link>
                <Link to="/api/authors" className="headerButts">
                    Authors
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default BasicHeader;