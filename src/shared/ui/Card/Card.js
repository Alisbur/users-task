import { NavLink } from "react-router-dom";
import "./Card.css";

export default function Card(props) {
  const { link, name, city, company } = props;

  return (
    <div className="card-wrapper">
      <div className="data">
        <div className="data__item">
          <span className="data__text data__text_gray">ФИО:</span>
          <span className="data__text data__text_dark">{name}</span>
        </div>
        <div className="data__item">
          <span className="data__text data__text_gray">Город:</span>
          <span className="data__text data__text_dark">{city}</span>
        </div>
        <div className="data__item">
          <span className="data__text data__text_gray">Компания:</span>
          <span className="data__text data__text_dark">{company}</span>
        </div>
      </div>
      <div className="details">
        <NavLink to={link} className="details__link">
          Подробнее
        </NavLink>
      </div>
    </div>
  );
}
