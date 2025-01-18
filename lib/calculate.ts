function vppToVrms(vpp: number): number {
  return vpp / 2 / Math.sqrt(2);
}
function vrmsToVpp(vrms: number): number {
  return vrms * 2 * Math.sqrt(2);
}

function dbmToWatt(dbm: number): number {
  return Math.pow(10, dbm / 10) / 1000;
}
function wattToDbm(watt: number): number {
  return 10 * Math.log10(watt * 1000);
}

function vrmsToWatt(vrms: number, impedance: number): number {
  return Math.pow(vrms, 2) / impedance;
}
function wattToVrms(watt: number, impedance: number): number {
  return Math.sqrt(watt * impedance);
}

export { vppToVrms, vrmsToVpp, dbmToWatt, wattToDbm, vrmsToWatt, wattToVrms };
