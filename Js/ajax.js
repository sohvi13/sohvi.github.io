$(function() {
    $("#jqueryAccordion").accordion({
      collapsible: true,
      active: false,
      heightStyle: "content"
    });
  });

  let count = 0;
  const fetchBtn = document.getElementById("fetchBtn");
  const spinner = document.getElementById("spinner");
  const counter = document.getElementById("counter");
  const bsAccordion = document.getElementById("bootstrapAccordion");
  const jqAccordion = $("#jqueryAccordion");

  fetchBtn.addEventListener("click", () => {
    spinner.style.display = "inline-block";

    fetch('https://api.chucknorris.io/jokes/random')
      .then(response => response.json())
      .then(data => {
        spinner.style.display = "none";
        count++;
        counter.textContent = 'Haut: ' + count;

        const item = document.createElement('div');
        item.className = 'accordion-item';
        item.innerHTML = `
          <h2 class="accordion-header" id="heading${count}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${count}" aria-expanded="false" aria-controls="collapse${count}">
              Vitsi #${count}
            </button>
          </h2>
          <div id="collapse${count}" class="accordion-collapse collapse" aria-labelledby="heading${count}" data-bs-parent="#bootstrapAccordion">
            <div class="accordion-body">
              <p>${data.value}</p>
            </div>
          </div>
        `;
        bsAccordion.prepend(item);

        const header = `<h3>Vitsi #${count}</h3>`;
        const content = `<div><p>${data.value}</p></div>`;

        jqAccordion.prepend(content);
        jqAccordion.prepend(header);
        jqAccordion.accordion("refresh");
      })
      .catch(error => {
        spinner.style.display = "none";
        alert('Virhe hakiessa dataa: ' + error);
      });
  });