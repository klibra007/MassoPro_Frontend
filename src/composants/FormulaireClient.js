import React from 'react';
import { Button } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase'
import Checkbox from '@mui/material/Checkbox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

import isEmail, { isTelephone } from '../lib/FormValidator';
import '../styles.css';

export default function FormulaireClient(props) {

    const [prenom, setPrenom] = useState(props.prenom ? props.prenom : '');
    const [nom, setNom] = useState(props.nom ? props.nom : '');
    const [courriel, setCourriel] = useState(props.courriel ? props.courriel : '');
    const [motDePasse1, setMotDePasse1] = useState("");
    const [motDePasse2, setMotDePasse2] = useState('');
    const [telephone, setTelephone] = useState(props.telephone ? props.telephone : '');
    const [open, setOpen] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [prenomError, setPrenomError] = useState('');
    const [nomError, setNomError] = useState('');
    const [courrielError, setCourrielError] = useState('');
    const [telephoneError, setTelephoneError] = useState('');
    const [motDePasse1Error, setMotDePass1Error] = useState('');
    const [motDePasse2Error, setMotDePass2Error] = useState('');
    const [smsCourrielChkError, setSmsCourrielChkError] = useState('');

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [state, setState] = useState({
        smsChk: true,
        courrielChk: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { smsChk, courrielChk } = state;
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

    const handleChangeMotDePasse1 = (event) => {
        setMotDePasse1(event.target.value);
    }

    const handleChangeMotDePasse2 = (event) => {
        setMotDePasse2(event.target.value);
    }

    const RegisterProfile = () => {
        //let strDossierServeur = "https://dev.pascalrocher.com";
        //let strNomApplication = strDossierServeur + "/api/auth/register";
        let strNomApplication = props.strNomApplication;

        //alert("dans inscription " + strNomApplication);

        let data = {
            "prenom": prenom,
            "nom": nom,
            "courriel": courriel,
            "motDePasse": motDePasse1,
            "telephone": telephone,
            "contactParSMS": smsChk,
            "contactParCourriel": courrielChk
        }

        //alert(JSON.stringify(data))

        axios.post(strNomApplication, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    navigate('/connexion');
                }
            })
            .catch((error) => {
                //  console.log(error.response.data.status);
                //document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }

    const ModifierProfile = () => {
        let strNomApplication = props.strNomApplication;
        //  console.log("Profile modification: " + strNomApplication);

        let data = {
            "prenom": prenom,
            "nom": nom,
            "courriel": courriel,
            "telephone": telephone,
            "motDePasse": motDePasse2,
            "ancienMotDePasse": motDePasse1,
        }

        // console.log("Profile data: "+JSON.stringify(data))

        axios.put(strNomApplication, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log("La réponse: " + JSON.stringify(response));
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
                //  console.log("Error: "+error.response.status);
                // 401 - Invalid ancien mot de passe               
                if (error.response.status === 401) {
                    setMotDePass1Error("Ancien mot de passe est érronné");
                } else {
                    setMotDePass2Error("Mot de passe est requis");
                }

                //document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
                return error;
            });

    }  // end function

    const exitForm = () => {

        if (props.profil === true) {
            // Edit mode        
            setInterval(() => {
                window.location.reload(false);
            }, 500);
        } else {
            // New record mode. Go back to previous screen 
            navigate(-1);
        }
    }

    const resetFormError = () => {
        // init error fields 
        setPrenomError('');
        setNomError('');
        setCourrielError('');
        setTelephoneError('');
        setMotDePass1Error('');
        setMotDePass2Error('');
        setSmsCourrielChkError();
    }

    const validerForm1 = () => {
        let prenomValid = false;
        let nomValid = false;
        let courrielValid = false;
        let telephoneValid = false;

        if (!prenom || prenom.length === 0) {
            setPrenomError("Prénom est requis");
        } else {
            prenomValid = true;
        }

        if (!nom || nom.length === 0) {
            setNomError("Nom est requis");
        } else {
            nomValid = true;
        }

        if (!courriel || courriel.length === 0) {
            setCourrielError("Courriel est requis");
        } else if (!isEmail(courriel)) {
            setCourrielError("Courriel est invalide");
        } else {
            courrielValid = true;
        }

        if (!telephone || telephone.length === 0) {
            setTelephoneError("Téléphone est requis");
        } else if (!isTelephone(telephone)) {
            setTelephoneError("Téléphone est invalide");
        } else {
            telephoneValid = true;
        }

        // Retourn True is validation OK pour les champs
        return prenomValid && nomValid && courrielValid && telephoneValid;
    }

    // Password et password confirmation devrait être le même
    function validatePasswordConfirmation() {
        let pass1Valid = true;
        let pass2Valid = true;

        if (motDePasse1.length === 0) {
            setMotDePass1Error("Mot de passe est requis");
            pass1Valid = false;
        }

        if (motDePasse2.length === 0) {
            setMotDePass2Error("Confirmation du mot de passe est requise");
            pass2Valid = false;
        }

        if (pass1Valid && pass2Valid) {
            if (motDePasse1 !== motDePasse2) {
                setMotDePass2Error("Les mots de passe ne correspondent pas");
                pass2Valid = false;
            }
        }

        return pass1Valid && pass2Valid;
    }

    const handleClickRegister = () => {
        let validation = true;

        resetFormError();

        if (!validerForm1()) {
            validation = false;
        }

        if (!validatePasswordConfirmation()) {
            validation = false;
        }

        // Une case à cocher sms ou courriel doit être cochée
        if (!smsChk && !courrielChk) {
            setSmsCourrielChkError("Case à cocher Sms ou Courriel requis");
            validation = false;
        }

        if (validation) {
            RegisterProfile();
        }
    }

    function validateChangePassword() {
        let pass1Valid = true;
        let pass2Valid = true;

        // Si l'utilisateur saisit l'ancien mot de passe mais n'a pas saisi le nouveau mot de passe
        if (motDePasse1 !== '' && motDePasse2 === '') {
            setMotDePass2Error("Nouveau mot de passe est requis");
            pass2Valid = false;
        } else
            if (motDePasse2.length > 0 && motDePasse1.length === 0) {
                setMotDePass1Error("Mot de passe est requis");
                pass1Valid = false;
            }

        return pass1Valid && pass2Valid;
    }   // end function

    const handleClickValiderModification = () => {
        let validation = true;

        resetFormError();

        if (!validerForm1()) {
            validation = false;
        }

        // Valider si l'utilisateur saisit l'un des mots de passe
        if (motDePasse1 !== '' || motDePasse2 !== '') {
            if (!validateChangePassword()) {
                validation = false;
            }
        }

        if (validation) {
            ModifierProfile();
        }
    }   //  end function

    return (
        <>
            <div>
                <TextField
                    error={prenomError && prenomError.length ? true : false}
                    required
                    id="formPrenom"
                    label="Prénom"
                    size='small'
                    onChange={handleChangePrenom}
                    defaultValue={props.profil === true ? props.prenom : ""}
                    InputLabelProps={{ shrink: true }}
                    helperText={prenomError}
                />
            </div>
            <div>
                <TextField
                    error={nomError && nomError.length ? true : false}
                    required
                    id="formNom"
                    label="Nom"
                    size='small'
                    onChange={handleChangeNom}
                    defaultValue={props.profil === true ? props.nom : ""}
                    InputLabelProps={{ shrink: true }}
                    helperText={nomError}
                />
            </div>
            <div>
                <TextField
                    error={courrielError && courrielError.length ? true : false}
                    required
                    id="formCourriel"
                    label="Courriel"
                    type={'email'}
                    size='small'
                    onChange={handleChangeCourriel}
                    defaultValue={props.profil === true ? props.courriel : ""}
                    InputLabelProps={{ shrink: true }}
                    helperText={courrielError}
                />
            </div>
            <div>
                <TextField
                    error={telephoneError && telephoneError.length ? true : false}
                    required
                    id="outlined-required4"
                    label="Numéro de téléphone"
                    type={'text'}
                    size='small'
                    onChange={handleChangeTelephone}
                    defaultValue={props.profil === true ? props.telephone : ""}
                    InputLabelProps={{ shrink: true }}
                    helperText={telephoneError}
                />
            </div>

            <div>
                <TextField
                    className="show-password-icon"
                    error={motDePasse1Error && motDePasse1Error.length ? true : false}
                    required
                    id="formPassword1"
                    label={props.profil === true ? "Ancien mot de passe" : "Mot de passe"}
                    type={showPassword ? 'text' : 'password'}
                    size='small'
                    onChange={handleChangeMotDePasse1}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment  position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{ shrink: true }}
                    helperText={motDePasse1Error}
                />
            </div>

            <div>
                <TextField
                    className="show-password-icon"
                    error={motDePasse2Error && motDePasse2Error.length ? true : false}
                    required
                    id="formPassword2"
                    label={props.profil === true ? "Nouveau mot de passe" : "Confirmation"}
                    type={showPassword ? 'text' : 'password'}
                    size='small'
                    onChange={handleChangeMotDePasse2}
                    InputProps={{
                        endAdornment: (
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
                        )
                    }}
                    InputLabelProps={{ shrink: true }}
                    helperText={motDePasse2Error}
                />
            </div>

           
            {(props.profil === false ? true : false) && <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" className="mx-auto">
            <div className="legend">Comment devrions-nous communiquer avec vous ?</div>
            {/* <FormLabel component="legend" className='text-start'>Comment devrons-nous communiquer avec vous ?</FormLabel> */}
                <FormGroup>
                
                    <FormControlLabel
                        control={
                            <Checkbox checked={smsChk} onChange={handleChange} name="smsChk" />
                        }
                        label="Sms"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={courrielChk} onChange={handleChange} name="courrielChk" />
                        }
                        label="Courriel"
                    />
                    <FormHelperText
                        error={smsCourrielChkError && smsCourrielChkError.length ? true : false}
                    >{smsCourrielChkError}</FormHelperText>
                </FormGroup>
                {/*<FormHelperText>Be careful</FormHelperText>*/}
            </FormControl>}

            <div className="mtop-10">
                <Button type="reset" variant='outline-secondary' onClick={exitForm}>Annuler</Button>
                <Button className="mleft-16" variant='primary' onClick={props.profil === false ? handleClickRegister : handleClickValiderModification}>{props.profil === false ? `S'incrire` : `Modifier`}</Button>
            </div>
            <Snackbar sx={{ marginTop: 14, marginLeft: 19 }} open={open} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Votre profil a bien été modifié!
                </Alert>
            </Snackbar>
        </>


    )
}
