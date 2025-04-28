var pizzaTypes = ['tavallinen', 'perhepizza'],
      select = document.getElementById('pizzaChoice');
      for(pizzas in pizzaTypes) {
        select.add(new Option(pizzaTypes[pizzas], pizzas));
      };
      var orderedPizzaType = document.getElementById("pizzaChoice");

      if (orderedPizzaType = pizzaTypes[tavallinen]) {
        itemTotal = 6.00;
        }
        else if (orderedPizzaType = pizzaTypes[perhepizza]) {
          itemTotal = 12.00;
        }

        console.log(intemTotal)
        
        var order = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        select = document.getElementById('orderAmount');
        for(quant in order) {
          select.add(new Option(order[quant], quant));
        };
  
  function condimentValidate() {
      var valid = false;
      if (document.getElementById("pineapple").checked) {
          valid = true;
      }
      else if (document.getElementById("ham").checked) {
          valid = true;
      }
      else if (document.getElementById("Pepperon").checked) {
          valid = true;
      }
      else if (document.getElementById("cheese").checked) {
        valid = true;
    }
    else if (document.getElementById("tuna").checked) {
        valid = true;
    }
      else {
          valid = false;
      }
  }
  $(function() {
    $("#tooltip-1").tooltip();
    $("#tooltip-2").tooltip();
 });