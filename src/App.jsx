import { useEffect, useState } from 'react';
import './App.css';
import sun from './assets/images/icon-sun.svg';
import moon from './assets/images/icon-moon.svg';
import Logo from './assets/images/reactImage/Logo';

function App() {

  const [theme, setTheme] = useState('light');
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  const filteredData = data.filter((item) => {
    if (filter === "active") return item.isActive;
    if (filter === "inactive") return !item.isActive;
    return true;
  });

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/config.json`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme])

  return (
    <>
      <header id="header">
        <div className="extension_background">
          <div className="extension_text">
            <Logo
              primaryColor="#C7231A"
              textColor={theme === "dark" ? "#fff" : "#000"}
            />
          </div>
          <button className="extension_mode" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <img src={theme == "light" ? moon : sun} alt="toggle theme" />
          </button>
        </div>
      </header>

      <section id='extensions'>
        <div className='extension_filters'>
          <h1> Extensions List </h1>
          <div className='extension_filters_button'>
            <button onClick={() => setFilter('all')} className={`button_filter ${filter === 'all' ? 'clicked' : ''}`} type="button" > All </button>
            <button onClick={() => setFilter('active')} className={`button_filter ${filter === 'active' ? 'clicked' : ''}`} type="button" > Active </button>
            <button onClick={() => setFilter('inactive')} className={`button_filter ${filter === 'inactive' ? 'clicked' : ''}`} type="button" > Inactive </button>
          </div>
        </div>
        <div className='extension_list'>
          {filteredData.map((item, index) => (
            <div className="extension_item" key={index}>
              <div className="extension_item_header">
                <img src={item.logo} alt="logo" />
                <div className='extension_item_text'>
                  <h3> {item.name} </h3>
                  <p> {item.description} </p>
                </div>
              </div>

              <div className="extension_list_footer">
                <button className="extension_button_remove" type="button"> Remove </button>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          ))}

        </div>

      </section>

    </>
  );
}

export default App;
