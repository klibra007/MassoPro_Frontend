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
    localStorage.removeItem('idService');
  }

  const NavBar = () => {
    if (JSON.stringify(connexionData) !== "{}") {
      return <Navbar>
        <Container>
          <Navbar.Brand href="/">MassoPro</Navbar.Brand>
          <Nav className="ms-auto">
            {(connexionData.idAdministrateur) ?
              <>
              <Nav.Link href="/admin/clients">Clients</Nav.Link>
                {/* <NavDropdown title="Clients" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/clients">Liste des clients</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/clients">Désactiver un client</NavDropdown.Item>
                </NavDropdown> */}
                {/* <NavDropdown title="Calendriers" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/calendriers">Liste des calendriers</NavDropdown.Item>
                </NavDropdown> */}
                {/* <NavDropdown title="Disponibilités" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/disponibilites">Liste des disponibilités</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/disponibilites">Ajouter une disponibilité</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/disponibilites">Modifier une disponibilité</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/disponibilites">Supprimer une disponibilité</NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link href="/admin/services">Services</Nav.Link>
                {/* <NavDropdown title="Services" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/services">Liste des services</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/services/form">Ajouter un service</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/services">Modifier un service</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/services">Supprimer un service</NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link href="/admin/durees">Durées</Nav.Link>
                {/* <NavDropdown title="Durées" id="navbarScrollingDropdown" href="/admin/durees">
                  <NavDropdown.Item href="/admin/durees">Liste des durées</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/durees/form">Ajouter une durée</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/durees">Modifier une durée</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/durees">Désactiver une durée</NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link href="/" onClick={seDeconnecter}>Se déconnecter</Nav.Link>
                {/* <NavDropdown title="Mon Compte" id="navbarScrollingDropdown"> */}
                 {/* <NavDropdown.Item href="/profil">Mon profil</NavDropdown.Item>
                  <NavDropdown.Divider />*/}
                  {/* <NavDropdown.Item href="/" onClick={seDeconnecter}>
                    Se déconnecter
                  </NavDropdown.Item>
                </NavDropdown> */}
              </>
              : ''} 
      
            {(connexionData.idPersonnel) ?
              <>
              <Nav.Link href="/admin/reservation">Reservations</Nav.Link>
              <Nav.Link href="/perso/agenda">Reservations</Nav.Link>
              <Nav.Link href="/admin/clients">Clients</Nav.Link>
                {/* <NavDropdown title="Clients" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/clients">Liste des clients</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/clients/form">Ajouter un client</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/clients">Modifier un client</NavDropdown.Item>
                </NavDropdown> */}
                {/* <NavDropdown title="Réservations" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/reservation">Liste des réservations</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/reservation">Nouvelle réservation</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/reservation">Modifier une réservation</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/reservation">Annuler une réservation</NavDropdown.Item>
                </NavDropdown> */}
                {/* <NavDropdown title="Calendriers" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/calendriers">Liste des calendriers</NavDropdown.Item>
                </NavDropdown> */}
                {/* <NavDropdown title="Disponibilités" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/disponibilites">Liste des disponibilités</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/disponibilites">Ajouter une disponibilité</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/disponibilites">Modifier une disponibilité</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/disponibilites">Supprimer une disponibilité</NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link href="/" onClick={seDeconnecter}>Se déconnecter</Nav.Link>
                {/* <NavDropdown title="Mon Compte" id="navbarScrollingDropdown"> */}
                  {/*<NavDropdown.Item href="/profil">Mon profil</NavDropdown.Item>
                  <NavDropdown.Divider />*/}
                  {/*<NavDropdown.Item href="/" onClick={seDeconnecter}>
                    Se déconnecter
                  </NavDropdown.Item>
                </NavDropdown>*/}
              </>
              : ''}

              
            {(connexionData.idClient) ?
             <>
                <Nav.Link href="/reservation">Massages</Nav.Link>
                <NavDropdown title="Réservations" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/vosreservations">
                    Mes réservations
                  </NavDropdown.Item>
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
                </>
            : ''}
            
          </Nav>
        </Container>
      </Navbar>
    } else {
      // return <Navbar bg="dark" variant="dark">
      return <Navbar >
        <Container>
          <Navbar.Brand href="/">MassoPro</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/"></Nav.Link>
            <Nav.Link href="/reservation">Nos massages</Nav.Link>
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