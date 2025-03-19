import "./AccidentDisplay.css";

interface AccidentDisplayProps {
  name?: string;
  total?: string | null | number;
}

export const AccidentDisplay = ({
  name = "Accident Display",
  total = 0,
}: AccidentDisplayProps) => (
  <section className="accident-display">
    <h2 className="accident-display__title">{name ? name : ""}</h2>
    <p className="accident-display__total">
      Total Accident: {total === null ? 0 : total}
    </p>
  </section>
);
