import { useState } from "react";
import SolarField from "./components/SolarField";
import { calculatePanels } from "./utils/solar";

export default function App() {

  const [kwh, setKwh] = useState(1000);

  const result =
    calculatePanels(kwh, 550);

  return (
    <div>

      <h1>
        Solar Visualizer
      </h1>

      <input
        type="number"
        value={kwh}
        onChange={(e) =>
          setKwh(Number(e.target.value))
        }
      />

      <p>
        Paneles: {result.panels}
      </p>

      <p>
        Área: {result.area.toFixed(1)} m²
      </p>

      <SolarField
        count={result.panels}
      />

    </div>
  );
}