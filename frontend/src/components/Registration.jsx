import { useState } from "react";
import { api } from "../../api/axios";
import "./catalog.css";
import "./registration.css";
import lightning from "../img/lightning.svg";
import folder from "../img/folder.svg";
import calendar from "../img/calendar.svg";
import setting from "../img/setting.svg";
import coolicon from "../img/coolicon.svg";
import user from "../img/user.svg";
import notifications from "../img/notification_outline_dot.svg";
import loginIcon from "../img/login.svg";

export default function Registration({ onNavigate, onRegister, onLogin }) {
  const [nav, setNav] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const raw = {
    username: login,
    email,
    password,
  };

  const goTo = (page) => {
    setNav(page);
    setMenuOpen(false);
    if (onNavigate) onNavigate(page);
  };

  const handleRegister = async (event) => {
  event.preventDefault()
  setLoginError('')

  try {
    const { data } = await api.post('/api/users/register', raw)
    onRegister?.(data.user)
  } catch (error) {
    setLoginError(
      error.response?.data?.message || 'Не удалось зарегистрироваться.'
    )
  }
}

  const handleLogin = async () => {
  if (isLoggingIn) return;

  const username = login.trim();

  if (!username || !password) {
    setLoginError("Введите логин и пароль");
    return;
  }

  setLoginError("");
  setIsLoggingIn(true);

  try {
    const { data } = await api.post('api/users/login', {
      username,
      password,
    });
    onLogin?.(data.user);

  } catch (error) {
    setLoginError(
      error.response?.data?.message ||
        "Не удалось связаться с сервером"
    );
  } finally {
    setIsLoggingIn(false);
  }
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
          <div className="topbar__right rg__topbarRight">
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
          <div className="rg__head">
            <img src={loginIcon} alt="иконка входа" />
            <div className="rg__titles">
              <h1 className="rg__title">Регистрация</h1>
              <p className="rg__subtitle">
                Вводите в аккаунт или зарегистрируйтесь, чтобы продолжить
              </p>
            </div>
          </div>

          <form className="rg__form" onSubmit={handleRegister}>
            <div className="rg__grid">
              <section className="rg__card rg__avatarCard">
                <div className="rg__avatar">
                  <img src={user} alt="аватар пользователя" />
                </div>
                <button type="button" className="rg__avatarBtn">
                  Изменить аватар
                </button>
              </section>

              <section className="rg__card rg__formCard">
                <div className="rg__field">
                  <label className="rg__label" htmlFor="rg-login">
                    Логин
                  </label>
                  <input
                    id="rg-login"
                    className="rg__input"
                    type="text"
                    placeholder="Введите ваш логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                </div>

                <div className="rg__field">
                  <label className="rg__label" htmlFor="rg-email">
                    Email
                  </label>
                  <input
                    id="rg-email"
                    className="rg__input"
                    type="email"
                    placeholder="Введите вашу почту"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="rg__field">
                  <label className="rg__label" htmlFor="rg-password">
                    Пароль
                  </label>
                  <div className="rg__passwordBox">
                    <input
                      id="rg-password"
                      className="rg__input rg__input--password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Введите ваш пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="rg__toggle"
                      aria-label={
                        showPassword ? "Скрыть пароль" : "Показать пароль"
                      }
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Скрыть" : "Показать"}
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <div className="rg__bottom">
              <div className="rg__actions">
                <button
                  type="submit"
                  className="rg__btn rg__btn--register"
                >
                  Зарегистрироваться
                </button>
                <button
                  type="button"
                  className="rg__btn rg__btn--login"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Вход..." : "Войти"}
                </button>
                {loginError && <p role="alert">{loginError}</p>}
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
