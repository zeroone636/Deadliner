import { useState } from "react";
import "./catalog.css";
import "./addDocument.css";
import lightning from '../img/lightning.svg'
import folder from '../img/folder.svg'
import calendar from '../img/calendar.svg'
import setting from '../img/setting.svg'
import coolicon from '../img/coolicon.svg'
import arrow from '../img/arrow_catalog.svg'
import user from '../img/user.svg'
import notifications from '../img/notification_outline_dot.svg'
import card1 from '../img/card1.svg'
import file1 from '../img/file1.svg'
import shield from '../img/shield.svg'
import umbrella from '../img/umbrella.svg'
import plus from '../img/plus.svg'

export default function AddDocument({ onBack, onSubmit, onRegister }) {
  const [nav, setNav] = useState("catalog");
  const [menuOpen, setMenuOpen] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("warranty");
  const [date, setDate] = useState("");

  const categoryIcon =
    category === "insurance" ? umbrella :
    category === "contracts" ? file1 :
    category === "cards" ? card1 :
    category === "other" ? plus :
    shield;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ name: name.trim(), category, date });
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

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
          <img className="promo__bolt" src={lightning} alt="Картинка молнии" />
          <span className="promo__muted">Следите за сроками</span>
          <strong>И будьте спокойны</strong>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">

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
          <div className="add__head">
            <button className="add__back" aria-label="Назад" onClick={handleBack}>
              <img src={arrow} alt="стрелка назад" />
            </button>
            <div className="add__titles">
              <h1 className="add__title">Добавление документа</h1>
              <p className="add__subtitle">Заполните информацию о документе</p>
            </div>
          </div>

          <form className="add__form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="field__label" htmlFor="doc-name">
                Название документа:
              </label>
              <input
                id="doc-name"
                className="field__input"
                type="text"
                placeholder="Например: Гарантия на телефон"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="doc-category">
                Категория:
              </label>
              <div className="field__box">
                <img className="field__icon" src={categoryIcon} alt="иконка категории" />
                <select
                  id="doc-category"
                  className="field__input field__select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="warranty">Гарантии</option>
                  <option value="insurance">Страховки</option>
                  <option value="contracts">Договоры</option>
                  <option value="cards">Карты</option>
                  <option value="other">Прочее</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="doc-date">
                Дата окончания:
              </label>
              <div className="field__box">
                <img className="field__icon" src={calendar} alt="иконка календаря" />
                <input
                  id="doc-date"
                  className="field__input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="add__actions">
              <button type="button" className="btn btn--ghost" onClick={handleBack}>
                Отмена
              </button>
              <button type="submit" className="btn btn--primary">
                Добавить документ
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
