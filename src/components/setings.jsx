import lightning from '../img/lightning.svg'
import folder from '../img/folder.svg'
import colokol from '../img/notification_outline_dot.svg'

export default function settings() {
    return(
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
                    <button className="avatar" aria-label="Профиль">
                      <span className="avatar__circle">
                        <img src={user} alt="картинка пользователя" />
                      </span>
                    </button>
                  </div>
                </header>
            </div>
        </div>
    )
}