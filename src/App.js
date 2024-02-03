import React, { useState } from 'react';
import './App.css';
import CurrencyInput from './components/CurrencyInput';
import ConversionResult from './components/ConversionResult';
import { fetchConversionRate } from './services/currencyApi';

function App() {
  const [amount, setAmount] = useState(1);
  const [toCurrency, setToCurrency] = useState('USD'); // Default target currency
  const [result, setResult] = useState('');

  // List of target currencies (excluding USD since it's the source currency)
  const currencies = ["SGD","MYR","EUR","AUD","JPY","CNH","HKD","CAD","INR","DKK","GBP","RUB","NZD","MXN","IDR","TWD","THB","VND"]; // USD is the source and not listed here

  const convertCurrency = async () => {
    const fromCurrency = 'USD'; // Source currency is always USD
    try {
      const rate = await fetchConversionRate(fromCurrency, toCurrency);
      const conversion = amount * rate;
      setResult(`${amount} ${fromCurrency} = ${conversion} ${toCurrency}`);
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
      setResult('Error fetching conversion rate');
    }
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div>
        <label>Amount in USD:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <CurrencyInput
        onCurrencyChange={setToCurrency}
        currencies={currencies}
        selectedCurrency={toCurrency}
      />
      <br/>
      <button onClick={convertCurrency}>Convert</button>
      <br/>
      <ConversionResult result={result} />
    </div>
  );
}

export default App;
