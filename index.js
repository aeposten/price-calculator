let hourlyRateEl = selectComponent("hourly-rate");
let hoursEl = selectComponent("hours");
let materialsEl = selectComponent("materials");
let shippingEl = selectComponent("shipping");
let markupEl = selectComponent("markup");
let usdEl = selectComponent("usd");

function selectComponent(elementId) {
  let component = document.getElementById(elementId);
  return component;
}

function generatePrice() {
  let baseTotal =
    parseInt(hourlyRateEl.value) * parseInt(hoursEl.value) +
    parseInt(materialsEl.value) +
    parseInt(shippingEl.value);
  let finalPrice = baseTotal * parseInt(markupEl.value);
  usdEl.textContent = finalPrice;
}
