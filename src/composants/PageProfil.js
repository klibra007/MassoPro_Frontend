import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectConnexionData } from '../app/features/connexionSlice';
import Paper from '@mui/material/Paper';
import { Avatar, Divider, Grid } from '@mui/material';
import { Button, Row, Col } from 'react-bootstrap';
import FormulaireClient from './FormulaireClient';


export default function PageProfil() {
    const connexionData = useSelector(selectConnexionData);
    const navigate = useNavigate();
    const [dataClient, setDataClient] = useState([]);
    const [profilClient, setProfilClient] = useState(true);
    const [modification, setModification] = useState(false);

    const profil = true;

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + `/api/client/${connexionData.idClient}`;

    //redirection si aucun user connecté
    useEffect(() => {
        if (JSON.stringify(connexionData) === "{}") {
            navigate('/connexion');
        }
    })

    useEffect(() => {
        axios.get(strNomApplication)
            .then((response) => {
                console.log("La réponse client : " + JSON.stringify(response.data));
                setDataClient(response.data);
            })
            .catch(error => alert(error));
    }, []);

    const handleClickModifier = () => {
        setProfilClient(false);
        setModification(true);
    }

    const AfficherProfil = () => {
        if (dataClient.client !== undefined) {
            return <Grid container spacing={2} direction={"row"} justifyContent="center" alignItems={"center"}>
                <Grid item xs={4} >
                    <Paper sx={{ backgroundColor: "whitesmoke", height: "550px", pt: 5 }}>
                        <Avatar sx={{ width: 150, height: 150, fontSize: 50, m: "auto" }}>
                            {`${dataClient.client.nom.substr(0, 1)}${dataClient.client.prenom.substr(0, 1)}`}
                        </Avatar>
                        <h3>{`${dataClient.client.prenom} ${dataClient.client.nom}`}</h3>
                        <h4>55 ans</h4>
                    </Paper>
                </Grid>
                {profilClient && <Grid item xs={8} >
                    <Paper sx={{ backgroundColor: "whitesmoke", height: "550px", textAlign: "start", padding: 10, paddingTop: 15 }}>
                        <p>Nom : {dataClient.client.nom} </p>
                        <Divider sx={{ bgcolor: "#fca311", mt: 2, mb: 2 }}></Divider>
                        <p>Prenom : {dataClient.client.prenom} </p>
                        <Divider sx={{ bgcolor: "#fca311", mt: 2, mb: 2 }}></Divider>
                        <p>Courriel : {dataClient.client.courriel} </p>
                        <Divider sx={{ bgcolor: "#fca311", mt: 2, mb: 2 }}></Divider>
                        <p>téléphone : {dataClient.client.telephone} </p>
                        <Divider sx={{ bgcolor: "#fca311", mt: 2, mb: 2 }}></Divider>
                        <Row>
                            <Col xs={5}></Col>
                            <Col xs={5}>
                                <Button className='mt-4' onClick={handleClickModifier}>Modifier profil</Button>
                            </Col>

                        </Row>

                    </Paper>
                </Grid>}
                {modification && <Grid item xs={8} >
                    <Paper sx={{ backgroundColor: "whitesmoke", height: "550px", textAlign: "center", padding: 10, paddingTop: 5 }}>
                        <Box id='idContainerInscription'
                            className=''
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '35ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div className="mb-3">
                                <h4>Modifier votre profil</h4>
                            </div>
                            <FormulaireClient strNomApplication={strNomApplication} profil={profil} nom={dataClient.client.nom} prenom={dataClient.client.prenom} courriel={dataClient.client.courriel} telephone={dataClient.client.telephone} setProfilClient={setProfilClient} setModification={setModification} />
                        </Box>
                    </Paper>
                </Grid>}
            </Grid>
        }
    }



    //alert("dataClient : " + JSON.stringify(dataClient.client))
    return (
        <Box sx={{
            pt: 2,
            mt: 5,
            ml: 15,
            mr: 15,
            //bgcolor: 'green',
            display: 'grid',
            gridTemplateColumns: { md: '1fr' },
            gap: 0
        }}>
            <AfficherProfil />
        </Box>
    )
}
