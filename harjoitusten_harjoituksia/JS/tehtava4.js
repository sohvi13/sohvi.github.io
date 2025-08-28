// JS/tehtava4.js — korjattu ja siistitty
(function ($) {
  "use strict";

  // --- Hinnasto ---
  const BASE_PRICE = 12.90;            // €/pizza
  const EXTRA_PRICE_FLAT = 2.00;       // €/extra
  const EXTRA_IDS = ["xVakl", "xOreg", "xAur"];
  const EUR = new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" });

  // Valittu pizza luetaan dropdown-napista
  let pizzaName = "";

  function initPizzaName() {
    pizzaName = $.trim($("#pizzaBtn").text()) || "Tropicana";
  }

  function extrasSum() {
    let count = 0;
    EXTRA_IDS.forEach(id => { if ($("#" + id).is(":checked")) count++; });
    return count * EXTRA_PRICE_FLAT;
  }

  function selectedExtrasNames() {
    const names = [];
    EXTRA_IDS.forEach(id => {
      if ($("#" + id).is(":checked")) {
        const raw = $(`label[for='${id}']`).text().trim();
        names.push(raw);
      }
    });
    return names;
  }

  function compute() {
    const qty = Math.max(1, Math.min(20, parseInt($("#qty").val() || "1", 10)));
    const loyalty = $("#loyalty").is(":checked");
    const add = extrasSum();
    const unit = BASE_PRICE + add;
    const subtotal = unit * qty;
    const discount = loyalty ? subtotal * 0.10 : 0;
    const total = subtotal - discount;
    return { qty, loyalty, pizzaName, add, unit, subtotal, discount, total };
  }

  function renderPreview() {
    if (!pizzaName) initPizzaName();
    const c = compute();
    // Näytä valuutta samassa kentässä: "18,90 €"
    $("#totalPreview").val(EUR.format(c.total));
  }

  function renderResult(c) {
    const $b = $("#breakdown").empty();
    $b.append(`<li>Perushinta / pizza: <strong>${EUR.format(BASE_PRICE)}</strong></li>`);
    $b.append(`<li>Lisät (pizza + extrat): <strong>${EUR.format(c.add)}</strong> / pizza</li>`);
    $b.append(`<li>Yksikköhinta: <strong>${EUR.format(c.unit)}</strong></li>`);
    $b.append(`<li>Määrä: <strong>${c.qty} kpl</strong></li>`);
    $b.append(`<li>Välisumma: <strong>${EUR.format(c.subtotal)}</strong></li>`);
    if (c.discount > 0) $b.append(`<li>Alennus (kanta-asiakas −10 %): <strong>−${EUR.format(c.discount)}</strong></li>`);
    $b.append(`<li class="mt-2">Yhteensä: <strong>${EUR.format(c.total)}</strong></li>`);

    const name = (c.pizzaName || "Pizza");
    $("#confirm")
      .removeClass("d-none alert-danger")
      .addClass("alert alert-success")
      .html(`<strong>Tilauksesi on vastaanotettu!</strong> ${c.qty} × ${name} – yhteensä ${EUR.format(c.total)}.`);
  }

  function showError(msg) {
    $("#confirm").removeClass("d-none alert-success").addClass("alert alert-danger").text(msg);
  }

  function resetAll() {
    $("#qty").val(1);
    EXTRA_IDS.forEach(id => $("#" + id).prop("checked", false));
    $("#loyalty").prop("checked", false);
    $("#pizzaBtn").text("Tropicana");
    initPizzaName();
    $("#totalPreview").val("");
    $("#breakdown").empty();
    $("#confirm").addClass("d-none").removeClass("alert-success alert-danger").empty();
  }

  $(function () {
    // Lisää extrien hinnat labeliin
    EXTRA_IDS.forEach((id) => {
      const $label = $(`label[for='${id}']`);
      if ($label.length) {
        const base = $label.text().trim().replace(/\s*\(.+\)$/, "");
        $label.text(`${base} (+${EUR.format(EXTRA_PRICE_FLAT)})`);
      }
    });

    initPizzaName();
    renderPreview();

    // Dropdown
    $(".dropdown-menu .dropdown-item").on("click", function (e) {
      e.preventDefault();
      const name = $(this).data("value") || $.trim($(this).text());
      $("#pizzaBtn").text(name);
      pizzaName = name;
      renderPreview();
    });

    // Reaaliaikainen esikatselu
    const selectors = ["#qty", "#loyalty"].concat(EXTRA_IDS.map(id => "#" + id)).join(", ");
    $(selectors).on("change input", renderPreview);

    // Tilaa
    $("#btnOrder").on("click", function () {
      const q = parseInt($("#qty").val(), 10);
      if (isNaN(q) || q < 1 || q > 20) { showError("Määrän tulee olla 1–20."); return; }
      const c = compute();
      renderResult(c);

      const extras = selectedExtrasNames();
      const extraText = extras.length ? " + extrat: " + extras.join(", ") : "";
      const loyaltyText = c.discount > 0 ? " (kanta-asiakas −10%)" : "";
      console.log(`Tilattu: ${c.qty} × ${c.pizzaName}${extraText}${loyaltyText}. Yhteensä: ${EUR.format(c.total)}.`);

      setTimeout(resetAll, 800);
    });
  });
})(jQuery);
