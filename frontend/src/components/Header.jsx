import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const BasicHeader = () => {
  const [hasToken, setHasToken] = useState(false);

  const checkToken = () => {
    const storageQuery = sessionStorage.getItem('token');
    if (storageQuery) {
        setHasToken(true);
    }
    return;
  };

  useEffect(() => {
    checkToken();
  }, []);
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/api"><Link to="/api"/>Epiphany</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/api/posts" className="headerButts">
              Posts
            </Link>
            <Link to="/api/authors" className="headerButts">
              Authors
            </Link>
            {hasToken ? (
              <Nav className="login-header-butts">
                <Link to="/api/my-posts" className="headerButts">
                  My Posts
                </Link>
                <Link to="/api/my-likes" className="headerButts">
                  My Likes
                </Link>
              </Nav>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BasicHeader;