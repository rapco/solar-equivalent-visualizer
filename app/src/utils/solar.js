export function calculatePanels(annualDemandKwh, activePanel) {
  // Parámetros ideales
  const PSH_DAILY = 4.5;
  const DAYS_IN_YEAR = 365;

  // Energía anual generada por un solo panel (kWh)
  const panelPowerKw = activePanel.powerW / 1000;
  const annualEnergyPerPanel = panelPowerKw * PSH_DAILY * DAYS_IN_YEAR;

  // Cantidad de paneles necesarios (redondeado hacia arriba)
  const requiredPanels = Math.ceil(annualDemandKwh / annualEnergyPerPanel);

  // Área y potencia total
  const totalAreaM2 = requiredPanels * activePanel.areaM2;
  const totalInstalledKw = (requiredPanels * activePanel.powerW) / 1000;

  return {
    panels: requiredPanels || 0,
    area: totalAreaM2.toFixed(2),
    capacity: totalInstalledKw.toFixed(2)
  };
}