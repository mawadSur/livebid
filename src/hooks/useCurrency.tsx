import React from "react";

export const useCurrencyInput = (initialValue: string = "") => {
  const [value, setValue] = React.useState(initialValue);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const formatNumber = (n: string) => {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatCurrency = React.useCallback(
    (inputValue: string, blur: boolean = false) => {
      if (inputValue === "") return { formattedValue: "", caretPos: 0 };

      const originalLen = inputValue.length;
      let caretPos = inputRef.current?.selectionStart || 0;

      inputValue = inputValue.replace(/[^0-9.]/g, "");

      let parts = inputValue.split(".");
      if (parts.length > 2) {
        parts = [parts[0], parts.slice(1).join("")];
      }

      if (parts[0].length > 15) {
        parts[0] = parts[0].slice(0, 15);
      }

      parts[0] = formatNumber(parts[0]);

      if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2);
      }

      if (blur) {
        if (parts.length === 1) parts.push("00");
        else if (parts[1].length === 1) parts[1] += "0";
      }

      const formattedValue = "$" + parts.join(".");

      const updatedLen = formattedValue.length;
      caretPos = updatedLen - originalLen + caretPos;
      return { formattedValue, caretPos };
    },
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { formattedValue, caretPos } = formatCurrency(e.target.value);
    setValue(formattedValue);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(caretPos, caretPos);
      }
    }, 0);
  };

  const handleBlur = () => {
    const { formattedValue } = formatCurrency(value, true);
    setValue(formattedValue);
  };

  const clearInput = () => setValue("");

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    ref: inputRef,
    clearInput,
  };
};
