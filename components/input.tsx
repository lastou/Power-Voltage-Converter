import { useState } from "react";
import { TextInput } from "react-native-paper";

export default function Input({
  label,
  value,
  setValue,
  unit,
  key,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  unit?: string;
  key?: any;
}) {
  const [value_disp, setValueDisp] = useState(String(value));

  function handleChangeValueDisp(v_disp: string) {
    // filter non-numeric characters
    v_disp = v_disp.replace(/[^\d.-]/g, "");
    setValueDisp(v_disp);
  }
  function handleChangeValue(v: number) {
    // update real value
    setValue(v);
    // update display value to match real value
    setValueDisp(String(v));
  }
  return (
    <TextInput
      key={key}
      label={label}
      mode="outlined"
      value={value_disp}
      right={<TextInput.Affix text={unit} />}
      onChangeText={handleChangeValueDisp}
      onEndEditing={(e) => handleChangeValue(Number(e.nativeEvent.text))}
    />
  );
}
