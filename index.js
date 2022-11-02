const KEY = "uQzNyhlY04NNv7TsWKPYVyrEqTQAKZIW";

let hourlyRateEl = selectComponent("hourly-rate");
let hoursEl = selectComponent("hours");
let materialsEl = selectComponent("materials");
let shippingEl = selectComponent("shipping");
let markupEl = selectComponent("markup");
let USDEl = selectComponent("USD");
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
  USDEl.textContent = finalPrice;
  return finalPrice;
}

function fetchCurrency(to, from) {
  generatePrice();
  try {
    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${finalPrice}`,
      {
        headers: {
          apikey: KEY,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let converted = data.result;
        let element = selectComponent(to);
        if (document.readyState === "loading") {
          element.textContent = "Loading from API";
        } else {
          element.textContent = converted;
        }
      });
  } catch (error) {
    console.error(error);
  }
}

function resetPage() {
    selectComponent('USD').textContent = 'Price Appears Here'
    selectComponent('CAD').textContent = 'Price Appears Here'
    selectComponent('EUR').textContent = 'Price Appears Here'
}

// fetchCurrency('CAD', 'USD', finalPrice)
// fetchCurrency('EUR', 'USD', finalPrice)
