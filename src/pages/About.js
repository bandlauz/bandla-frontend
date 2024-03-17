import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import './css/Home.css'
import './css/About.css'

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
    name: 'Akbar Jorayev',
    occupation: 'Frontend developer',
    photo:
      'https://bandla-public.s3.eu-north-1.amazonaws.com/4fee6708-891d-4112-9f89-519759b4d0ef',
    socialAccounts: [
      {
        link: 'https://www.instagram.com/akbarjorayevaj/',
        icon: 'fa-brands fa-instagram fa-2x',
      },
      {
        link: 'https://www.facebook.com/akbarjorayevAJ/',
        icon: 'fa-brands fa-facebook fa-2x',
      },
      {
        link: 'https://www.linkedin.com/in/akbar-jorayev-89519b269/',
        icon: 'fa-brands fa-linkedin fa-2x',
      },
      {
        link: 'https://t.me/akbarjorayevaj',
        icon: 'fa-brands fa-telegram fa-2x',
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
]

function About() {
  const moveTextY = useRef(null)
  const [activeTextW, setActiveTextW] = useState(
    moveTextY.current?.children[0].clientWidth
  )
  const [count, setCount] = useState(0)
  const moveTexts = ['tez', 'oson', 'qulay', 'xavfsiz']

  useEffect(() => {
    const interval = setInterval(() => {
      const children = moveTextY.current?.children
      const next = moveTexts.length - 1 === count % 3 ? 0 : (count % 3) + 1

      const span = document.createElement('span')
      span.classList.add('gradient_txt')
      span.textContent = moveTexts[next]
      moveTextY.current?.appendChild(span)

      children[count]?.classList.add('hide')

      setActiveTextW(span.clientWidth)
      setCount((cur) => cur + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [activeTextW, count])

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
      <h1 className="title">Biz haqimiqda</h1>
      <p>
        Bandla chiptalarni bron qilishni soddalashtiradi, bu sizga istalgan
        joydan joy band qilish imkonini beradi. Foydalanuvchi uchun qulay
        interfeys bilan biz jarayonni soddalashtiramiz, qulaylik va
        samaradorlikni ta'minlaymiz. Konsertlar, sport tadbirlari yoki teatr
        tomoshalari bo'ladimi, Bandla keng ko'lamli tajribalardan uzluksiz
        foydalanish imkonini beradi. Bizga qo'shiling va bugun oson chiptalarni
        bron qilishni oching.
      </p>
      <h1 className="title">Bizning jamoa</h1>
      <div className="people_list">
        {peopleList.map((person, index) => (
          <div className="person" key={index}>
            <div className="person_area">
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
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About;
