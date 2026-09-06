import { useState } from "react";
import SolarField from "./components/SolarField";
import { calculatePanels } from "./utils/solar";

export default function App() {
  const [annualDemand, setAnnualDemand] = useState(12000);
  const [panelType, setPanelType] = useState("trina");
  const [customPanel, setCustomPanel] = useState({ powerW: 550, lengthM: 2.27, widthM: 1.13 });

  const panelDatabase = {
    trina: { powerW: 700, areaM2: 3.106, length: 2.384, width: 1.303 },
    jinko: { powerW: 625, areaM2: 2.701, length: 2.382, width: 1.134 },
    custom: { powerW: customPanel.powerW, areaM2: customPanel.lengthM * customPanel.widthM, length: customPanel.lengthM, width: customPanel.widthM }
  };

  const activePanel = panelDatabase[panelType];
  const result = calculatePanels(annualDemand, activePanel);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden", backgroundColor: "#0F172A" }}>
      {/* Lienzo 3D de fondo */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <SolarField
          count={result.panels}
          panelSpecs={activePanel} 
        />
      </div>

      {/* Tarjeta de Control Flotante */}
      <div style={{ 
        position: "absolute", 
        top: "20px", 
        left: "20px", 
        zIndex: 10, 
        background: "rgba(30, 41, 59, 0.9)", 
        backdropFilter: "blur(8px)",
        padding: "24px", 
        borderRadius: "12px",
        border: "1px solid #334155",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
        width: "360px",
        textAlign: "left",
        color: "#F8FAFC"
      }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px", marginTop: 0, color: "#F8FAFC" }}>Paneles a metros cuadrados</h2>

        <div style={{ marginBottom: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "14px", color: "#94A3B8" }}>Demanda Anual (kWh):</label>
          <input
            type="number"
            value={annualDemand}
            onChange={(e) => setAnnualDemand(Number(e.target.value))}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "14px", color: "#94A3B8" }}>Modelo de Panel:</label>
          <select value={panelType} onChange={(e) => setPanelType(e.target.value)} style={{ width: "100%", boxSizing: "border-box" }}>
            <option value="trina">Trina Solar Vertex N (700W)</option>
            <option value="jinko">Jinko Tiger Neo (625W)</option>
            <option value="custom">Personalizado...</option>
          </select>
        </div>

        {panelType === "custom" && (
          <div style={{ marginBottom: "14px", background: "rgba(15, 23, 42, 0.6)", padding: "12px", borderRadius: "8px", border: "1px solid #334155" }}>
            <label style={{ fontSize: "12px", color: "#38bdf8", display: "block", marginBottom: "8px", fontWeight: "bold" }}>
              Especificaciones del Panel Personalizado:
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "10px", color: "#94A3B8" }}>Potencia</span>
                <input type="number" placeholder="W" value={customPanel.powerW} onChange={(e) => setCustomPanel({ ...customPanel, powerW: Number(e.target.value) })} style={{ width: "100%", boxSizing: "border-box", fontSize: "13px", padding: "6px" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "10px", color: "#94A3B8" }}>Largo</span>
                <input type="number" step="0.01" placeholder="Metros" value={customPanel.lengthM} onChange={(e) => setCustomPanel({ ...customPanel, lengthM: Number(e.target.value) })} style={{ width: "100%", boxSizing: "border-box", fontSize: "13px", padding: "6px" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "10px", color: "#94A3B8" }}>Ancho</span>
                <input type="number" step="0.01" placeholder="Metros" value={customPanel.widthM} onChange={(e) => setCustomPanel({ ...customPanel, widthM: Number(e.target.value) })} style={{ width: "100%", boxSizing: "border-box", fontSize: "13px", padding: "6px" }} />
              </div>
            </div>
          </div>
        )}

        <div style={{ borderTop: "1px solid #334155", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ color: "#F8FAFC", fontSize: "15px" }}><strong>Paneles requeridos:</strong> {result.panels}</p>
          <p style={{ color: "#38BDF8", fontSize: "15px" }}><strong>Área mínima de techo:</strong> {result.area} m²</p>
          <p style={{ color: "#34D399", fontSize: "15px" }}><strong>Capacidad instalada:</strong> {result.capacity} kWp</p>
        </div>
      </div>
    </div>
  );
}