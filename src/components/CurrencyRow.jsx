import React from "react";

const CurrencyRow = ({
  currencyOptions,
  selectedCurrency,
  setCurrency,
  value,
  setValue,
  conversionValue,
  setAmountInFromCurrency
}) => {
  return (
    <div className="container">
      <input
        type="number"
        className="input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setAmountInFromCurrency(conversionValue);
        }}
      />
      <select
        value={selectedCurrency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        {currencyOptions.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
