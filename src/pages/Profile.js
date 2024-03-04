import React, { useRef } from "react";
import "./css/Profile.css"
import "react-toastify/dist/ReactToastify.css"
import Request from "../util/Request"
import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Container, Grid, Avatar, TextField, Button } from "@mui/material";
import Alert from '../components/Alert'
import * as IMG from '../util/image.js'

function Profile() {
    const fileInput = useRef(null);
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(true);
    const [canSave, setCanSave] = useState(true);
    const [photo, setPhoto] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const list = ["firstName", "lastName", "save"]
    const maxPhotoSize = 1024 * 1024 * 6; //KB

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

    const [showAlertPic, setShowAlertPic] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = async () => {
        setShowAlert(false);
        try {
            await Request("https://api.bandla.uz/api/profile/my/update-photo", "put", null, {}, true, navigateToLogin);
            toast.success("Profil rasmi o'chirildi");
            setPhotoUrl(null);
            setPhoto(null);
        } catch (error) {
            if (error.response.data?.errors) {
                toast.error(error.response.data.errors[0])
            } else {
                toast.error("Profile rasmini o'chirishda xatolik ro'y berdi");
            }
        }
    };

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

    const changePhoto = (event) => {
        const file = event.files[0];
        if (file.size > maxPhotoSize) {
            toast.error("Photo surati hajmi 6 MB dan kam bo'lishi kerak!");
            return;
        }
        setPhoto(file);
        setPhotoUrl(URL.createObjectURL(file));
        setShowAlertPic(false);

        fileInput.current.value = '';
    }

    const changeFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const changeLastName = (event) => {
        setLastName(event.target.value);
    }

    const save = async () => {
        setCanSave(false);

        const element = document.getElementById("save");
        element.blur();

        let url = photoUrl;
        if (photo) {
            try {
                const formData = new FormData();
                formData.append('file', photo);
                const response = await Request("https://api.bandla.uz/api/file-store", "post", null, formData, true, navigateToLogin);
                setPhotoUrl(response.data.data.url);
                url = response.data.data.url;
            } catch (error) {
                if (error.response.data?.errors) {
                    toast.error(error.response.data.errors[0])
                } else {
                    toast.error("Photo suratni yuklashda xatolik ro'y berdi");
                }
                setCanSave(true);
                return;
            }
        }

        const body = {
            firstName: firstName,
            lastName: lastName,
            photoUrl: url
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

        setCanSave(true);
    }

    if (loading) {
        return <div>Ma'lumotlar yuklanmoqda...</div>;
    }

    function fileInputChange() {
        setShowAlertPic(true);
    }
    
    function hideAlertPic() {
        setShowAlertPic(false);
        fileInput.current.value = '';
    }
    
    async function setSizeToImg(e) {
        const img = e.target
        const parent = img.parentElement

        const imgMaxSize = (await IMG.getData(fileInput.current.files[0])).size.max
        const parentMinSize = IMG.minSize(parent.clientWidth, parent.clientHeight)

        if (imgMaxSize === 'square') img.style[parentMinSize] = '100%'
        if (imgMaxSize !== 'square') img.style[imgMaxSize] = '100%'
    }

    return (
        <>
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
                    <Grid container direction={"column"} spacing={2} align="center">
                        <Grid item>
                            <div className="upload">
                                <Avatar
                                    className="avatar"
                                    src={photoUrl}
                                    onClick={() => {
                                        fileInput.current.click();
                                    }}
                                >
                                    B
                                </Avatar>
                                {photoUrl && (
                                    <div className="round" style={{ backgroundColor: 'red' }} onClick={() => { setShowAlert(true) }}>
                                        <i className="fa-solid fa-trash" style={{ color: '#fff' }}></i>
                                    </div>
                                )}
                                {showAlert && (
                                    <Alert
                                        show={showAlert}
                                        onHide={() => setShowAlert(false)}
                                    >
                                        <p>Profil rasmini o'chirib tashlamoqchimisiz?</p>
                                        <button buttonkey="true" onClick={() => setShowAlert(false)}>Yopish</button>
                                        <button buttonkey="true" className="delete_button" onClick={handleDelete}>O'chirish</button>
                                    </Alert>
                                )}
                                <input ref={fileInput} type="file" accept="image/png, image/jpeg" onChange={fileInputChange} />
                                {showAlertPic && (
                                    <Alert
                                    show={showAlertPic}
                                    onHide={ hideAlertPic }
                                    >
                                        <div className="alert_img">
                                            <img src={URL.createObjectURL(fileInput.current.files[0])} alt="rasm" onLoad={ setSizeToImg } />
                                        </div>
                                        <p style={{ textAlign: 'center' }}>Shu rasmni qo'ymoqchimisiz?</p>
                                        <button buttonkey="true" className="delete_button" onClick={ hideAlertPic }>Yopish</button>
                                        <button buttonkey="true" onClick={() => changePhoto(fileInput.current)}>Saqlash</button>
                                    </Alert>
                                )}
                            </div>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Telefon raqam"
                                size="small"
                                disabled
                                value={phoneNumber} />
                        </Grid>
                        <Grid item>
                            <TextField id="firstName" label="Ism" error={!firstName}
                                value={firstName} size="small" onChange={changeFirstName} />
                        </Grid>
                        <Grid item>
                            <TextField id="lastName" label="Familya" error={!lastName}
                                value={lastName} size="small" onChange={changeLastName} />
                        </Grid>
                        <Grid item>
                            <Button id="save" variant="contained" onClick={save} disabled={!canSave || !firstName || !lastName}>
                                Saqlash
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>);
}

export default Profile;