import { useState } from "react";
import "../components/catalog.css";
import "../components/settings.css";
import lightning from '../img/lightning.svg'
import folder from '../img/folder.svg'
import calendar from '../img/calendar.svg'
import setting from '../img/setting.svg'
import coolicon from '../img/coolicon.svg'
import user from '../img/user.svg'
import notifications from '../img/notification_outline_dot.svg'
import search from '../img/search-normal.svg'

// onNavigate(page) - вызывается при клике на пункт бокового меню ("catalog", "reminders", "calendar", "settings")
// onLogout         - вызывается при нажатии «Выйти из аккаунта»
export default function Settings({ onNavigate, onLogout }) {
  const [nav, setNav] = useState("settings");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [tab, setTab] = useState("profile");
  const [login, setLogin] = useState("Генадий");
  const [email, setEmail] = useState("Genadi@gmail.com");
  const [notify, setNotify] = useState(true);

  const goTo = (page) => {
    setNav(page);
    setMenuOpen(false);
    if (onNavigate) onNavigate(page);
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
            onClick={() => goTo("catalog")}
          >
            <img src={folder} alt="иконка папки" />
            Каталог
          </button>

          <button
            className={`cats__item ${nav === "reminders" ? "is-active" : ""}`}
            onClick={() => goTo("reminders")}
          >
            <img src={coolicon} alt="иконка напоминаний" />
            Напоминания
          </button>

          <button
            className={`cats__item ${nav === "calendar" ? "is-active" : ""}`}
            onClick={() => goTo("calendar")}
          >
            <img src={calendar} alt="иконка календаря" />
            Календарь
          </button>

          <button
            className={`cats__item ${nav === "settings" ? "is-active" : ""}`}
            onClick={() => goTo("settings")}
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
            <button className="avatar" aria-label="Профиль">
              <span className="avatar__circle">
                <img src={user} alt="картинка пользователя" />
              </span>
            </button>
          </div>
        </header>

        <main className="content">
          <div className="st__head">
            <img className="st__headIcon" src={setting} alt="иконка настроек" />
            <div className="st__titles">
              <h1 className="st__title">Настройки</h1>
              <p className="st__subtitle">Управление аккаунтом и уведомлениями</p>
            </div>
          </div>

          <div className="st__tabs">
            <button
              className={`st__tab ${tab === "profile" ? "is-active" : ""}`}
              onClick={() => setTab("profile")}
            >
              Профиль
            </button>
            <button
              className={`st__tab ${tab === "notifications" ? "is-active" : ""}`}
              onClick={() => setTab("notifications")}
            >
              Уведомления
            </button>
            <button
              className={`st__tab ${tab === "other" ? "is-active" : ""}`}
              onClick={() => setTab("other")}
            >
              Другое
            </button>
          </div>

          <div className="st__grid">
            <section className="st__card st__avatarCard">
              <div className="st__avatar">
                <img src={user} alt="аватар пользователя" />
              </div>
              <button className="st__avatarBtn">Изменить аватар</button>
            </section>

            <section className="st__card st__formCard">
              <div className="st__field">
                <label className="st__label" htmlFor="st-login">Логин</label>
                <input
                  id="st-login"
                  className="st__input"
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>

              <div className="st__field">
                <label className="st__label" htmlFor="st-email">Email</label>
                <input
                  id="st-email"
                  className="st__input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </section>
          </div>

          <div className="st__bottom">
            <section className="st__card st__notify">
              <div className="st__notifyText">
                <strong>Уведомления</strong>
                <span>Получать уведомления о скором окончании сроков</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notify}
                aria-label="Уведомления"
                className={`st__switch ${notify ? "is-on" : ""}`}
                onClick={() => setNotify(!notify)}
              >
                <span className="st__knob"></span>
              </button>
            </section>

            <button className="st__logout" onClick={onLogout}>
              Выйти из аккаунта
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
