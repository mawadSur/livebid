import AutoNumeric from "autonumeric";
import React from "react";

export const useCurrencyInput = (initialValue: string = "") => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    const autoNumeric = new AutoNumeric(inputRef.current!, {
      currencySymbol: "$",
      decimalCharacter: ".",
      digitGroupSeparator: ",",
      minimumValue: "0.00",
      maximumValue: "999999999.99",
    });

    autoNumeric.set(initialValue);

    const onChangeHandler = (e: Event) => {
      const newValue = (e.target as HTMLInputElement).value;
      setValue(newValue);
    };

    const inputElement = inputRef.current;
    inputElement?.addEventListener("input", onChangeHandler);

    return () => {
      inputElement?.removeEventListener("input", onChangeHandler);
      autoNumeric.remove();
    };
  }, [initialValue]);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setValue("");
    }
  };

  return {
    value,
    ref: inputRef,
    clearInput,
  };
};
