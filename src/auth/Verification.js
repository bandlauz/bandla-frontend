import * as React from 'react';
import '../pages/css/Login.css';
import { useState, useEffect, useRef } from 'react';
import Request from '../util/Request';
import PasswordForm from './PasswordForm';
import { Card, CardContent, Button, Typography } from '@mui/material';

const Verification = ({ phoneNumber, API_SEND_CODE, fullPhoneNumber, setVerificationFormVisible }) => {
    const [countdown, setCountdown] = useState(60);
    const [isAllInputsFilled, setIsAllInputsFilled] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isPasswordFormVisible, setPasswordFormVisible] = useState(false);
    const [temporaryToken, setTemporaryToken] = useState(null);

    const [verificationCode, setVerificationCode] = useState(new Array(4).fill(''));
    const inputRefs = useRef([]);
    useEffect(() => {
        inputRefs.current[0].focus();
    }, []);

    const handleChange = (e, index) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        setErrorMsg(null);
        value = value.slice(-1); // Take only the last character
        const updatedCode = [...verificationCode];
        updatedCode[index] = value;
        setVerificationCode(updatedCode);

        // Move focus to the next input
        if (value !== '' && index < 4 - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').trim();
        if (pasteData.length === 4 && /^\d+$/.test(pasteData)) {
            const pasteDigits = pasteData.split('');
            const updatedCode = [...verificationCode];
            for (let i = 0; i < 4; i++) {
                updatedCode[i] = pasteDigits[i];
            }
            setVerificationCode(updatedCode);
        }
    };

    useEffect(() => {  // secundomer
        let interval;

        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [countdown, verificationCode]);



    useEffect(() => {
        setIsAllInputsFilled(verificationCode.every(state => state !== ""));
    }, [verificationCode]);



    const handleResendCode = async () => {
        try {
            await Request(API_SEND_CODE, "post", fullPhoneNumber);
            setCountdown(60);
            const firstInput = document.getElementById('digit-0');
            if (firstInput) {
                firstInput.focus();
            }
        } catch (error) {
            console.error('Error resending code:', error.message);
        }
    };

    const handleGoBack = () => {
        setVerificationFormVisible(false);
    };


    useEffect(() => {
        const handleVerification = async () => {
            try {
                const enteredCode = verificationCode.join('');

                const requestData = {
                    phoneNumber: fullPhoneNumber,
                    code: enteredCode,
                };
                const response = await Request('https://api.bandla.uz/auth/verification/check-confirmation-code', 'put', null, requestData);
                if (response?.status === 200) {
                    setTemporaryToken(response.data.data);
                    setPasswordFormVisible(true);
                }
            } catch (error) {
                if (error?.response?.data?.code === 100) {
                    if (countdown > 0) {
                        setErrorMsg('Tasdiqlash kodi xato');
                    } else {
                        setErrorMsg('Tasdiqlash kodi yaroqsiz');
                    }
                }
            }
        };

        if (isAllInputsFilled) {
            handleVerification();
        }
    }, [isAllInputsFilled]);


    return (
        <>
            {isPasswordFormVisible ? (
                <PasswordForm temporaryToken={temporaryToken} />
            ) : (
                <div className="login-wrapper">
                    <Card sx={{ minWidth: '200px', width: '600px', borderRadius: '12px' }}>
                        <CardContent
                            sx={{
                                p: '30px'
                            }}>
                            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Tasdiqlash kodini kiriting</Typography>
                            <Typography sx={{ fontWeight: 'regular', my: '20px', fontSize: '19px' }}><b>+998 {phoneNumber}</b> telefon raqamini tasdiqlash uchun
                                <br />  4 xonali kod yubordik</Typography>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                {verificationCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => inputRefs.current[index] = el}
                                        id={`digit-${index}`}
                                        type="tel"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        style={{
                                            outline: 'none',
                                            width: '50px',
                                            height: '50px',
                                            textAlign: 'center',
                                            backgroundColor: "#f2f4f7",
                                            borderRadius: "12px",
                                            marginRight: '4px',
                                            border: errorMsg ? '1px solid #e50000' : 'none',
                                            fontFamily: "Inter",
                                            fontSize: "20px"
                                        }}
                                    />
                                ))}
                            </div>
                            <div style={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                marginTop: '20px'
                            }}>
                                {errorMsg && (
                                    <Typography sx={{
                                        color: '#e50000',
                                        marginTop: '40px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}>{errorMsg}</Typography>
                                )}
                            </div>
                            <Typography
                                sx={{ margin: '70px 0 30px 0', textAlign: 'center', fontSize: '19px', color: '#595b66' }}>
                                {countdown > 0
                                    ? `Agarda tasdiqlash kodi kelmasa ${countdown} soniyadan so'ng qayta yuborish mumkin`
                                    : (
                                        <Typography onClick={handleResendCode}
                                            sx={{
                                                cursor: 'pointer',
                                                fontSize: '19px',
                                                fontWeight: '550',
                                                color: '#000'
                                            }}>
                                            <i className="fas fa-redo-alt"></i> Qayta yuborish
                                        </Typography>
                                    )}
                            </Typography>
                            <Button className="login-button" variant="contained"
                                sx={{ fontSize: '19px' }}
                                onClick={handleGoBack}>
                                <i className="fa-solid fa-arrow-left"></i>
                                <span style={{ marginLeft: '5px' }}>Orqaga</span>
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            )}
        </>
    );
};

export default Verification;