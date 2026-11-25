
import "./notification.css";
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
import file from '../img/file.svg'
import house from '../img/house.svg'
import clock from '../img/clock.svg'
import { useState } from 'react'

export default function Notification(){
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Застраховать автомобиль',
      date: '26.11.2026',
      days: '10 дней',
      icon: car,
      status: 'orange'
    },
    {
      id: 2,
      title: 'Оплатить ипотеку',
      date: '16.12.2026',
      days: '30 дней',
      icon: house,
      status: 'gray'
    },
    {
      id: 3,
      title: 'Отправить отчёт',
      date: '18.11.2026',
      days: '2 дня',
      icon: file,
      status: 'red'
    }
  ])

  const addReminder = () => {
    const title = prompt('Название напоминания:')
    if (!title?.trim()) return

    setReminders([
      ...reminders,
      {
        id: Date.now(),
        title,
        date: '01.12.2026',
        days: 'Новое',
        icon: file,
        status: 'gray'
      }
    ])
  }

  const navigation = [
    { title: 'Каталог', icon: folder },
    { title: 'Напоминания', icon: coolicon, active: true },
    { title: 'Календарь', icon: calendar },
    { title: 'Настройки', icon: setting }
  ]

  const filteredReminders = reminders.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="app">

      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>

            <div className="sidebar-header">
                <span className="logo">DeadLiner</span>
                <button
                    className="close-menu"
                    onClick={() => setMenuOpen(false)}
                >
                </button>
            </div>

        <nav className="sidebar-nav">

          {navigation.map(item => (
            <button
              key={item.title}
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              <img src={item.icon} alt="" />
              <span>{item.title}</span>
            </button>
          ))}

        </nav>

        <div className="sidebar-tip">
          <img src={lightning} alt="" />
          <p>Следите за сроками</p>
          <strong>И будьте спокойны</strong>
        </div>

      </aside>

      <main className="main">

        <header className="topbar">

            <div className="mobile-header">

                <span className="mobile-logo">DeadLiner</span>

                <button
                    className="menu-button"
                    onClick={() => setMenuOpen(true)}
                >
                <span></span>
                <span></span>
                <span></span>
                </button>
            </div>

          <div className="search-box">

            <input
              type="text"
              placeholder="Поиск документов..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />

            <img src={search} alt="Поиск" />

          </div>

          <div className="top-actions">

            <button className="notification-button">
              <img src={notifications} alt="Уведомления" />
            </button>

            <button className="profile-button">
              <img src={user} alt="Профиль" />
            </button>

          </div>

        </header>

        <section className="content">

          <h1 className="page-title">
            <img src={coolicon} alt="" />
            <span>Напоминания</span>
          </h1>

          <div className="warning-card">

            <img src={clock} alt="" />

            <div>
              <h2>2 документа скоро истекают</h2>
              <p>Проверьте их, чтобы не пропустить срок.</p>
            </div>

          </div>

          <div className="reminders-list">

            {filteredReminders.map(item => (

              <article className="reminder-card" key={item.id}>

                <div className="reminder-icon">
                  <img src={item.icon} alt="" />
                </div>

                <div className="reminder-info">
                  <h3>{item.title}</h3>
                  <p>До {item.date}</p>
                </div>

                <div className={`deadline ${item.status}`}>
                  {item.days}
                </div>

                <span className="card-arrow">›</span>

              </article>

            ))}

          </div>

          <button
            className="add-reminder"
            onClick={addReminder}
          >
            <img src={plus} alt="" />
            <span>Добавить напоминание</span>
          </button>

        </section>

        <nav className="bottom-navigation">

          {navigation.map(item => (

            <button
              key={item.title}
              className={`bottom-nav-item ${item.active ? 'active' : ''}`}
            >
              <img src={item.icon} alt="" />
              <span>{item.title}</span>
            </button>

          ))}

        </nav>

      </main>

    </div>
  )
}