const KEY = "uQzNyhlY04NNv7TsWKPYVyrEqTQAKZIW";
const URL = "https://api.apilayer.com/exchangerates_data/convert?to=";

const hourlyRateEl = selectComponent("hourly-rate");
const hoursEl = selectComponent("hours");
const materialsEl = selectComponent("materials");
const shippingEl = selectComponent("shipping");
const markupEl = selectComponent("markup");
const USDEl = selectComponent("USD");
let finalPrice = "";


//Dynamically selects component by id
function selectComponent(elementId) {
  let component = document.getElementById(elementId);
  return component;
}


//Generates total price based on user input
function generatePrice() {
  let baseTotal =
    parseInt(hourlyRateEl.value) * parseInt(hoursEl.value) +
    parseInt(materialsEl.value) +
    parseInt(shippingEl.value);
  finalPrice = baseTotal * parseInt(markupEl.value);
  USDEl.textContent = finalPrice.toFixed(2);
  return finalPrice;
}

//Resets text for total price
function renderPriceText(text) {
  selectComponent("USD").textContent = text;
  selectComponent("CAD").textContent = text;
  selectComponent("EUR").textContent = text;
}

//Dynamically renders converted price data on page, for use in fetchCurrency
function renderConvertedData(data, to) {
  const converted = data.result;
  const element = selectComponent(to);

  element.textContent = converted.toFixed(2);
}


//Fetches currency data from API for live updates of conversion rates
function fetchCurrency(to, from) {
  renderPriceText("Price Loading");
  generatePrice();
  try {
    fetch(`${URL}${to}&from=${from}&amount=${finalPrice}`, {
      headers: {
        apikey: KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        renderConvertedData(data, to);
      });
  } catch (error) {
    console.error(error);
  }
}
