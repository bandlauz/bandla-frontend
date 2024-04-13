import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Request from '../util/Request';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function LoginWithTelegram() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const login = async () => {
    let nonce = localStorage.getItem('nonce');
    console.log(nonce);
    try {
      const response = await Request(
        'https://api.bandla.uz/auth/login-with-telegram',
        'post',
        null,
        nonce,
        false
      );
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      navigate('/');
      window.location.reload();
    } catch (error) {
      if (error.response.data?.errors) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error("Ma'lumotlarni yuklashda xatolik ro'y berdi");
      }
    }
  };

  useEffect(() => {
    let tg = searchParams.get('tg_passport');
    if (tg === 'success') {
      login();
    } else {
      navigate('/login');
    }
  }, []);

  return (
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
      theme="light"
    />
  );
}
export default LoginWithTelegram;
