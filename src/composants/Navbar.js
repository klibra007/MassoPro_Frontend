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
            {(connexionData.idAdministrateur) ?
              <>
                <NavDropdown title="Clients" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/clients">Liste des clients</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {/* <NavDropdown.Item href="/admin/clients">Ajouter un client</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/clients">Modifier un client</NavDropdown.Item>
                  <NavDropdown.Divider /> */}
                  <NavDropdown.Item href="/admin/clients">Désactiver un client</NavDropdown.Item>
                </NavDropdown>
                {/* <NavDropdown title="Calendriers" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/calendriers">Liste des calendriers</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/calendriers">Ajouter un calendrier</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/calendriers">Modifier un calendrier</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/calendriers">Supprimer un calendrier</NavDropdown.Item>
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
                <NavDropdown title="Services" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/services">Liste des services</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/services/form">Ajouter un service</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/services">Modifier un service</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/services">Supprimer un service</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Durées" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/durees">Liste des durées</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/durees/form">Ajouter une durée</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/durees">Modifier une durée</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/durees">Désactiver une durée</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Mon Compte" id="navbarScrollingDropdown">
                 {/* <NavDropdown.Item href="/profil">Mon profil</NavDropdown.Item>
                  <NavDropdown.Divider />*/}
                  <NavDropdown.Item href="/" onClick={seDeconnecter}>
                    Se déconnecter
                  </NavDropdown.Item>
                </NavDropdown>
              </>
              : ''}
      
            {(connexionData.idPersonnel) ?
              <>
                <NavDropdown title="Clients" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/clients">Liste des clients</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/clients/form">Ajouter un client</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/clients">Modifier un client</NavDropdown.Item>
                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/clients">Désactiver un client</NavDropdown.Item> */}
                </NavDropdown>
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
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/calendriers">Ajouter un calendrier</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/calendriers">Modifier un calendrier</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/admin/calendriers">Supprimer un calendrier</NavDropdown.Item>
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
                
                <NavDropdown title="Mon Compte" id="navbarScrollingDropdown">
                  {/*<NavDropdown.Item href="/profil">Mon profil</NavDropdown.Item>
                  <NavDropdown.Divider />*/}
                  <NavDropdown.Item href="/" onClick={seDeconnecter}>
                    Se déconnecter
                  </NavDropdown.Item>
                </NavDropdown>
              </>
              : ''}

              
            {(connexionData.idClient) ?
             <>
                <Nav.Link href="/">Massages</Nav.Link>
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