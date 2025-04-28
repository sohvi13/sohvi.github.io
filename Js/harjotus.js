$(document).ready(function() {
    const $sizeSelect    = $('#pizzaChoice');
    const $toppingInputs = $('.topping');
    const $totalField    = $('#totalAmount');
    const $orderButton   = $('#orderButton');
  
    // Calculate and display the total price
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
  
    // When size or any topping changes, recalc
    $sizeSelect.on('change', updateTotal);
    $toppingInputs.on('change', updateTotal);
  
    // Initial total on page load
    updateTotal();
  
    // Order button handler
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
    });
  });

  