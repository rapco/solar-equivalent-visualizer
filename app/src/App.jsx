import { useState } from "react";
import SolarField from "./components/SolarField";
import { calculatePanels } from "./utils/solar";

export default function App() {
  // Estado para la demanda anual
  const [annualDemand, setAnnualDemand] = useState(12000); // 1000 kWh/mes por defecto
  
  // Estado para la selección del panel (trina, jinko, custom)
  const [panelType, setPanelType] = useState("trina");
  
  // Estado para un panel personalizado (aparece si panelType === 'custom')
  const [customPanel, setCustomPanel] = useState({ powerW: 550, lengthM: 2.27, widthM: 1.13 });

  // Base de datos local (puedes moverla a utils luego si prefieres)
  const panelDatabase = {
    trina: { powerW: 700, areaM2: 3.106, length: 2.384, width: 1.303 },
    jinko: { powerW: 625, areaM2: 2.701, length: 2.382, width: 1.134 },
    custom: { powerW: customPanel.powerW, areaM2: customPanel.lengthM * customPanel.widthM, length: customPanel.lengthM, width: customPanel.widthM }
  };

  const activePanel = panelDatabase[panelType];
  const result = calculatePanels(annualDemand, activePanel);

  return (
    <div style={{ position: "absolute", zIndex: 10, background: "rgba(255,255,255,0.9)", padding: "20px", margin: "20px", borderRadius: "8px" }}>
      <h1>Solar Equivalent Visualizer</h1>

      <div style={{ marginBottom: "15px" }}>
        <label>Demanda Anual (kWh): </label>
        <input
          type="number"
          value={annualDemand}
          onChange={(e) => setAnnualDemand(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Modelo de Panel: </label>
        <select value={panelType} onChange={(e) => setPanelType(e.target.value)}>
          <option value="trina">Trina Solar Vertex N (700W)</option>
          <option value="jinko">Jinko Tiger Neo (625W)</option>
          <option value="custom">Personalizado...</option>
        </select>
      </div>

      {panelType === "custom" && (
        <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
          <input type="number" placeholder="Potencia (W)" value={customPanel.powerW} onChange={(e) => setCustomPanel({ ...customPanel, powerW: Number(e.target.value) })} />
          <input type="number" step="0.01" placeholder="Largo (m)" value={customPanel.lengthM} onChange={(e) => setCustomPanel({ ...customPanel, lengthM: Number(e.target.value) })} />
          <input type="number" step="0.01" placeholder="Ancho (m)" value={customPanel.widthM} onChange={(e) => setCustomPanel({ ...customPanel, widthM: Number(e.target.value) })} />
        </div>
      )}

      <div>
        <p><strong>Paneles requeridos:</strong> {result.panels}</p>
        <p><strong>Área mínima de techo:</strong> {result.area} m²</p>
        <p><strong>Capacidad instalada:</strong> {result.capacity} kWp</p>
      </div>

      {/* Ajustamos los estilos del div contenedor para que el Canvas ocupe el fondo */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1 }}>
        <SolarField
          count={result.panels}
          panelSpecs={activePanel} 
        />
      </div>
    </div>
  );
}