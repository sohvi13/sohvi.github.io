window.onload = function() {
    var defaultAddress = 'Yliopistonkatu 36';
    var defaultCity = 'Lappeenranta';
    var iframe = document.getElementById('mapframe');
    iframe.src = 'https://www.google.com/maps?q=' +
      encodeURIComponent(defaultAddress + ' ' + defaultCity) + '&output=embed';
  };
  var searchButton = document.getElementById('searchBtn');
  searchButton.onclick = function() {
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var query = address + ' ' + city;
    var iframe = document.getElementById('mapframe');
    iframe.src = 'https://www.google.com/maps?q=' +
      encodeURIComponent(query) + '&output=embed';
  };