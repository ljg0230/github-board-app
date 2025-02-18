import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinkStyle = (path: string) => ({
    color: isActivePath(path) ? '#007bff' : '#333333',
    fontWeight: isActivePath(path) ? '600' : '400'
  });

  return (
    <Navbar
      style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea' }}
      expand="md"
      className="justify-content-center"
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-md-center"
        >
          <Nav>
            <Nav.Link
              as={Link}
              to="/"
              style={navLinkStyle('/')}
              onMouseOver={(e) => (e.currentTarget.style.color = '#007bff')}
              onMouseOut={(e) =>
                (e.currentTarget.style.color = isActivePath('/')
                  ? '#007bff'
                  : '#333333')
              }
            >
              홈
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/board/question"
              style={navLinkStyle('/board/question')}
              onMouseOver={(e) => (e.currentTarget.style.color = '#007bff')}
              onMouseOut={(e) =>
                (e.currentTarget.style.color = isActivePath('/board/question')
                  ? '#007bff'
                  : '#333333')
              }
            >
              질문게시판
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/board/free"
              style={navLinkStyle('/board/free')}
              onMouseOver={(e) => (e.currentTarget.style.color = '#007bff')}
              onMouseOut={(e) =>
                (e.currentTarget.style.color = isActivePath('/board/free')
                  ? '#007bff'
                  : '#333333')
              }
            >
              자유게시판
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
