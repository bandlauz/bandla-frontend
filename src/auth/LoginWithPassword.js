import * as React from 'react';
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
import {useState} from "react";
import './css/login.css';
import Request from '../Requests';
import { useNavigate } from 'react-router-dom';

const LoginWithPassword = ({fullPhoneNumber}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate();
    const handlePasswordChange = (e) => {
        setPasswordError('');
        setPassword(e.target.value);
    };

    const handleButtonClick = async () => {
        const trimmedPassword = password.trim();
        if (trimmedPassword !== '') {
            try {
                const response = await Request(
                    'https://api.bandla.uz/auth/login',
                    'post',
                    '',
                    {
                        phoneNumber: fullPhoneNumber,
                        password: password
                    }
                );
                if (response.status === 200) {
                    navigate('/');
                }
            } catch (error) {
                setPasswordError('Неверный пароль!');
            }
        }
    };

    return (
        <>
            <div className="login-wrapper">
                <Card sx={{minWidth: '200px', maxWidth: '500px', borderRadius: '12px', height: '250px'}}>
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
                                fontSize: '17px',
                                marginTop: '5px',
                                fontFamily: 'Inter, sans-serif !important',
                                my: 1
                            }}>
                                {passwordError}
                            </Typography>
                        )}
                        <div style={{display: 'flex', justifyContent: 'end'}}>
                            <Button
                                sx={{backgroundColor: '#006DC7 !important', color: '#fff', fontSize: '20px', my: 1}}
                                onClick={handleButtonClick}
                            >
                                OK
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default LoginWithPassword;