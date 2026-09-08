import { useState } from "react";
import SolarField from "./components/SolarField";
import { calculatePanels } from "./utils/solar";

export default function App() {
  const [demandMode, setDemandMode] = useState("type1");
  const [customDemand, setCustomDemand] = useState(12000);

  const [efficiency, setEfficiency] = useState(70.5);

  const [panelType, setPanelType] = useState("trina");

  const [customPanel, setCustomPanel] = useState({
    powerW: 550,
    lengthM: 2.27,
    widthM: 1.13
  });

  const annualDemand =
    demandMode === "type1"
      ? 144000
      : demandMode === "type2"
      ? 288000
      : customDemand;

  const panelDatabase = {
    trina: {
      powerW: 700,
      areaM2: 3.106,
      length: 2.384,
      width: 1.303
    },

    jinko: {
      powerW: 625,
      areaM2: 2.701,
      length: 2.382,
      width: 1.134
    },

    custom: {
      powerW: customPanel.powerW,
      areaM2: customPanel.lengthM * customPanel.widthM,
      length: customPanel.lengthM,
      width: customPanel.widthM
    }
  };

  const activePanel = panelDatabase[panelType];

  const result = calculatePanels(
    annualDemand,
    activePanel,
    efficiency
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0F172A"
      }}
    >
      {/* 3D Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0
        }}
      >
        <SolarField
          count={result.panels}
          panelSpecs={activePanel}
        />
      </div>

      {/* Control Card */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          background: "rgba(30, 41, 59, 0.9)",
          backdropFilter: "blur(8px)",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid #334155",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
          width: "360px",
          textAlign: "left",
          color: "#F8FAFC"
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            marginBottom: "16px",
            marginTop: 0
          }}
        >
          Solar Equivalent Visualizer
        </h2>

        {/* Demand Type */}
        <div
          style={{
            marginBottom: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          }}
        >
          <label
            style={{
              fontSize: "14px",
              color: "#94A3B8"
            }}
          >
            Power Demand
          </label>

          <select
            value={demandMode}
            onChange={(e) =>
              setDemandMode(e.target.value)
            }
          >
            <option value="type1">
              Cell Site Type 1 (144,000 kWh/year)
            </option>

            <option value="type2">
              Cell Site Type 2 (288,000 kWh/year)
            </option>

            <option value="custom">
              Custom
            </option>
          </select>
        </div>

        {/* Custom Demand */}
        {demandMode === "custom" && (
          <div
            style={{
              marginBottom: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            }}
          >
            <label
              style={{
                fontSize: "14px",
                color: "#94A3B8"
              }}
            >
              Annual Demand (kWh/year)
            </label>

            <input
              type="number"
              value={customDemand}
              onChange={(e) =>
                setCustomDemand(
                  Number(e.target.value)
                )
              }
            />
          </div>
        )}

        {/* Efficiency Slider */}
        <div
          style={{
            marginBottom: "18px"
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#94A3B8"
            }}
          >
            System Efficiency:{" "}
            {efficiency.toFixed(1)}%
          </label>

          <input
            type="range"
            min="70"
            max="100"
            step="0.1"
            value={efficiency}
            onChange={(e) =>
              setEfficiency(
                Number(e.target.value)
              )
            }
            style={{
              width: "100%"
            }}
          />
        </div>

        {/* Panel Type */}
        <div
          style={{
            marginBottom: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          }}
        >
          <label
            style={{
              fontSize: "14px",
              color: "#94A3B8"
            }}
          >
            Panel Model
          </label>

          <select
            value={panelType}
            onChange={(e) =>
              setPanelType(e.target.value)
            }
          >
            <option value="trina">
              Trina Solar Vertex N (700W)
            </option>

            <option value="jinko">
              Jinko Tiger Neo (625W)
            </option>

            <option value="custom">
              Custom...
            </option>
          </select>
        </div>

        {panelType === "custom" && (
          <div
            style={{
              marginBottom: "14px",
              background:
                "rgba(15,23,42,0.6)",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #334155"
            }}
          >
            <label
              style={{
                fontSize: "12px",
                color: "#38bdf8",
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold"
              }}
            >
              Custom Panel
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr 1fr",
                gap: "8px"
              }}
            >
              <input
                type="number"
                placeholder="Watts"
                value={customPanel.powerW}
                onChange={(e) =>
                  setCustomPanel({
                    ...customPanel,
                    powerW: Number(
                      e.target.value
                    )
                  })
                }
              />

              <input
                type="number"
                step="0.01"
                placeholder="Length"
                value={customPanel.lengthM}
                onChange={(e) =>
                  setCustomPanel({
                    ...customPanel,
                    lengthM: Number(
                      e.target.value
                    )
                  })
                }
              />

              <input
                type="number"
                step="0.01"
                placeholder="Width"
                value={customPanel.widthM}
                onChange={(e) =>
                  setCustomPanel({
                    ...customPanel,
                    widthM: Number(
                      e.target.value
                    )
                  })
                }
              />
            </div>
          </div>
        )}

        {/* Results */}
        <div
          style={{
            borderTop:
              "1px solid #334155",
            paddingTop: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          }}
        >
          <p>
            <strong>
              Annual Demand:
            </strong>{" "}
            {annualDemand.toLocaleString()}
            {" "}kWh
          </p>

          <p>
            <strong>
              Efficiency:
            </strong>{" "}
            {efficiency.toFixed(1)}%
          </p>

          <p>
            <strong>
              Required Panels:
            </strong>{" "}
            {result.panels}
          </p>

          <p
            style={{
              color: "#38BDF8"
            }}
          >
            <strong>
              Area Required (Terrain):
            </strong>{" "}
            {result.area} m² ({result.dimensions})
          </p>

          <p
            style={{
              color: "#FBBF24"
            }}
          >
            <strong>
              10m × 10m Squares:
            </strong>{" "}
            {result.squares}
          </p>

          <p
            style={{
              color: "#34D399"
            }}
          >
            <strong>
              Installed Capacity:
            </strong>{" "}
            {result.capacity} kWp
          </p>
        </div>
      </div>
    </div>
  );
}