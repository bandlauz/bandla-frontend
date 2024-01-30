import * as React from 'react';
import {useState} from 'react';
import Request from '../Requests';
import Login from './Login';
import './css/login.css';
import {
    Card,
    CardContent,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Typography,
    Button
} from '@mui/material';

import {Visibility, VisibilityOff} from '@mui/icons-material';

const PasswordForm = ({temporaryToken}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginVisible, setLoginVisible] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
                    'http://api.bandla.uz/auth/verification/complete',
                    'put',
                    '',
                    {
                        temporaryToken: temporaryToken,
                        password: password
                    }
                );
                if (response.data.message === "SUCCESS") {
                    setLoginVisible(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <div>
                {loginVisible ? (
                    <Login/>
                ) : (
                    <Card sx={{minWidth: '200px', maxWidth: '500px', borderRadius: '12px'}}>
                        <CardContent sx={{p: '30px'}}>
                            <Typography
                                sx={{fontSize: '20px', fontFamily: 'Inter, sans-serif !important'}}>Пароль</Typography>
                            <FormControl sx={{my: 1, width: '100%'}} variant="outlined">
                                <OutlinedInput
                                    sx={{fontSize: '20px', fontFamily: 'Inter, sans-serif'}}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label={null}
                                    onChange={handlePasswordChange}
                                    // onFocus={handlePasswordFocus}
                                />
                            </FormControl>
                            {passwordError && (
                                <Typography sx={{
                                    color: '#e50000',
                                    fontSize: '15px',
                                    marginTop: '5px',
                                    fontFamily: 'Inter, sans-serif !important',
                                    my: 1
                                }}>
                                    {passwordError}
                                </Typography>
                            )}
                            <Typography sx={{fontSize: '20px', fontFamily: 'Inter, sans-serif !important'}}>Подтвердите
                                пароль</Typography>
                            <FormControl sx={{my: 1, width: '100%'}} variant="outlined">
                                <OutlinedInput
                                    sx={{fontSize: '20px', fontFamily: 'Inter, sans-serif'}}
                                    id="outlined-adornment-confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label={null}
                                    onChange={handleConfirmPasswordChange}
                                    // onFocus={handlePasswordFocus}
                                />
                            </FormControl>
                            <div style={{display: 'flex', justifyContent: 'end'}}>
                                <Button
                                    sx={{backgroundColor: '#2BBDE9 !important', color: '#fff', fontSize: '20px', my: 1}}
                                    onClick={handleButtonClick}
                                    disabled={password !== confirmPassword || password === '' || confirmPassword === ''}
                                >
                                    OK
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
};

export default PasswordForm;
