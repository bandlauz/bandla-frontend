import * as React from "react"
import "./css/Profile.css"
import Request from "../util/Request"
import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';

function Profile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const list = ["firstName", "lastName", "save"]

    const navigateToLogin = () => {
        navigate("/login");
    };

    async function fetchData() {
        try {
            const response = await Request("https://api.bandla.uz/api/profile/my", "get", null, null, true, navigateToLogin);
            const data = response.data.data;

            setFirstName(data.firstName);
            setLastName(data.lastName);
            setPhotoUrl(data.photoUrl);
            setPhoneNumber(data.phoneNumber);
            setCreatedDate(data.createdDate);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            const element = document.activeElement;
            if (element.id == -1) {
                return;
            }
            const id = list.indexOf(element.id) + 1;
            const elm = document.getElementById(list.at(id));
            elm.focus();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);


    useEffect(() => {
        fetchData();
    }, []);

    const changeFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const changeLastName = (event) => {
        setLastName(event.target.value);
    }

    const save = async () => {
        const element = document.getElementById("save");
        element.blur();

        const body = {
            firstName: firstName,
            lastName: lastName,
            photoUrl: photoUrl
        }

        try {
            await Request("https://api.bandla.uz/api/profile/my/update", "put", null, body, true, navigateToLogin);
            toast.success("Muvaffaqiyatli saqlandi");
        } catch (error) {
            if (error.response.data?.errors) {
                toast.error(error.response.data.errors[0])
            }
        }
    }

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator
    }

    return (
        <div className="profile-wrapper" style={{ justifyContent: "center" }}>
            <Container>
                <ToastContainer
                    position="top-center"
                    autoClose={1400}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />
                <Grid p={1} align="center">
                    <Avatar
                        src={photoUrl}
                        sx={{ width: 85, height: 85 }}>B</Avatar>
                </Grid>
                <Grid p={1} align="center">
                    <TextField
                        label="Telefon raqam"
                        size="small"
                        disabled
                        value={phoneNumber} />
                </Grid>
                <Grid p={1} align="center">
                    <TextField id="firstName" label="Ism" value={firstName} size="small" onChange={changeFirstName} />
                </Grid>
                <Grid p={1} align="center">
                    <TextField id="lastName" label="Familya" value={lastName} size="small" onChange={changeLastName} />
                </Grid>
                <Grid align="center">
                    <Button id="save" variant="contained" onClick={save}>
                        Saqlash
                    </Button>
                </Grid>
            </Container>
        </div>);
}

export default Profile;