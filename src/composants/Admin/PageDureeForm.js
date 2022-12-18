import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Container} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Link from '@mui/material/Link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ConfirmDialog from './ConfirmDialog';

export default function PageDureeForm() {
  let strDossierServeur = "https://dev.pascalrocher.com";
  let strApiDurees = strDossierServeur + "/api/durees";

  const [dureesTab, setDureesTab] = useState([]);

  const [nomService, setNomService] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  const [open, setOpen] = useState(false) 
  const [callbackData, setCallbackData] = useState(null)

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

  const handleAddDuree = () => {
    console.log("Add Duree")
  }  

  const modifyDuree = () => {
    console.log("Modify duree")
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
           <Form> 
              {/* <div className="text-start mb-4">
                  <h4>Ajouter un service</h4>
              </div>   
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
            </Form.Group>    */}
            {/* <div className="text-start mtop-40 mb-2">
               <h2>Durée</h2>
            </div> */}
            <Table className="Table mtop-40">
                <TableHead >
                    <TableRow className="text-start mtop-40" >
                      <TableCell>Minutes</TableCell>
                      <TableCell>Prix</TableCell>
                      <TableCell className="text-center">Action</TableCell>
                    </TableRow>
                </TableHead>   
                <TableBody>         
                  {dureesTab.map(item => {
                    return (
                      <TableRow className="text-start" key={item.id}>
                        <TableCell className="text-start">{item.duree}</TableCell>
                        <TableCell className="text-start">{item.prix}</TableCell>   
                        <TableCell className="text-center">
                          <Link onClick={() => modifyDuree()}><EditIcon /></Link>
                          <Link onClick={() => {setCallbackData(item);  setOpen(true); }}><DeleteForeverOutlinedIcon /></Link>                              
                        </TableCell>     
                      </TableRow>
                    )} 
                  )}
              </TableBody>                            
            </Table> 

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

      <ConfirmDialog
        title="Supprimer"
        txtCancel="Non"
        txtConfirm="Oui" 
        open={open}
        setOpen={setOpen} 
        callbackData={callbackData}
      >   
       &Ecirc;tes-vous certain de vouloir supprimer?
      </ConfirmDialog>  
    </>           
  )   // end return     
}   // end AjouterClientForm
