export function calculatePanels(
  monthlyKwh,
  panelWatts,
  sunHours = 5
) {
  const monthlyPerPanel =
    (panelWatts / 1000) *
    sunHours *
    30;

  const panels =
    Math.ceil(monthlyKwh / monthlyPerPanel);

  const areaPerPanel = 2.6;

  return {
    panels,
    area: panels * areaPerPanel,
    kwp: (panels * panelWatts) / 1000
  };
}