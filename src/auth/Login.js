import * as React from 'react';
import './css/login.css';
import InputMask from 'react-input-mask';
import {styled} from '@mui/system';
import {Card, CardContent, Button, Typography, Alert, AlertTitle} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import Request from "../Requests";

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
        setError('');
    };

    const isPhoneNumberValid = () => {
        return phoneNumber.replace(/\D/g, '').length === 9;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fullPhoneNumber = `+998${phoneNumber.replace(/\D/g, '')}`;
        const API_URL = "http://api.bandla.uz/auth/is-not-verified/";
        try {
            const response = await Request(API_URL, "post", fullPhoneNumber);
            if (response.data.data === true) {
                navigate('/verification');
            } else {
                setError('Произошла ошибка при проверке номера телефон.');
            }
        } catch (error) {
            console.error('Error making POST request:', error.message);
            setError('Произошла ошибка при проверке номера телефона.');
        }
    };


    return (
        <div className="Login login-wrapper">
            <Card sx={{minWidth: '200px', maxWidth: '500px', borderRadius: '12px'}}>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: '30px'
                    }}>
                    <Typography variant='h5' sx={{fontWeight: 'bold'}}>Введите номер телефона</Typography>
                    <Typography sx={{fontWeight: 'regular', my: '10px'}}>Отправим смс с кодом подтверждения</Typography>
                    <form action="" onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <div className="phone-container">
                            <span className="country-code">+998</span>
                            <InputMask
                                mask="99 999-99-99"
                                maskChar=""
                                placeholder="00 000-00-00"
                                alwaysShowMask={true}
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                sx={{flex: '1 1 auto', minWidth: 0}}
                            >
                                {(inputProps) => <InputElement {...inputProps} />}
                            </InputMask>
                        </div>
                        <Button type={"submit"} sx={{my: '20px'}} className="login-button" variant="contained"
                                disableElevation
                                disabled={!isPhoneNumberValid()}>
                            Получить код
                        </Button>
                    </form>
                    {error && (
                        <Alert sx={{m: '20px', position: 'absolute', top: 0, right: 0}} severity="error">
                            <AlertTitle>Ошибка</AlertTitle>
                            {error}
                        </Alert>
                    )}
                    <Button className="login-button" variant="contained" disableElevation>
                        <Typography sx={{mr: '10px'}} variant="h5"><i variant="h1"
                                                                      className="fa-brands fa-telegram"></i></Typography>
                        Войти через Telegram
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}


const InputElement = styled('input')(
    ({theme}) => `
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? 'var(--grey-300)' : 'var(--grey-900)'};
  background: none;
  border: none;
  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export default Login;