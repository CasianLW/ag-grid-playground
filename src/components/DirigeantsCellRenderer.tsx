import { FC, useState } from "react";
import { Dirigeant } from "../types/businessInterface";

export const DirigeantsCellRenderer: FC<{ value: Dirigeant[] }> = ({
  value,
}) => {
  const [showList, setShowList] = useState(false);

  const toggleListDisplay = () => setShowList(!showList);

  return (
    <div style={{ padding: "5px" }}>
      {showList ? (
        <div onBlur={() => setShowList(false)} tabIndex={0}>
          <select
            size={value.length || 5}
            style={{ width: "100%" }}
            onChange={toggleListDisplay}
            autoFocus
          >
            <option value="">Select a Dirigeant</option>
            {value.map((dirigeant, index) => (
              <option
                key={index}
                value={`${dirigeant.nom} ${dirigeant.prenoms}`}
              >
                {dirigeant.prenoms} {dirigeant.nom}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <button onClick={toggleListDisplay} style={{ width: "100%" }}>
          View Dirigeants
        </button>
      )}
    </div>
  );
};

interface DirigeantsViewProps {
  dirigeants: Dirigeant[];
}

export const DirigeantsView: FC<DirigeantsViewProps> = ({ dirigeants }) => (
  <div>
    {dirigeants.map((dirigeant, index) => (
      <div key={index}>
        {dirigeant.nom} {dirigeant.prenoms}
      </div>
    ))}
  </div>
);
