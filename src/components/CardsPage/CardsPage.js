import "./CardsPage.css";
import Card from "../../shared/ui/Card/Card";

export default function CardsPage(props) {
  const { data } = props;

  return (
    <div className="cards-page">
      <h2 className="cards-page__title">Список пользователей</h2>
      {data.map((el) => (
        <Card
          key={el.id}
          link={`/${el.id}`}
          name={el.name}
          city={el.address.city}
          company={el.company.name}
        />
      ))}
    </div>
  );
}
