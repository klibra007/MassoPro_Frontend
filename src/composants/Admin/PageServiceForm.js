import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import PageListeServices from './PageListeServices';


export default function PageServiceForm() {
  let strDossierServeur = "https://dev.pascalrocher.com";
  let strApiDurees = strDossierServeur + "/api/durees";

  const navigate = useNavigate();

  const [dureesTab, setDureesTab] = useState([]);
  const [nomService, setNomService] = useState("");
  


  const [serviceDescription, setServiceDescription] = useState("");

  useEffect(() => {
    axios.get(strApiDurees)
      .then((response) => {
        console.log("La réponse : " + JSON.stringify(response.data));
        setDureesTab(response.data);
      })
      .catch(error => alert(error))
  }, [])

  const handleChangeNomService = (event) => {
    setNomService(event.target.value);
  }

  const handleChangeServiceDescription = (event) => {
    setServiceDescription(event.target.value);
  }

  const handleClickSauvegarder = () => {
  }

  const handleClickAnnuler = () => {
  }

  return (
    <>
      <Container>
        <Row className='justify-content-center mt-5'>
          <Col xs={8}>
            <Form className="mtop-40">
              <Form.Group className="mb-3">
                <Form.Control type='text' id="formNomService" placeholder='Nom service' onChange={handleChangeNomService} />
              </Form.Group>
              <Form.Group className="mb-2" id="formServiceDescription">
                <Form.Control as="textarea"
                  required
                  type="text"
                  placeholder="Description"
                  defaultValue={serviceDescription}
                  onChange={handleChangeServiceDescription}
                />
              </Form.Group>

              <Form.Group className="col-md-3 mx-auto mt-4">
                <Stack direction="horizontal" gap={3}>
                  <Button type="reset" variant='outline-secondary' onClick={handleClickAnnuler}>Annuler</Button>
                  <Button onClick={handleClickSauvegarder}>Sauvegarder</Button>
                </Stack>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

    </>
  )   // end return     
}   // end AjouterClientForm