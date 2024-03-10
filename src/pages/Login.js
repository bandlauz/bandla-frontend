import * as React from 'react';
import './css/Login.css';
import Request from '../util/Request';
import Verification from '../auth/Verification';
import LoginWithPassword from '../auth/LoginWithPassword';
import InputMask from 'react-input-mask';
import { useState } from "react";
import { styled } from '@mui/system';
import { Card, CardContent, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { Telegram } from '../util/telegram-passport.js';
function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isVerificationFormVisible, setVerificationFormVisible] = useState(false);
    const [timers, setTimers] = useState({});
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isLoginWithPasswordVisible, setLoginWithPasswordVisible] = useState(false);
    const fullPhoneNumber = `+998${phoneNumber.replace(/\D/g, '')}`;
    const API_URL = "https://api.bandla.uz/auth/is-not-verified/";
    const API_SEND_CODE = "https://api.bandla.uz/auth/verification/send-confirmation-code/";
    let updateInterval;

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
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
                toast.error(`Iltimos ${timers[fullPhoneNumber]} soniya kuting!`);
                return;
            }

            let response = await Request(API_URL, "post", fullPhoneNumber);
            if (response.data.data === true) {
                response = await Request(API_SEND_CODE, "post", fullPhoneNumber);
                setVerificationFormVisible(true);
                clearInterval(updateInterval);
            } else {
                setLoginWithPasswordVisible(true);
            }
        } catch (error) {
            switch (error?.response?.status) {
                case 429: {
                    startTimer(fullPhoneNumber, error?.response?.data?.data);
                    toast.error(`Iltimos ${error?.response?.data?.data} soniya kuting!`);
                    break;
                }
                case 400: toast.error("Noto'gri telefon raqam"); break;
                default: toast.error("Xatolik ro'y berdi");
            }
        } finally {
            setButtonClicked(false);
        }
    };

    const loginWithTelegram = async () => {
        const response = await Request("https://api.bandla.uz/auth/nonce", "get", null);
        const nonce = response.data.data;
        localStorage.setItem("nonce", nonce);

        var auth_params = {
            bot_id: 6310299701,
            scope: { data: ['phone_number'], v: 1 },
            public_key: '-----BEGIN PUBLIC KEY-----\n' +
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsHF6oTC7nlgmC8pMy7t8\n' +
                'gVEcOhpX1BW9p3Ts93vCygKcCY6wJZmmwBD/ZvSzdKN6Gd7s+qeibokBQwLkRWMj\n' +
                'jizVV8BW/TrnFDtCG02DWAn1Wq8dXFtfSV5LQV5sCNTfFfTVyrA39G7kjt55mgOk\n' +
                'J+jSX5TjePRh4vdvk2YqqHYzwr5UJxxBFCETRCDwwjQgYYRxBhPhyNOi5RkaX3BE\n' +
                'aEIctIzYnq8PUQ1yK220qc2Fv3D1IsvUqle4RGz+E1gESYUEi5DvQjmGPONiGHZu\n' +
                'CMRgMe5Ypr1sZ2WsR2i38vGicyyfNUmizSNY7LLJowO0cwxZ/IHehK1tmxlUzd+r\n' +
                'kwIDAQAB\n' +
                '-----END PUBLIC KEY-----',
            nonce: nonce,
            callback_url: 'https://bandla.uz/login-telegram'
        };

        window.Telegram.Passport.auth(auth_params, function (show) {
            if (show) {
                console.log(auth_params)
            } else {
                console.log("error")
            }
        });
    }

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
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
                                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                        Telefon raqamingizni kiriting
                                    </Typography>
                                    <br></br>
                                    <form action="" onSubmit={handleSubmit} style={{ width: '100%' }}>
                                        <div className="phone-container">
                                            <span className="country-code">+998</span>
                                            <InputMask
                                                type="tel"
                                                mask="99 999-99-99"
                                                maskChar=""
                                                placeholder="00 000-00-00"
                                                alwaysShowMask={true}
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
                                                sx={{ flex: '1 1 auto', minWidth: 0 }}
                                            >
                                                {(inputProps) => <InputElement {...inputProps} />}
                                            </InputMask>
                                        </div>
                                        <Button type={"submit"} sx={{ my: '20px' }} className="login-button"
                                            variant="contained" disableElevation
                                            disabled={!isPhoneNumberValid() || buttonClicked}>
                                            Kirish
                                        </Button>
                                    </form>
                                    <Typography>yoki</Typography>
                                    <Button onClick={loginWithTelegram}>
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