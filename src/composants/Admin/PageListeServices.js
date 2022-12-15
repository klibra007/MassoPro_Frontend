import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import Link from '@mui/material/Link';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import '../../styles.css';

import axios from 'axios';

export default function PageListeServices() {
    const [servicesTab, setServicesTab] = useState([]);

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/services";

    useEffect(() => {
        axios.get(strNomApplication)
            .then((response) => {
                console.log("La réponse : " + JSON.stringify(response.data));
                setServicesTab(response.data);
            })
            .catch(error => alert(error))
    }, [])

    const handleDisableService = () => {
        console.log("Disable service")

    }

    const handleEnableService = () => {
        console.log("Enable service")
    }

    const handleModifyService = () => {
        console.log("Modify service")
    }

    const handleDeleteService = () => {
        console.log("Delete service")
    }

    const ListeServices = () => {
        return (
            <Table className="Table">
                <TableHead >
                    <TableRow className="text-start" >
                        <TableCell className="text-center">ID</TableCell>
                        <TableCell className="text-center">Nom service</TableCell>
                        <TableCell className="text-center">Description</TableCell>
                        <TableCell className="text-center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {servicesTab.map(srv => {
                    return (
                        <TableRow className="text-start" key={srv.id}>
                            <TableCell className="test-top">{srv.id}</TableCell>
                            <TableCell >{srv.nomService}</TableCell>
                            <TableCell>{srv.description}</TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                {srv.estActif === 1 ? (<Link onClick={() => handleDisableService()}><CheckCircleOutlineOutlinedIcon /></Link>
                                ) : (<Link onClick={() => handleEnableService()}><HighlightOffIcon /></Link>)
                                }
                                <Link onClick={() => handleModifyService()}><EditIcon /></Link>
                                <Link onClick={() => handleDeleteService()}><DeleteForeverOutlinedIcon /></Link>
                            </TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        )
    }   // end listeServices

    return (
        <Container>
            <Grid container className='justify-content-center'>
                <Grid item xs={8}>
                    <div className="text-start mb-3">
                        <h4>Service</h4>
                    </div>
                    <div className="search">
                        <TextField className="searchBox" size="small">

                        </TextField>
                    </div>
                    <ListeServices />
                </Grid>
            </Grid>
        </Container>
    )  // end return
}  // end PageListeService    