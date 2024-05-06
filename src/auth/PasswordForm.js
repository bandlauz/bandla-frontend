import * as React from 'react';
import { useState } from 'react';
import Request from '../util/Request';
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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';

const PasswordForm = ({ temporaryToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password === '' && passwordError !== '') {
      setPasswordError('');
      return true;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Parol 8 ta belgidan kam bo'lmasligi kerak va kamida 1 ta kichik harf, 1 ta bosh harf va 1 ta raqam qatnashishi zarur"
      );
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
    if (
      validatePassword() &&
      password === confirmPassword &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      try {
        const response = await Request(
          'https://api.bandla.uz/auth/verification/complete',
          'put',
          null,
          {
            temporaryToken: temporaryToken,
            password: password,
          }
        );
        if (response.status === 200) {
          toast.success("Siz ro'yxatdan o'tdingiz");
          await sleep(2000);
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="login-wrapper">
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
        theme="light"
      />
      <Card
        sx={{
          minWidth: '200px',
          width: '600px',
          borderRadius: '12px',
          height: '400px',
        }}
      >
        <CardContent sx={{ p: '30px' }}>
          <Typography
            sx={{
              fontSize: '20px',
              fontFamily: 'Inter, sans-serif !important',
            }}
          >
            Parol
          </Typography>
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
            />
          </FormControl>
          <div>
            {passwordError && (
              <Typography
                sx={{
                  color: '#e50000',
                  fontSize: '15px',
                  fontFamily: 'Inter, sans-serif !important',
                }}
              >
                {passwordError}
              </Typography>
            )}
          </div>
          <Typography
            sx={{
              mt: 3,
              fontSize: '20px',
              fontFamily: 'Inter, sans-serif !important',
            }}
          >
            Подтвердите пароль
          </Typography>
          <FormControl sx={{ my: 1, mt: 1, width: '100%' }} variant="outlined">
            <OutlinedInput
              sx={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
              id="outlined-adornment-confirm-password"
              type={showPassword ? 'text' : 'password'}
              onPaste={(e) => e.preventDefault()}
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
            />
          </FormControl>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              sx={{
                backgroundColor: '#006DC7 !important',
                color: '#fff',
                fontSize: '20px',
                my: 1,
              }}
              onClick={handleButtonClick}
              disabled={
                password !== confirmPassword ||
                password === '' ||
                confirmPassword === ''
              }
            >
              OK
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordForm;
