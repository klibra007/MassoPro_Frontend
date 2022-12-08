import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MassoPro</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/accueil">Massage</Nav.Link>
            <Nav.Link href="#features">Reservation</Nav.Link>
            <Nav.Link href="#pricing">Mon compte</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;