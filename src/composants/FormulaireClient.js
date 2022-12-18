import React from 'react';
import { Container, Button, Row, Col, Form, ButtonGroup } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Box from '@mui/material/Box';
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
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function FormulaireClient(props) {

    const [prenom, setPrenom] = useState(props.prenom);
    const [nom, setNom] = useState(props.nom);
    const [courriel, setCourriel] = useState(props.courriel);
    const [motDePasse, setMotDePasse] = useState("");
    const [telephone, setTelephone] = useState(props.telephone);
    const [open, setOpen] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [state, setState] = useState({
        sms: true,
        courriel: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { sms, courriel2 } = state;
    //const error = [sms, courriel2].filter((v) => v).length !== 1;


    const handleChangePrenom = (event) => {
        setPrenom(event.target.value);
    }

    const handleChangeNom = (event) => {
        setNom(event.target.value);
    }

    const handleChangeCourriel = (event) => {
        setCourriel(event.target.value);
    }

    const handleChangeTelephone = (event) => {
        setTelephone(event.target.value);
    }

    const handleChangeMotDePasse = (event) => {
        setMotDePasse(event.target.value);
    }

    const handleClickRegister = () => {
        //let strDossierServeur = "https://dev.pascalrocher.com";
        //let strNomApplication = strDossierServeur + "/api/auth/register";
        let strNomApplication = props.strNomApplication;

        //alert("dans inscription " + strNomApplication);

        let data = {
            "prenom": prenom,
            "nom": nom,
            "courriel": courriel,
            "motDePasse": motDePasse,
            "telephone": telephone,
        }

        //alert(JSON.stringify(data))

        axios.post(strNomApplication, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                alert("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    navigate('/connexion');
                }
            })
            .catch((error) => {
                console.log(error.response.data.status);
                //document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }

    const handleClickValiderModification = () => {
        let strNomApplication = props.strNomApplication;

        //alert("dans modification " + strNomApplication);

        let data = {
            "prenom": prenom,
            "nom": nom,
            "courriel": courriel,
            "telephone": telephone,
        }

        //alert(JSON.stringify(data))

        axios.put(strNomApplication, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                //alert("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    //props.setModification(false);
                    //navigate('/profil');
                    //props.setProfilClient(true);
                    setOpen(true);

                    setInterval(() => {
                        window.location.reload(false);
                    }, 2000);
                    
                }
            })
            .catch((error) => {
                alert(error.response.data.status);
                //document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }


    return (
        <>
            <div>
                <TextField
                    required
                    id="outlined-required1"
                    label="Prénom"
                    size='small'
                    onChange={handleChangePrenom}
                    defaultValue={props.profil === true ? props.prenom : ""}
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required2"
                    label="Nom"
                    size='small'
                    onChange={handleChangeNom}
                    defaultValue={props.profil === true ? props.nom : ""}
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required3"
                    label="Courriel"
                    type={'email'}
                    size='small'
                    onChange={handleChangeCourriel}
                    defaultValue={props.profil === true ? props.courriel : ""}
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required4"
                    label="Numéro de téléphone"
                    type={'text'}
                    size='small'
                    onChange={handleChangeTelephone}
                    defaultValue={props.profil === true ? props.telephone : ""}
                />
            </div>

            <div>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password1">{props.profil === true ? "ancien mot de passe" : "mot de passe"}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password2"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Mot de passe"

                    />
                </FormControl>

            </div>
            <div>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{props.profil === true ? "nouveau mot de passe" : "confirmation"}</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChangeMotDePasse}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Mot de passe"

                    />
                </FormControl>

            </div>


            {(props.profil === false ? true : false) && <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className="mx-auto">
                <FormLabel component="legend" className='text-start'>Comment devrons-nous communiquer avec vous ?</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={sms} onChange={handleChange} name="sms" />
                        }
                        label="Sms"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={courriel2} onChange={handleChange} name="courriel" />
                        }
                        label="Courriel"
                    />
                </FormGroup>
                {/*<FormHelperText>Be careful</FormHelperText>*/}
            </FormControl>}

            <Stack direction="horizontal" gap={2} className={props.profil === false ? `col-sm-4 col-md-3 col-lg-3 col-xl-2 col-xxl-1 mx-auto` : "col-md-3 mx-auto mt-3"}>
                <Button type="reset" variant='outline-secondary'>Annuler</Button>
                <Button className="mleft-16" variant='primary' onClick={props.profil === false ? handleClickRegister : handleClickValiderModification}>{props.profil === false ? `S'incrire` : `Modifier`}</Button>
            </Stack>
            <Snackbar sx={{marginTop: 14, marginLeft: 19}} open={open} autoHideDuration={2000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} >
                <Alert  severity="success" sx={{ width: '100%' }}>
                    Votre profil a bien été modifié!
                </Alert>
            </Snackbar>
        </>


    )
}
