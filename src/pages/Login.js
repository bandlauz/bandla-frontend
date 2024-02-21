import * as React from 'react';
import './css/Login.css';
import NavbarSimple from '../components/NavbarSimple.js';
import Request from '../util/Request';
import Verification from '../auth/Verification';
import LoginWithPassword from '../auth/LoginWithPassword';
import InputMask from 'react-input-mask';
import { useState, useEffect, useRef } from "react";
import { styled } from '@mui/system';
import { Card, CardContent, Button, Typography, Alert, AlertTitle } from '@mui/material';

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isVerificationFormVisible, setVerificationFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [timers, setTimers] = useState({});
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isLoginWithPasswordVisible, setLoginWithPasswordVisible] = useState(false);
    const fullPhoneNumber = `+998${phoneNumber.replace(/\D/g, '')}`;
    const API_URL = "https://api.bandla.uz/auth/is-not-verified/";
    const API_SEND_CODE = "https://api.bandla.uz/auth/verification/send-confirmation-code/";
    let updateInterval;

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
        setError('');
    };

    const isPhoneNumberValid = () => {
        return phoneNumber.replace(/\D/g, '').length === 9;
    };

    const handleTimerUpdate = (phone, remainingSeconds) => {
        setTimers((prevTimers) => ({
            ...prevTimers,
            [phone]: remainingSeconds,
        }));
    };

    const startTimer = (phone, time) => {
        const startTime = new Date().getTime();
        updateInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - startTime;
            const remainingTime = Math.max(0, time * 1000 - elapsedTime);
            const remainingSeconds = Math.ceil(remainingTime / 1000);

            handleTimerUpdate(phone, remainingSeconds);

            // Clear the interval when remaining time reaches 0
            if (remainingTime <= 0) {
                handleTimerUpdate(phone, 0);
                clearInterval(updateInterval);
            }
        }, 1000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (buttonClicked) return;
        try {
            setButtonClicked(true);
            if (timers[fullPhoneNumber]) {
                // setError(`Пожалуйста, подождите ${timers[fullPhoneNumber]} секунд.`);
                return;
            }

            const response = await Request(API_URL, "post", fullPhoneNumber);
            if (response.data.data === true) {
                // const response = await Request(API_SEND_CODE, "post", fullPhoneNumber);
                setVerificationFormVisible(true);
                clearInterval(updateInterval);
            } else {
                setLoginWithPasswordVisible(true);
            }
        } catch (error) {
            switch (error?.response?.status) {
                case 429: startTimer(fullPhoneNumber, error?.response?.data?.data); break;
                case 400: setError('Произошла ошибка при проверке номера телефона'); break;
                default: setError('Произошла ошибка');
            }
        } finally {
            setButtonClicked(false);
        }
    };

    return (
        <div>
            <NavbarSimple />
            {timers[fullPhoneNumber] > 0 && (
                <Alert
                    className="AlertContainer"
                    sx={{ marginTop: '30px', position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', background: '#1f2026', color: 'white' }}
                    variant="filled" severity="error">
                    <AlertTitle>{`Пожалуйста, подождите ${timers[fullPhoneNumber]} секунд.`}</AlertTitle>
                </Alert>
            )}

            {
                isLoginWithPasswordVisible ? (
                    <LoginWithPassword fullPhoneNumber={fullPhoneNumber} />
                ) :
                    isVerificationFormVisible ? (
                        <Verification
                            phoneNumber={phoneNumber}
                            API_SEND_CODE={API_SEND_CODE}
                            fullPhoneNumber={fullPhoneNumber}
                            setVerificationFormVisible={setVerificationFormVisible}
                        />
                    ) : (
                        <div className="Login login-wrapper">
                            <Card sx={{ minWidth: '200px', maxWidth: '500px', borderRadius: '12px' }}>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        p: '30px'
                                    }}>
                                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Введите номер
                                        телефона</Typography>
                                    <br></br>
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
                                                sx={{ flex: '1 1 auto', minWidth: 0 }}
                                            >
                                                {(inputProps) => <InputElement {...inputProps} ref={inputRef} />}
                                            </InputMask>
                                        </div>
                                        <Button type={"submit"} sx={{ my: '20px' }} className="login-button"
                                            variant="contained" disableElevation
                                            disabled={!isPhoneNumberValid() || buttonClicked}>
                                            Войти
                                        </Button>
                                    </form>
                                    {error && (
                                        <Alert className="AlertContainer" sx={{ marginTop: '30px', position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)' }}
                                            severity="error">
                                            <AlertTitle>Ошибка</AlertTitle>
                                            {error}
                                        </Alert>
                                    )}
                                    <Typography>или войдите через</Typography>
                                    <Button disableElevation>
                                        <i className="fa-brands fa-telegram fa-4x" style={{ color: "#74C0FC" }}></i>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                    )}
        </div>
    );
}

const InputElement = styled('input')(
    ({ theme }) => `
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