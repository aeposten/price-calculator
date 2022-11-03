const KEY = "uQzNyhlY04NNv7TsWKPYVyrEqTQAKZIW";
const URL = "https://api.apilayer.com/exchangerates_data/convert?to=";

const hourlyRateEl = selectComponent("hourly-rate");
const hoursEl = selectComponent("hours");
const materialsEl = selectComponent("materials");
const shippingEl = selectComponent("shipping");
const markupEl = selectComponent("markup");
const USDEl = selectComponent("USD");
let finalPrice = "";

function selectComponent(elementId) {
  let component = document.getElementById(elementId);
  return component;
}

function generatePrice() {
  let baseTotal =
    parseInt(hourlyRateEl.value) * parseInt(hoursEl.value) +
    parseInt(materialsEl.value) +
    parseInt(shippingEl.value);
  finalPrice = baseTotal * parseInt(markupEl.value);
  USDEl.textContent = finalPrice.toFixed(2);
  return finalPrice;
}

function generateConvertedData(data, to) {
  const converted = data.result;
  const element = selectComponent(to);

  element.textContent = converted.toFixed(2);
}

function fetchCurrency(to, from) {
  isFetching();
  generatePrice();
  try {
    fetch(`${URL}${to}&from=${from}&amount=${finalPrice}`, {
      headers: {
        apikey: KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        generateConvertedData(data, to);
      });
  } catch (error) {
    console.error(error);
  }
}

function isFetching() {
  selectComponent("USD").textContent = "Price Loading";
  selectComponent("CAD").textContent = "Price Loading";
  selectComponent("EUR").textContent = "Price Loading";
}
function resetPage() {
  selectComponent("USD").textContent = "Price Appears Here";
  selectComponent("CAD").textContent = "Price Appears Here";
  selectComponent("EUR").textContent = "Price Appears Here";
}
