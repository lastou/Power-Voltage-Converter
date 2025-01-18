import Input from "../components/input";
import {
  dbmToWatt,
  vppToVrms,
  vrmsToVpp,
  vrmsToWatt,
  wattToDbm,
  wattToVrms,
} from "../lib/calculate";

import { useState } from "react";
import { View } from "react-native";

const DEFAULT_IMPEDANCE = 50;
const DEFAULT_DBM = 0;
const DEFAULT_WATT = dbmToWatt(DEFAULT_DBM);
const DEFAULT_VRMS = wattToVrms(DEFAULT_WATT, DEFAULT_IMPEDANCE);
const DEFAULT_VPP = vrmsToVpp(DEFAULT_VRMS);

export default function Index() {
  const [impedance, setImpedance] = useState(DEFAULT_IMPEDANCE);
  const [dbm, setDbm] = useState(DEFAULT_DBM);
  const [watt, setWatt] = useState(DEFAULT_WATT);
  const [vrms, setVrms] = useState(DEFAULT_VRMS);
  const [vpp, setVpp] = useState(DEFAULT_VPP);
  const [state_key, set_state_key] = useState(0);

  function update_state_key() {
    set_state_key((state_key + 1) % 2);
  }

  function updateImpedance(impedance: number) {
    const new_vrms = wattToVrms(watt, impedance);
    setImpedance(impedance);
    setVrms(new_vrms);
    setVpp(vrmsToVpp(new_vrms));
    update_state_key();
  }

  function updateDbm(dbm: number) {
    const new_watt = dbmToWatt(dbm);
    const new_vrms = wattToVrms(new_watt, impedance);
    setDbm(dbm);
    setWatt(new_watt);
    setVrms(new_vrms);
    setVpp(vrmsToVpp(new_vrms));
    update_state_key();
  }
  function updateWatt(watt: number) {
    const new_vrms = wattToVrms(watt, impedance);
    setWatt(watt);
    setDbm(wattToDbm(watt));
    setVrms(new_vrms);
    setVpp(vrmsToVpp(new_vrms));
    update_state_key();
  }

  function updateVpp(vpp: number) {
    const new_vrms = vppToVrms(vpp);
    const new_watt = vrmsToWatt(new_vrms, impedance);
    setVpp(vpp);
    setVrms(new_vrms);
    setWatt(new_watt);
    setDbm(wattToDbm(new_watt));
    update_state_key();
  }
  function updateVrms(vrms: number) {
    const new_watt = vrmsToWatt(vrms, impedance);
    setVrms(vrms);
    setVpp(vrmsToVpp(vrms));
    setWatt(new_watt);
    setDbm(wattToDbm(new_watt));
    update_state_key();
  }

  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <View
        key={state_key}
        style={{ width: "100%", paddingHorizontal: 10, gap: 10 }}
      >
        <Input
          label="Impedance"
          value={impedance}
          setValue={updateImpedance}
          unit="Ω"
        />
        <Input label="VRMS" value={vrms} setValue={updateVrms} unit="V" />
        <Input label="Vpp" value={vpp} setValue={updateVpp} unit="V" />
        <Input label="Power" value={dbm} setValue={updateDbm} unit="dBm" />
        <Input label="Power" value={watt} setValue={updateWatt} unit="W" />
      </View>
    </View>
  );
}
