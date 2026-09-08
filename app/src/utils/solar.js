export function calculatePanels(
  annualDemandKwh,
  activePanel,
  efficiencyPercent = 70.5
) {
  const PSH_DAILY = 4.5;
  const DAYS_IN_YEAR = 365;

  const efficiency = efficiencyPercent / 100;

  const panelPowerKw = activePanel.powerW / 1000;

  const annualEnergyPerPanel =
    panelPowerKw *
    PSH_DAILY *
    DAYS_IN_YEAR *
    efficiency;

  const requiredPanels = Math.ceil(
    annualDemandKwh / annualEnergyPerPanel
  );

  const netAreaM2 = requiredPanels * activePanel.areaM2;

  // Cálculo de la huella total del terreno con espaciamientos (bounding box)
  const cols = Math.ceil(Math.sqrt(requiredPanels));
  const rows = Math.ceil(requiredPanels / cols);
  const spacingX = activePanel.width + 0.1;
  const spacingZ = activePanel.length + 0.1;
  
  const totalWidth = cols * spacingX;
  const totalDepth = rows * spacingZ;
  const footprintAreaM2 = totalWidth * totalDepth;

  const totalInstalledKw =
    (requiredPanels * activePanel.powerW) /
    1000;

  const equivalentSquares =
    footprintAreaM2 / 100;

  return {
    panels: requiredPanels || 0,
    netArea: netAreaM2.toFixed(2),
    area: footprintAreaM2.toFixed(2),
    dimensions: `${totalWidth.toFixed(1)}m x ${totalDepth.toFixed(1)}m`,
    capacity: totalInstalledKw.toFixed(2),
    squares: equivalentSquares.toFixed(1),
    efficiency: efficiencyPercent
  };
}