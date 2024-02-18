import * as React from 'react';
import { useState } from 'react';
import Request from '../util/Request';
import Login from '../pages/Login';
import '../pages/css/Login.css';
import {
    Card,
    CardContent,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Typography,
    Button,
    Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordForm = ({ temporaryToken }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginVisible, setLoginVisible] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (password === '' && passwordError !== '') {
            setPasswordError('');
            return true;
        }

        if (!passwordRegex.test(password)) {
            setPasswordError('Пароль должен иметь длину не менее 8 символов, содержать не менее 1 строчной буквы, 1 заглавной буквы и 1 цифры.');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };


    const handlePasswordChange = (e) => {
        setPasswordError('');
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setPasswordError('');
        setConfirmPassword(e.target.value);
    };

    const handleButtonClick = async () => {
        if (validatePassword() && password === confirmPassword && password !== '' && confirmPassword !== '') {
            try {
                const response = await Request(
                    'https://api.bandla.uz/auth/verification/complete',
                    'put',
                    '',
                    {
                        temporaryToken: temporaryToken,
                        password: password
                    }
                );
                if (response.status === 200) {
                    setRegistrationSuccess(true);
                    setLoginVisible(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            {loginVisible ? (
                <div>
                    {registrationSuccess && (
                        <Alert className="AlertContainer" severity="success"
                            sx={{
                                marginTop: '30px',
                                position: 'fixed',
                                top: 0,
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}
                        >
                            You have successfully registered, now you can enter the system through login.
                        </Alert>
                    )}
                    <Login setRegistrationSuccess={setRegistrationSuccess} />
                </div>
            ) : (
                <div className="login-wrapper">
                    <Card sx={{ minWidth: '200px', width: '600px', borderRadius: '12px', height: '400px' }}>
                        <CardContent sx={{ p: '30px' }}>
                            <Typography
                                sx={{ fontSize: '20px', fontFamily: 'Inter, sans-serif !important' }}>Пароль</Typography>
                            <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
                                <OutlinedInput
                                    sx={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label={null}
                                    onChange={handlePasswordChange}
                                // onFocus={handlePasswordFocus}
                                />
                            </FormControl>
                            <div>
                                {passwordError && (
                                    <Typography sx={{
                                        color: '#e50000',
                                        fontSize: '15px',
                                        fontFamily: 'Inter, sans-serif !important',
                                    }}>
                                        {passwordError}
                                    </Typography>
                                )}
                            </div>
                            <Typography sx={{ mt: 3, fontSize: '20px', fontFamily: 'Inter, sans-serif !important' }}>Подтвердите
                                пароль</Typography>
                            <FormControl sx={{ my: 1, mt: 1, width: '100%' }} variant="outlined">
                                <OutlinedInput
                                    sx={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
                                    id="outlined-adornment-confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label={null}
                                    onChange={handleConfirmPasswordChange}
                                // onFocus={handlePasswordFocus}
                                />
                            </FormControl>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <Button
                                    sx={{ backgroundColor: '#2BBDE9 !important', color: '#fff', fontSize: '20px', my: 1 }}
                                    onClick={handleButtonClick}
                                    disabled={password !== confirmPassword || password === '' || confirmPassword === ''}
                                >
                                    OK
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
};

export default PasswordForm;