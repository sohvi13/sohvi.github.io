var pizzaTypes = ['Tropicana', 'Perfetta', 'Pepperoni'],
      select = document.getElementById('pizzaChoice');
      for(pizzas in pizzaTypes) {
        select.add(new Option(pizzaTypes[pizzas], pizzas));
      };
      var orderedPizzaType = document.getElementById("pizzaChoice");

      if (orderedPizzaType = pizzaTypes[0]) {
        itemTotal = 10.00;
        }
        else if (orderedPizzaType = pizzaTypes[1]) {
          itemTotal = 12.00;
        }
        else if (orderedPizzaType = pizzaTypes[2]) {
          itemTotal = 13.00;
        }
        
var order = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      select = document.getElementById('orderAmount');
      for(quant in order) {
        select.add(new Option(order[quant], quant));
      };

function condimentValidate() {
    var valid = false;
    if (document.getElementById("garlic").checked) {
        valid = true;
    }
    else if (document.getElementById("oregano").checked) {
        valid = true;
    }
    else if (document.getElementById("cheese").checked) {
        valid = true;
    }
    else {
        valid = false;
    }
}

function addPrimeCustomer() {
    var valid = false;
    if (document.getElementById("switch").checked) {
        valid = true;
    }
    else {
        valid = false;
    }
}



function total() {

}