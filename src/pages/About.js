import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import './css/About.css';

const peopleList = [
  {
    name: 'Azimjon Nazarov',
    occupation: 'Founder',
    photo:
      'https://bandla-public.s3.eu-north-1.amazonaws.com/b95a4158-b467-48c0-b7dd-801af38b8a8c',
    socialAccounts: [
      {
        link: 'https://www.instagram.com/nazarov_ctrl/',
        icon: 'fa-brands fa-instagram fa-2x',
      },
      {
        link: 'https://www.linkedin.com/in/azimjon-nazarov/',
        icon: 'fa-brands fa-linkedin fa-2x',
      },
    ],
  },
  {
    name: `Akbar Jo'rayev`,
    occupation: 'Frontend developer',
    photo:
      'https://bandla-public.s3.eu-north-1.amazonaws.com/4fee6708-891d-4112-9f89-519759b4d0ef',
    socialAccounts: [
      {
        link: 'https://www.instagram.com/akbarjorayevaj/',
        icon: 'fa-brands fa-instagram fa-2x',
      },
      {
        link: 'https://www.linkedin.com/in/akbarjorayevaj/',
        icon: 'fa-brands fa-linkedin fa-2x',
      },
    ],
  },
  {
    name: 'Abduvahob',
    occupation: 'Frontend developer',
    photo: 'https://i.stack.imgur.com/34AD2.jpg',
  },
  {
    name: 'Kamron',
    occupation: 'Frontend developer',
    photo: 'https://i.stack.imgur.com/34AD2.jpg',
  },
  {
    name: 'Shamsiddin',
    occupation: 'Backend developer',
    photo: 'https://i.stack.imgur.com/34AD2.jpg',
  },
];

const peopleAreaW = document.body.clientWidth - 24 * 2;
const amountOfPeople = getAmountOfPeople();
const winWidth = peopleAreaW / amountOfPeople;

function getAmountOfPeople() {
  const amount = Math.floor(peopleAreaW / 200);

  return Math.min(peopleList.length - 1, amount);
}

function getNextIndex(index, array) {
  return (index + 1) % array.length;
}

function getPerson(index, width) {
  const person = peopleList[index];
  return (
    <div
      className="person"
      key={new Date().getTime() * (index + 1)}
      style={{ width: `${width}px` }}
    >
      <div className="person_info_area">
        <div className="photo">
          <img src={person.photo} alt="" loading="lazy" />
        </div>
        <div className="name">{person.name}</div>
        <div className="occupation">{person.occupation}</div>
        <div className="social_accounts">
          {person.socialAccounts?.map((account, index) => {
            return (
              <a
                href={account.link}
                target="_blank"
                rel="noreferrer"
                key={index}
              >
                <i className={account.icon}></i>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function About() {
  const moveTextY = useRef(null);
  const peopleListEl = useRef(null);
  const [peopleCount, setPeopleCount] = useState(amountOfPeople);
  const [peopleListMap, setPeopleListMap] = useState(() =>
    Array.from({ length: peopleCount + 1 }, (_, i) => getPerson(i, winWidth))
  );
  const [activeTextW, setActiveTextW] = useState(
    moveTextY.current?.children[0].clientWidth
  );
  const [count, setCount] = useState(0);
  const moveTexts = ['tez', 'oson'];

  useEffect(() => {
    const interval = setInterval(() => {
      const children = moveTextY.current?.children;
      const next = getNextIndex(count, moveTexts);

      const span = document.createElement('span');
      span.classList.add('gradient_txt');
      span.textContent = moveTexts[next];
      moveTextY.current?.appendChild(span);

      children[count]?.classList.add('hide');

      setActiveTextW(span.clientWidth);
      setCount((cur) => cur + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTextW, count]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getNextIndex(peopleCount, peopleList);

      setPeopleListMap([...peopleListMap, getPerson(next, winWidth)]);
      setPeopleCount((cur) => cur + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [peopleCount]);

  return (
    <div className="about_area">
      <div className="about_intro">
        <span style={{ fontWeight: 'bold' }}>Bandla</span>
        <span>bilan</span>
        <div className="move_text_y">
          <div
            className="move_text_area"
            ref={moveTextY}
            style={{
              transform: `translateY(-${50 * count}px)`,
              width: `${activeTextW}px`,
            }}
          >
            <span className="gradient_txt">tez</span>
          </div>
        </div>
        <span className="last_span">band qiling!</span>
      </div>
      <p>
        Bandla bron qilishni soddalashtiradi, bu sizga istalgan joydan joy va
        service band qilish imkonini beradi. Foydalanuvchi uchun qulay interfeys
        bilan biz jarayonni soddalashtiramiz va qulaylikni ta'minlaymiz.
        Konsertlar, sport tadbirlari yoki teatr tomoshalari bo'ladimi, Bandla
        keng ko'lamli xizmatlardan uzluksiz foydalanish imkonini beradi. Biz
        bilan oson bron qiling.
      </p>
      <h1 className="title">Bizning jamoa</h1>
      <div className="people_area phone">
        <div
          className="people_list"
          ref={peopleListEl}
          style={{
            transform: `translateX(-${
              winWidth * (peopleCount - amountOfPeople)
            }px)`,
          }}
        >
          {peopleListMap.map((person) => person)}
        </div>
      </div>
    </div>
  );
}

export default About;
