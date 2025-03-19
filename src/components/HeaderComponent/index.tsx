import "./HeaderComponent.css";

interface HeaderComponentProps {
  description?: string;
  details?: string;
}

export const HeaderComponent = ({
  description,
  details,
}: HeaderComponentProps) => (
  <section className="header">
    <p className="header__description">{description}</p>
    <p className="header__details">{details}</p>
  </section>
);
