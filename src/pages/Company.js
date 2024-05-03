import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Input from '../components/Input';
import Alert from '../components/Alert';
import Request from '../util/Request';
import * as IMG from '../util/Image.js';
import './css/Company.css';

export default function Company() {
  const companyName = useRef();
  const companyAddress = useRef();
  const fileInput = useRef(null);
  const [showAlertPic, setShowAlertPic] = useState(false);
  const [company, setCompany] = useState({});
  const maxPhotoSize = 1024 * 1024 * 6; //KB

  useEffect(() => {
    async function getData() {
      try {
        const response = await Request(
          'https://api.bandla.uz/api/user-panel/company/find',
          'get',
          null,
          null,
          true,
          null,
          navigateToLogin
        );

        setCompany(response.data.data);
      } catch (error) {
        if (error.response?.data?.errors) {
          toast.error(error.response.data.errors[0]);
        } else {
          toast.error("Kompaniya yuklashda xatolik ro'y berdi");
        }
      }
    }
    getData();
  }, []);

  const navigateToLogin = () => {
    window.location.href = 'login';
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
      setCompany({ ...company, url: response.data.data.url });
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

  async function createCompany() {
    const companyData = {
      name: companyName.current.value,
      address: companyAddress.current.value,
      photoUrl: company?.url,
    };

    try {
      const response = await Request(
        'https://api.bandla.uz/api/user-panel/company/create',
        'post',
        null,
        companyData,
        true,
        navigateToLogin
      );

      setCompany(response.data.data);

      toast.success('Kompaniya yaratildi');
    } catch (error) {
      if (error?.response?.data?.errors) {
        toast.error(error?.response?.data?.errors[0]);
      } else {
        toast.error("Kompaniya yaratishda xatolik ro'y berdi");
      }
    }
  }

  function changePhotoClick() {
    changePhoto(fileInput.current);
    hideAlertPic();
  }

  return (
    <>
      <div className="company_con">
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
        <h1>Kompaniya ma'lumotlari</h1>
        <div className="upload">
          <Avatar
            className="avatar"
            src={company?.status ? company?.photoUrl : company?.url}
            onClick={() => {
              if (company?.status) return;
              fileInput.current.click();
            }}
            style={
              company?.photoUrl || company?.url
                ? { background: 'none', cursor: 'default' }
                : {}
            }
          >
            B
          </Avatar>
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
              <button buttonkey="true" onClick={changePhotoClick}>
                Saqlash
              </button>
            </Alert>
          )}
        </div>
        <div className="inputs">
          <Input
            ref={companyName}
            type="text"
            label="Nomi"
            {...(company?.id && {
              value: company?.name,
            })}
            disabled={!!company?.id}
          />
          <Input
            ref={companyAddress}
            type="text"
            label="Manzil"
            {...(company?.id && {
              value: company?.address,
            })}
            disabled={!!company?.id}
          />
          {!company?.status && (
            <button onClick={createCompany}>Tasdiqlash</button>
          )}
          {company?.status && (
            <button className="created_btn">{company?.status}</button>
          )}
        </div>
      </div>
    </>
  );
}
