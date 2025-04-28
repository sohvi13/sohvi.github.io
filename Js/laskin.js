class Calculator {
    constructor() {
      this.history = [];
    }


calculate(a, b, op) {
    let result;
    switch (op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/':
        if (b === 0) throw new Error("Nollalla jakaminen");
        result = a / b;
        break;
      default: throw new Error("Tuntematon operaattori");
    }
    const entry = `${a} ${op} ${b} = ${result}`;
    this.history.push(entry);
    return result;
  }
}
$(function() {
    const calc = new Calculator();
  
    // Yleistetty kentän päivittäjä [+] ja [–] -painikkeille
    function updateField(selector, delta) {
      let val = parseInt($(selector).val(), 10);
      if (isNaN(val)) val = 0;
      $(selector).val(val + delta);
    }
  
    $('#incrA').click(() => updateField('#numberA', 1));
    $('#decrA').click(() => updateField('#numberA', -1));
    $('#incrB').click(() => updateField('#numberB', 1));
    $('#decrB').click(() => updateField('#numberB', -1));
  
    // Laske-painike
    $('#calculate').click(() => {
      const aStr = $('#numberA').val();
      const bStr = $('#numberB').val();
  
      // Validointi regexillä (vain numerot sallittu)
      const regex = /^\d+$/;
      if (!regex.test(aStr) || !regex.test(bStr)) {
        $('#dialog')
          .text('Syötä kenttiin vain kokonaislukuja!')
          .dialog();
        return;
      }
  
      const a = parseInt(aStr, 10);
      const b = parseInt(bStr, 10);
      const op = $('#operator').val();
  
      let result;
      try {
        result = calc.calculate(a, b, op);
      } catch (err) {
        $('#dialog')
          .text('Virhe: ' + err.message)
          .dialog();
        return;
      }
  
      // Näytä tulos
      $('#result').text(`Tulos: ${result}`);
  
      // Päivitä historia
      const listItems = calc.history
        .map(item => `<li>${item}</li>`)
        .join('');
      $('#history').html(`<h4>Historia:</h4><ul>${listItems}</ul>`);
    });
  });