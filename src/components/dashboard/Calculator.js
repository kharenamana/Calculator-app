import './calculator.css';

import React, { useEffect, useState } from 'react';

import CalcHeader from './CalcHeader';
import KeyPad from './KeyPad';
import moonIcon from '../../icon/moon.png';
import sunIcon from '../../icon/sun.png';

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['-', '+', '*', '/'];

const Calculator = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expression, setExression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('calculator-app-history')) || [],
  );

  useEffect(()=> {
    const data = localStorage.getItem('calculator-app-mode');
    if (data){
      setIsDarkMode(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calculator-app-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('calculator-app-history', JSON.stringify(history));
  }, [history]);

  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (key === '0') {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExression(expression + key);
    } else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === '.') return;

      setExression(expression + key);
    } else if (key === '.') {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;

      setExression(expression + key);
    } else if (keyCode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setExression(expression.slice(0, -1));
    } else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);

      let tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
      tempHistory.push(expression);
      setHistory(tempHistory);
      setExression('');
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult('');
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const answer = eval(exp).toFixed(2) + '';
    setResult(answer);
  };

  return (
    <div
      className="container"
      tabIndex="0"
      onKeyDown={(e) => handleKeyPress(e.keyCode, e.key)}
      data-theme={isDarkMode ? 'dark' : ''}
    >
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div
            className="app_calculator_navbar_toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <div
              className={`app_calculator_navbar_toggle_circle ${
                isDarkMode ? 'app_calculator_navbar_toggle_circle_active' : ' '
              }`}
            />
          </div>
          <img src={isDarkMode ? moonIcon : sunIcon} alt="mode" />
        </div>

        <CalcHeader expression={expression} result={result} history={history} />
        <KeyPad handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
};

export default Calculator;