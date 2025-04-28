$(document).ready(function() {
  const $sizeSelect    = $('#pizzaChoice');
  const $toppingInputs = $('.topping');
  const $totalField    = $('#totalAmount');
  const $orderButton   = $('#orderButton');

  function updateTotal() {
    let sizePrice = parseFloat($sizeSelect.val());
    let toppingsPrice = 0;

    $toppingInputs.each(function() {
      if (this.checked) {
        toppingsPrice += parseFloat($(this).data('price'));
      }
    });

    let total = sizePrice + toppingsPrice;
    $totalField.val(total.toFixed(2) + ' €');
  }

  $sizeSelect.on('change', updateTotal);
  $toppingInputs.on('change', updateTotal);

  updateTotal();

  $orderButton.on('click', function() {
    let sizeText = $sizeSelect.find('option:selected').text();
    let selectedToppings = $toppingInputs
      .filter(':checked')
      .map(function() { return $(this).next('label').text(); })
      .get();

    let message = `Olet tilannut ${sizeText}`
                + (selectedToppings.length
                   ? `, täytteillä: ${selectedToppings.join(', ')}.`
                   : '.')
                + ` Hinta yhteensä: ${$totalField.val()}`;

    alert(message);

    $sizeSelect.prop('selectedIndex', 0);
    $toppingInputs.prop('checked', false);
    updateTotal();
  });
});

$(function () {
  $("#tooltip-1").tooltip();
  $("#tooltip-2").tooltip();
});

function condimentValidate() {
  var valid = false;
  if (document.getElementById("pineapple").checked) {
    valid = true;
  } else if (document.getElementById("ham").checked) {
    valid = true;
  } else if (document.getElementById("Pepperon").checked) {
    valid = true;
  } else if (document.getElementById("cheese").checked) {
    valid = true;
  } else if (document.getElementById("tuna").checked) {
    valid = true;
  } else {
    valid = false;
  }
}
