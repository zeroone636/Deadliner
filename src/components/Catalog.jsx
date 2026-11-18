import { useState } from "react";
import "../components/catalog.css";
import lightning from '../img/lightning.svg'
import folder from '../img/folder.svg'
import calendar from '../img/calendar.svg'
import setting from '../img/setting.svg'
import coolicon from '../img/coolicon.svg'

const ICONS = {
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="3" width="16" height="15" rx="3" />
      <path d="M4 11h16M7 18v3M17 18v3" />
      <circle cx="8" cy="14.5" r=".8" />
      <circle cx="16" cy="14.5" r=".8" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </>
  ),
  umbrella: (
    <>
      <path d="M12 3a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z" />
      <path d="M12 12v6a2 2 0 0 0 4 0" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  plus: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  folder: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 10h18M8 2v4M16 2v4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-5 15-5 16 0" />
    </>
  ),
};

function Icon({ name, size = 20, stroke = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

const CATEGORIES = [
  {
    id: "warranty",
    label: "Гарантии",
    sideIcon: "shield",
    cardIcon: "monitor",
    title: "Гарантия",
    text: "Срок действия ваших гарантий",
    count: 1,
  },
  {
    id: "insurance",
    label: "Страховки",
    sideIcon: "umbrella",
    cardIcon: "bus",
    title: "Страховки",
    text: "Страховые полисы и договоры",
    count: 1,
  },
  {
    id: "contracts",
    label: "Договоры",
    sideIcon: "file",
    cardIcon: "file",
    title: "Договоры",
    text: "Важные договоры и соглашения",
    count: 1,
  },
  {
    id: "cards",
    label: "Карты",
    sideIcon: "card",
    cardIcon: "card",
    title: "Карты",
    text: "Банковские и скидочные карты",
    count: 1,
  },
  {
    id: "other",
    label: "Прочее",
    sideIcon: "plus",
    cardIcon: "folder",
    title: "Прочее",
    text: "Остальные документы",
    count: 0,
  },
];

function pluralDocs(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} документ`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
    return `${n} документа`;
  return `${n} документов`;
}

export default function Catalog() {
  const [nav, setNav] = useState("catalog");
  const [activeCat, setActiveCat] = useState("warranty");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const cards = CATEGORIES.filter(
    (c) =>
      c.id !== "other" &&
      (!q || c.title.toLowerCase().includes(q) || c.text.toLowerCase().includes(q))
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">DeadLiner</div>

          <nav className="nav">
            <button
              className={`nav__item ${nav === "catalog" ? "is-active" : ""}`}
              onClick={() => setNav("catalog")}
            >
              <img src={folder} alt="иконка папки" />
              Каталог
            </button>

            <button
              className={`nav__item ${nav === "reminders" ? "is-active" : ""}`}
              onClick={() => setNav("reminders")}
            >
              <img src={coolicon} alt="иконка напоминаний" />
              Напоминания
            </button>

            <button
              className={`nav__item ${nav === "calendar" ? "is-active" : ""}`}
              onClick={() => setNav("calendar")}
            >
              <img src={calendar} alt="иконка календаря" />
              Календарь
            </button>

            <button
              className={`nav__item ${nav === "settings" ? "is-active" : ""}`}
              onClick={() => setNav("settings")}
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
            <Icon name="search" size={18} />
          </label>

          <div className="topbar__right">
            <button className="bell" aria-label="Уведомления">
              <Icon name="bell" size={22} />
              <span className="bell__dot" />
            </button>
            <button className="avatar" aria-label="Профиль">
              <span className="avatar__circle">
                <Icon name="user" size={20} />
              </span>
              <Icon name="chevron" size={16} />
            </button>
          </div>
        </header>

        <main className="content">
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
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    className={`cats__item ${activeCat === c.id ? "is-active" : ""}`}
                    onClick={() => setActiveCat(c.id)}
                  >
                    <Icon name={c.sideIcon} size={18} />
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="grid">
              {cards.length === 0 && (
                <p className="empty">Ничего не найдено. Попробуйте другой запрос.</p>
              )}
              {cards.map((c) => (
                <article
                  key={c.id}
                  className={`card ${activeCat === c.id ? "is-active" : ""}`}
                >
                  <div className="card__top">
                    <span className="card__icon">
                      <Icon name={c.cardIcon} size={56} stroke={1.5} />
                    </span>
                    <h2>{c.title}</h2>
                    <p>{c.text}</p>
                    <button
                      className="card__go"
                      aria-label={`Открыть: ${c.title}`}
                      onClick={() => setActiveCat(c.id)}
                    >
                      <Icon name="arrow" size={16} stroke={2} />
                    </button>
                  </div>
                  <div className="card__foot">{pluralDocs(c.count)}</div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
