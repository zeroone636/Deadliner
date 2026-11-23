import "../components/notification.css";
import lightning from '../img/lightning.svg'
import calendar from '../img/calendar.svg'
import setting from '../img/setting.svg'
import coolicon from '../img/coolicon.svg'
import folder from '../img/folder.svg'
import search from '../img/search-normal.svg'
import notifications from '../img/notification_outline_dot.svg'
import user from '../img/user.svg'
import car from '../img/car.svg'
import plus from '../img/plus.svg'

export default function Notification(){
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
        </div>
    )
}