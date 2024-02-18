import * as React from 'react';
import '../pages/css/Login.css';
import Request from '../util/Request';
import { useState, useEffect } from 'react';
import useVerificationHook from "./useVerificationHook";
import PasswordForm from './PasswordForm';
import { styled } from '@mui/system';
import { Card, CardContent, Button, Typography, TextField } from '@mui/material';

const StyledTextField = styled(TextField)({
    marginRight: '0.5em',
    width: "50px",
    height: "48px",
    '& .MuiOutlinedInput-notchedOutline ': {
        border: 'none',
    },

});

const Verification = ({ phoneNumber, API_SEND_CODE, fullPhoneNumber, setVerificationFormVisible }) => {
    const { inputStates, handleChange } = useVerificationHook(4);
    const [countdown, setCountdown] = useState(60);
    const [isAllInputsFilled, setIsAllInputsFilled] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isPasswordFormVisible, setPasswordFormVisible] = useState(false);
    const [temporaryToken, setTemporaryToken] = useState(null);
    const handleInput = (e, index) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        handleChange({ target: { value: numericValue } }, index);
        setErrorMsg(null);
    };

    useEffect(() => {
        const firstInput = document.getElementById('digit-0');
        if (firstInput) {
            firstInput.focus();
        }
    }, []);

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
    }, [countdown, inputStates]);

    useEffect(() => {
        setIsAllInputsFilled(inputStates.every(state => state.digit !== ""));
    }, [inputStates]);


    const handleResendCode = async () => {
        try {
            await Request(API_SEND_CODE, "postWithParam", fullPhoneNumber);
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
                const enteredCode = inputStates.map(state => state.digit).join('');
                const requestData = {
                    phoneNumber: fullPhoneNumber,
                    code: enteredCode,
                };
                const response = await Request('https://api.bandla.uz/auth/verification/check-confirmation-code', 'put', '0', requestData);
                if (response?.status === 200) {
                    setTemporaryToken(response.data.data);
                    setPasswordFormVisible(true);
                }
            } catch (error) {
                if (error?.response?.data?.code === 100) {
                    if (countdown > 0) {
                        setErrorMsg('Неверный код!');
                    } else {
                        setErrorMsg('Время ввода кода истекло!');
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
                            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Введите код</Typography>
                            <Typography sx={{ fontWeight: 'regular', my: '20px', fontSize: '19px' }}>Для подтверждения
                                телефона
                                отправили <br /> 4-значный код на <b>+998 {phoneNumber}</b></Typography>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                {inputStates.map((state, index) => (
                                    <StyledTextField
                                        key={index}
                                        type="text"
                                        value={state.digit}
                                        id={`digit-${index}`}
                                        onChange={(e) => handleInput(e, index)}
                                        inputProps={{
                                            maxLength: 1,
                                            style: {
                                                textAlign: 'center',
                                                backgroundColor: "#f2f4f7",
                                                borderRadius: "12px",
                                                border: errorMsg ? '1px solid #e50000' : 'none',
                                                fontFamily: "Inter",
                                                fontSize: "20px"
                                            },
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
                                    ? `Если код не придёт, можно получить новый через ${countdown} сек`
                                    : (
                                        <Typography onClick={handleResendCode}
                                            sx={{
                                                cursor: 'pointer',
                                                fontSize: '19px',
                                                fontWeight: '550',
                                                color: '#000'
                                            }}>
                                            <i className="fas fa-redo-alt"></i> Отправить код повторно
                                        </Typography>
                                    )}
                            </Typography>
                            <Button className="login-button" variant="contained"
                                sx={{ fontSize: '19px' }}
                                onClick={handleGoBack}>
                                <i className="fa-solid fa-arrow-left"></i>
                                <span style={{ marginLeft: '5px' }}>Назад</span>
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            )}
        </>
    );
};

export default Verification;