// Asetukset
const BASE_PRICE   = 10.0;  // Kaikkien pizzojen perushinta (sama kaikille)
const EXTRA_PRICE  = 2.0;   // 2 €/valittu extra/pizza
const DISCOUNT     = 0.10;  // Kanta-asiakas -10 %

document.addEventListener("DOMContentLoaded", () => {
  // Elementit (pidetään samat id:t kuin alkuperäisessä)
  const pizzaSelect = document.getElementById('pizzaChoice');
  const amountInput = document.getElementById('orderAmount');
  const totalInput  = document.getElementById('total');
  const primeSwitch = document.getElementById('switch');
  const orderBtn    = document.getElementById('orderButton');

  // Täytetään pizzavaihtoehdot
  const pizzaTypes = ['Tropicana', 'Perfetta', 'Pepperoni'];
  pizzaTypes.forEach((name, i) => {
    pizzaSelect.add(new Option(name, String(i)));
  });

  // Extrat id:illä
  const extras = ['garlic', 'oregano', 'cheese'];

  // Apu: määrän rajaaminen 1–10
  function clampQty(value) {
    const n = Number(value);
    if (Number.isNaN(n)) return 1;
    return Math.min(Math.max(n, 1), 10);
  }

  function getExtrasCount() {
    return extras.reduce((sum, id) => {
      const el = document.getElementById(id);
      return sum + (el && el.checked ? 1 : 0);
    }, 0);
  }

  function calcTotal() {
    const qty = clampQty(amountInput.value);
    const extraCostPerPizza = getExtrasCount() * EXTRA_PRICE;
    let subtotal = (BASE_PRICE + extraCostPerPizza) * qty;
    if (primeSwitch.checked) subtotal *= (1 - DISCOUNT);
    // 2 desimaalia
    return Math.round(subtotal * 100) / 100;
  }

  function updateTotal() {
    const t = calcTotal();
    // Näytetään suomalaisella muodolla (pilkku desimaalina)
    totalInput.value = t.toLocaleString('fi-FI', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Tapahtumat (kevyesti, ulkoasu ei muutu)
  ['change', 'input'].forEach(evt => {
    pizzaSelect.addEventListener(evt, updateTotal);
    amountInput.addEventListener(evt, () => {
      amountInput.value = clampQty(amountInput.value);
      updateTotal();
    });
    primeSwitch.addEventListener(evt, updateTotal);
    extras.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(evt, updateTotal);
    });
  });

  orderBtn.addEventListener('click', () => {
    alert(`Tilauksesi on vastaanotettu. Summa: € ${totalInput.value}`);
  });

  // Alustus
  pizzaSelect.selectedIndex = 0;
  updateTotal();
});
