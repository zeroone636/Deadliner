import { useState } from "react";
import "./catalog.css";
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

export default function Catalog({
  onAdd,
  onRegister,
  onNotifications,
  user: currentUser,
  loggingOut,
  onLogout,
  authError,
}) {
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
            onClick={onNotifications}
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
            <button className="AddDocument" aria-label="добавление документа" onClick={onAdd}>
              <span className="AddDocument__dot">
                <img src={plus} alt="картинка плюса" />
              </span>
            </button>
            <button className="bell" onClick={onNotifications} aria-label="Уведомления">
              <img src={notifications} alt="картинка уведомлений" />
              <span className="bell__dot" />
            </button>
            {currentUser ? (
              <>
                <span>{currentUser.username}</span>
                <button
                  type="button"
                  onClick={onLogout}
                  disabled={loggingOut}
                >
                  {loggingOut ? "Выходим…" : "Выйти"}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="avatar"
                aria-label="Войти в аккаунт"
                onClick={onRegister}
              >
                <span className="avatar__circle">
                  <img src={user} alt="" />
                </span>
              </button>
            )}
          </div>
        </header>

        <main className="content">
          {authError && <p role="alert" className="auth-error">{authError}</p>}
          <div className="content__head">
            <div className="classPageAndSubtitle">
              <h1 className="classPage">Каталог документов</h1>
              <p className="subtitle">
                Выберите категорию, чтобы посмотреть свои документы
              </p>
            </div>
            <div className="crumbs">
              Главная / <strong>Каталог</strong>
            </div>
          </div>

          <div className="content__body">
            <ul className="cats">
              <li>
                <button
                  className={`cats__item ${activeCat === "warranty" ? "is-active" : ""}`}
                  onClick={() => setActiveCat("warranty")}
                >
                  <img src={shield} alt="иконка щита" />
                  Гарантии
                </button>
              </li>

              <li>
                <button
                  className={`cats__item ${activeCat === "insurance" ? "is-active" : ""}`}
                  onClick={() => setActiveCat("insurance")}
                >
                  <img src={umbrella} alt="иконка зонта" />
                  Страховки
                </button>
              </li>

              <li>
                <button
                  className={`cats__item ${activeCat === "contracts" ? "is-active" : ""}`}
                  onClick={() => setActiveCat("contracts")}
                >
                  <img src={file1} alt="иконка договора" />
                  Договоры
                </button>
              </li>

              <li>
                <button
                  className={`cats__item ${activeCat === "cards" ? "is-active" : ""}`}
                  onClick={() => setActiveCat("cards")}
                >
                  <img src={card1} alt="иконка карты" />
                  Карты
                </button>
              </li>

              <li>
                <button
                  className={`cats__item ${activeCat === "other" ? "is-active" : ""}`}
                  onClick={() => setActiveCat("other")}
                >
                  <img src={plus} alt="иконка плюса" />
                  Прочее
                </button>
              </li>
            </ul>

            <div className="grid">
              {show(text1) && (
                <article className={`card ${activeCat === "warranty" ? "is-active" : ""}`}>
                  <div className="card__first">
                    <div className="card__top">
                      <div className="mainCardIcon">
                        <span className="card__icon">
                          <img id="monitor" src={monitor} alt="картинка монитора" />
                        </span>
                      </div>
                      <h2 className="gridName">Гарантия</h2>
                      <p>Срок действия ваших гарантий</p>
                    </div>
                    <div className="arrow_icon">
                      <button className="card__go" aria-label="Открыть">
                        <img src={arrow} alt="картинка стрелки" />
                      </button>
                    </div>
                  </div>
                  <div className="card__foot">1 документов</div>
                </article>
              )}

              {show(text2) && (
                <article className={`card ${activeCat === "insurance" ? "is-active" : ""}`}>
                  <div className="card__first">
                    <div className="card__top">
                      <div className="mainCardIcon">
                        <span className="card__icon">
                          <img id="car" src={car} alt="картинка машины" />
                        </span>
                      </div>
                      <h2 className="gridName">Страховки</h2>
                      <p>Страховые полисы и договоры</p>
                    </div>
                    <div className="arrow_icon">
                      <button className="card__go" aria-label="Открыть">
                        <img src={arrow} alt="картинка стрелки" />
                      </button>
                    </div>
                  </div>
                  <div className="card__foot">1 документов</div>
                </article>
              )}

              {show(text3) && (
                <article className={`card ${activeCat === "contracts" ? "is-active" : ""}`}>
                  <div className="card__first">
                    <div className="card__top">
                      <div className="mainCardIcon">
                        <span className="card__icon">
                          <img id="file" src={file} alt="картинка файла" />
                        </span>
                      </div>
                      <h2 className="gridName">Договоры</h2>
                      <p>Важные договоры и соглашения</p>
                    </div>
                    <div className="arrow_icon">
                      <button className="card__go" aria-label="Открыть">
                        <img src={arrow} alt="картинка стрелки" />
                      </button>
                    </div>
                  </div>
                  <div className="card__foot">1 документов</div>
                </article>
              )}

              {show(text4) && (
                <article className={`card ${activeCat === "cards" ? "is-active" : ""}`}>
                  <div className="card__first">
                    <div className="card__top">
                      <div className="mainCardIcon">
                        <span className="card__icon">
                          <img id="card" src={card} alt="картинка банковской карты" />
                        </span>
                      </div>
                      <h2 className="gridName">Карты</h2>
                      <p>Банковские и скидочные карты</p>
                    </div>
                    <div className="arrow_icon">
                      <button className="card__go" aria-label="Открыть">
                        <img src={arrow} alt="картинка стрелки" />
                      </button>
                    </div>
                  </div>
                  <div className="card__foot">1 документов</div>
                </article>
              )}

              {!show(text1) && !show(text2) && !show(text3) && !show(text4) && (
                <p className="empty">Ничего не найдено</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}