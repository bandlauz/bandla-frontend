import * as React from "react"
import "./css/Profile.css"
import Navbar from "../components/Navbar"
import Request from "../util/Request"
import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Container, Grid, Avatar, TextField, Button } from "@mui/material";

function Profile() {
    const [loading, setLoading] = useState(true);
    const [canSave, setCanSave] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const list = ["firstName", "lastName", "save"]

    const navigate = useNavigate();

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
            setLoading(false);
        } catch (error) {
            if (error.response.data?.errors) {
                toast.error(error.response.data.errors[0])
            } else {
                toast.error("Ma'lumotlarni yuklashda xatolik ro'y berdi");
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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

    const uploadImage = async (event) => {
        setCanSave(false);
        try {
            const formData = new FormData();
            formData.append('file', event.target.files[0]);
            const response = await Request("https://api.bandla.uz/api/file-store", "post", null, formData, true, navigateToLogin);
            setPhotoUrl(response.data.data.url);
        } catch (error) {
            if (error.response.data?.errors) {
                toast.error(error.response.data.errors[0])
            } else {
                toast.error("Photo suratni yuklashda xatolik ro'y berdi");
            }
        } finally {
            setCanSave(true);
        }
    }

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
            } else {
                toast.error("Ma'lumotlarni saqlashda xatolik ro'y berdi");
            }
        }
    }

    if (loading) {
        return <div>Ma'lumotlar yuklanmoqda...</div>;
    }

    return (
        <>
            <Navbar />
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
                        <div class="upload">
                            <Avatar
                                src={photoUrl}
                                sx={{ width: 85, height: 85, border: '0.1px solid lightgray' }}>
                                B
                            </Avatar>
                            <div class="round">
                                <input type="file" accept="image/png, image/jpeg" onChange={uploadImage} />
                                <i class="fa fa-camera" style={{ color: '#fff' }}></i>
                            </div>
                        </div>
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
                        <Button id="save" variant="contained" onClick={save} disabled={!canSave}>
                            Saqlash
                        </Button>
                    </Grid>
                </Container>
            </div>
        </>);
}

export default Profile;