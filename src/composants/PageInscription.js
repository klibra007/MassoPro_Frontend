import axios from 'axios';
import React, { useState } from 'react';
import { Button, Row, Col, Form, ButtonGroup } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import {Box, Paper, Container, Grid} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { textAlign } from '@mui/system';
import FormulaireClient from './FormulaireClient';


export default function PageInscription() {
    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/auth/register";
    const profil = false;
    return (
        <Container>
            <Grid container>
            <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                <Paper   sx={{backgroundColor: "whitesmoke"}}>
        <Box id='idContainerInscription' 
            className='mt-5 p-20 mb-40'
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
        /*flexDirection={'column'}
        flexWrap={'wrap'}*/
        >
            
            <div className="mb-3">
                <h4>S'incrire</h4>
            </div>
            <FormulaireClient strNomApplication={strNomApplication} profil={profil} />
            </Box>
            </Paper>
        
        </Grid>
        </Grid>
        </Container>
    )
}  