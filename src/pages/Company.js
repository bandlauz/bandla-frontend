import { useRef, useState } from 'react';
import Input from '../components/Input';
import { Avatar } from '@mui/material';
import Alert from '../components/Alert';
import Request from '../util/Request';
import * as IMG from '../util/Image.js';

import { toast } from 'react-toastify';

import './css/Company.css';

export default function Company() {
  const fileInput = useRef(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [showAlertPic, setShowAlertPic] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const maxPhotoSize = 1024 * 1024 * 6; //KB

  const handleDelete = async () => {
    setShowAlert(false);
    await updatePhoto(
      null,
      "Profil rasmi o'chirildi",
      "Profile rasmini o'chirishda xatolik ro'y berdi"
    );
  };

  const navigateToLogin = () => {
    window.location.href = 'login';
  };

  const updatePhoto = async (photoUrl, successMessage, errorMessage) => {
    try {
      await Request(
        'https://api.bandla.uz/api/profile/my/update-photo',
        'put',
        null,
        { photoUrl: photoUrl },
        true,
        navigateToLogin
      );
      setPhotoUrl(photoUrl);
      toast.success(successMessage);
    } catch (error) {
      if (error.response.data?.errors) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  async function fileInputChange() {
    setShowAlertPic(true);
  }

  function hideAlertPic() {
    setShowAlertPic(false);
    fileInput.current.value = '';
  }

  const changePhoto = async (event) => {
    const file = event.files[0];
    if (file.size > maxPhotoSize) {
      toast.error("Photo surati hajmi 6 MB dan kam bo'lishi kerak!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await Request(
        'https://api.bandla.uz/api/file-store',
        'post',
        null,
        formData,
        true,
        navigateToLogin
      );
      setShowAlertPic(false);

      await updatePhoto(
        response.data.data.url,
        'Profil rasmi saqlandi',
        "Profile rasmini saqlashda xatolik ro'y berdi"
      );
    } catch (error) {
      if (error.response.data?.errors) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error("Photo suratni yuklashda xatolik ro'y berdi");
      }
    }
  };

  async function setSizeToImg(e) {
    const img = e.target;
    const parent = img.parentElement;

    const imgMaxSize = (await IMG.getData(fileInput.current.files[0])).size.max;
    const parentMinSize = IMG.minSize(parent.clientWidth, parent.clientHeight);

    if (imgMaxSize === 'square') {
      img.style[parentMinSize] = '100%';
      parent.style[parentMinSize] = '400px';
    }
    if (imgMaxSize !== 'square') {
      img.style[imgMaxSize] = '100%';
      parent.style[imgMaxSize] = '400px';
    }
  }

  return (
    <>
      <div className="company_con">
        <h1>Kompaniya ma'lumotlari</h1>
        <div className="upload">
          <Avatar
            className="avatar"
            src={photoUrl}
            onClick={() => {
              fileInput.current.click();
            }}
            style={photoUrl ? { background: 'none' } : {}}
          >
            B
          </Avatar>
          {photoUrl && (
            <div
              className="round"
              style={{ backgroundColor: 'red' }}
              onClick={() => {
                setShowAlert(true);
              }}
            >
              <i className="fa-solid fa-trash" style={{ color: '#fff' }}></i>
            </div>
          )}
          {showAlert && (
            <Alert show={showAlert} onHide={() => setShowAlert(false)}>
              <p>Profil rasmini o'chirib tashlamoqchimisiz?</p>
              <button buttonkey="true" onClick={() => setShowAlert(false)}>
                Yopish
              </button>
              <button
                buttonkey="true"
                className="delete_button"
                onClick={handleDelete}
              >
                O'chirish
              </button>
            </Alert>
          )}
          <input
            ref={fileInput}
            type="file"
            accept="image/png, image/jpeg"
            onChange={fileInputChange}
          />
          {showAlertPic && (
            <Alert show={showAlertPic} onHide={hideAlertPic}>
              <div className="alert_img">
                <img
                  src={URL.createObjectURL(fileInput.current.files[0])}
                  alt="rasm"
                  onLoad={setSizeToImg}
                />
              </div>
              <p style={{ textAlign: 'center' }}>Shu rasmni qo'ymoqchimisiz?</p>
              <button
                buttonkey="true"
                className="delete_button"
                onClick={hideAlertPic}
              >
                Yopish
              </button>
              <button
                buttonkey="true"
                onClick={() => changePhoto(fileInput.current)}
              >
                Saqlash
              </button>
            </Alert>
          )}
        </div>
        <div className="inputs">
          <Input type="text" label="Kompaniya nomi" />
          <Input type="text" label="Manzil" />
          <button>Tasdiqlash</button>
        </div>
      </div>
    </>
  );
}
