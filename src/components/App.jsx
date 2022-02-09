import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CurrencyRow from "./CurrencyRow";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";

const url =
  "https://v6.exchangerate-api.com/v6/ef693908e01ad09ad109a2b0/latest/USD";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState(["USD", "AED"]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("AED");
  const [exchangeRate, setExchangeRate] = useState("");
  const [amount, setAmount] = useState("1");
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //get rates
        const rates = data.conversion_rates;

        //set available options to the select element
        setCurrencyOptions([...Object.keys(rates)]);

        //calculate rate
        const rate = rates[toCurrency] / rates[fromCurrency];

        //check conversion direction
        if (amountInFromCurrency) {
          setExchangeRate((amount * rate).toFixed(2));
        } else {
          setAmount((exchangeRate / rate).toFixed(2));
        }
      });
  }, [amount, exchangeRate, fromCurrency, toCurrency, amountInFromCurrency]);

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          setCurrency={setFromCurrency}
          value={amount}
          setValue={setAmount}
          conversionValue={true}
          setAmountInFromCurrency={setAmountInFromCurrency}
        />
        <div className="equals">
          <CompareArrowsIcon fontSize="large" />
        </div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          setCurrency={setToCurrency}
          value={exchangeRate}
          setValue={setExchangeRate}
          conversionValue={false}
          setAmountInFromCurrency={setAmountInFromCurrency}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
