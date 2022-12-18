import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { selectConnexionData } from '../app/features/connexionSlice';
import { useSelector } from 'react-redux';


function NavBar() {

  const connexionData = useSelector(selectConnexionData);

  const seDeconnecter = () => {
    localStorage.removeItem('connexionData');
  }

  const NavBar = () => {
    if (JSON.stringify(connexionData) !== "{}") {
      return <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MassoPro</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/">Massages</Nav.Link>
            <NavDropdown title="Réservations" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/vosreservations">Mes réservations</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/reservation">
                Réserver un massage
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Mon Compte" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profil">Mon profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/" onClick={seDeconnecter}>
                Se déconnecter
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    } else {
      return <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MassoPro</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/"></Nav.Link>
            <Nav.Link href="/vosreservations">Nos massages</Nav.Link>
            <Nav.Link href="/connexion">Se connecter</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    }
  }

  return (
    <>
      <NavBar />
    </>
  );
}

export default NavBar;