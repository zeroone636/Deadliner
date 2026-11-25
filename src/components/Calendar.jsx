import { useState } from "react";
import "../components/calendar.css";
import lightning from '../img/lightning.svg'
import folder from '../img/folder.svg'
import calendar from '../img/calendar.svg'
import setting from '../img/setting.svg'
import coolicon from '../img/coolicon.svg'
import monitor from '../img/monitor.svg'
import arrow from '../img/arrow_catalog.svg'
import car from '../img/car.svg'
import file from '../img/file.svg'
import card from '../img/card.svg'
import user from '../img/user.svg'
import notifications from '../img/notification_outline_dot.svg'
import search from '../img/search-normal.svg'
import card1 from '../img/card1.svg'
import file1 from '../img/file1.svg'
import shield from '../img/shield.svg'
import umbrella from '../img/umbrella.svg'
import plus from '../img/plus.svg'
import calendaricon from '../img/calendar.svg'
import arrowleft from '../img/arrowleft.svg'
import arrowright from '../img/arrowright.svg'

export default function Calendar({ onAdd, onRegister }) {
  const [nav, setNav] = useState("catalog");
  const [activeCat, setActiveCat] = useState("warranty");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const show = (text) => !q || text.toLowerCase().includes(q);

  const text1 = "Гарантия Срок действия ваших гарантий";
  const text2 = "Страховки Страховые полисы и договоры";
  const text3 = "Договоры Важные договоры и соглашения";
  const text4 = "Карты Банковские и скидочные карты";

  return (
    <div className="app">
      <aside className={`sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="sidebar__top">
          <div className="logo">DeadLiner</div>
          <button
            className="burger"
            aria-label="Меню"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className="nav">
          <button
            className={`cats__item ${nav === "catalog" ? "is-active" : ""}`}
            onClick={() => { setNav("catalog"); setMenuOpen(false); }}
          >
            <img src={folder} alt="иконка папки" />
            Каталог
          </button>

          <button
            className={`cats__item ${nav === "reminders" ? "is-active" : ""}`}
            onClick={() => { setNav("reminders"); setMenuOpen(false); }}
          >
            <img src={coolicon} alt="иконка напоминаний" />
            Напоминания
          </button>

          <button
            className={`cats__item ${nav === "calendar" ? "is-active" : ""}`}
            onClick={() => { setNav("calendar"); setMenuOpen(false); }}
          >
            <img src={calendar} alt="иконка календаря" />
            Календарь
          </button>

          <button
            className={`cats__item ${nav === "settings" ? "is-active" : ""}`}
            onClick={() => { setNav("settings"); setMenuOpen(false); }}
          >
            <img src={setting} alt="иконка настроек" />
            Настройки
          </button>
        </nav>

        <div className="promo">
          <img className="promo__bolt" src={lightning} alt="Картиинка молнии" />
          <span className="promo__muted">Следите за сроками</span>
          <strong>И будьте спокойны</strong>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <label className="search">
            <input
              type="search"
              placeholder="Поиск документов..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <img src={search} alt="картинка поиска" />
          </label>

          <div className="topbar__right">
            <button className="bell" aria-label="Уведомления">
              <img src={notifications} alt="картинка уведомлений" />
              <span className="bell__dot" />
            </button>
            <button className="avatar" aria-label="Профиль" onClick={onRegister}>
              <span className="avatar__circle">
                <img src={user} alt="картинка пользователя" />
              </span>
            </button>
          </div>
        </header>

        <main className="content">
          <div className="content__head">
            <div className="content__left">
              <div className="calendar__icon">
                <img src={calendaricon} alt="иконка календаря"/>
              </div>
             <div className="classPageAndSubtitle">
              <h1 className="classPage">Календарь</h1>
              <p className="subtitle">
                Все важные даты в одном месте
              </p>
              </div> 
            </div>
            <div className="crumbs">
              Главная / <strong>Календарь</strong>
            </div>
          </div>

          <div className="content__body">
            <div className="calendar__turn">
              <img src={arrowleft} alt="Стрелка влево"/>
              <div className="calendar__date">
                <div className="date">
                  Ноябрь
                </div>
                <div className="calendar__year">
                  2026
                </div>
              </div>
              <img src={arrowright} alt="Стрелка вправо"/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}