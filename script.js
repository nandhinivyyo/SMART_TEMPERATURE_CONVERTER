const tempInput = document.getElementById("tempInput");
const fromTemp = document.getElementById("fromTemp");
const toTemp = document.getElementById("toTemp");
const resultBox = document.getElementById("tempResult");
const historyBox = document.getElementById("tempHistoryList");

function convertTemperature(value, from, to) {
  let result;

  // First, convert to Celsius as a common base
  if (from === "C") result = value;
  else if (from === "F") result = (value - 32) * 5/9;
  else if (from === "K") result = value - 273.15;

  // Convert from Celsius to target
  if (to === "C") return result;
  else if (to === "F") return (result * 9/5) + 32;
  else if (to === "K") return result + 273.15;
}

function updateTempResult() {
  const inputValue = parseFloat(tempInput.value);
  if (isNaN(inputValue)) {
    resultBox.innerText = "Result: ";
    return;
  }

  const from = fromTemp.value;
  const to = toTemp.value;
  const result = convertTemperature(inputValue, from, to).toFixed(2);

  resultBox.innerText = `Result: ${result} °${to}`;
  saveTempHistory(`${inputValue} °${from} = ${result} °${to}`);
}

function saveTempHistory(entry) {
  let history = JSON.parse(localStorage.getItem("tempHistory")) || [];
  history.unshift(entry);
  if (history.length > 5) history.pop();
  localStorage.setItem("tempHistory", JSON.stringify(history));
  renderTempHistory();
}

function renderTempHistory() {
  const history = JSON.parse(localStorage.getItem("tempHistory")) || [];
  historyBox.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    historyBox.appendChild(li);
  });
}

// Events
tempInput.addEventListener("input", updateTempResult);
fromTemp.addEventListener("change", updateTempResult);
toTemp.addEventListener("change", updateTempResult);

// Init
renderTempHistory();
