const mediaData = [
    {
      "title": "Eka kisu",
      "date": "2025-04-01",
      "content": "Tässä on yksi kissa",
      "img": "images/topi-kissa-5089.jpg"
    },
    {
      "title": "Toka kisu",
      "date": "2024-03-09",
      "content": "Ja tässä toinen kissa",
      "img": "images/kissa_orig.jpg"
    },
    {
      "title": "Kolmas kisu",
      "date": "2023-02-19",
      "content": "Mä rakastan kissoja",
      "img": "images/download.jpg"
    }
  ];

  let currentIndex = 0;
  let intervalId = null;
  const STORAGE_KEY = 'mediaElementIndex';

  // Näytä mediaelementin sisältö annetulla indeksillä
  function displayMedia(index) {
    const item = mediaData[index];
    $('#media-container').fadeOut(200, function() {
      $('#media-image').attr('src', item.img);
      $('#media-title').text(item.title);
      $('#media-date').text(item.date);
      $('#media-content').text(item.content);
      $(this).fadeIn(200);
    });
    // Tallenna indeksi localStorageen
    localStorage.setItem(STORAGE_KEY, index);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % mediaData.length;
    displayMedia(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + mediaData.length) % mediaData.length;
    displayMedia(currentIndex);
  }

  function startPlay() {
    if (!intervalId) {
      intervalId = setInterval(showNext, 3000); // vaihtuu 3 sekunnin välein
      $('#playBtn').text('Pause');
    }
  }

  function stopPlay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      $('#playBtn').text('Play');
    }
  }

  $(document).ready(function() {
    // Alusta indeksi localStoragesta tai 0
    const savedIndex = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < mediaData.length) {
      currentIndex = savedIndex;
    }
    displayMedia(currentIndex);

    // Painikkeiden tapahtumankäsittelijät
    $('#nextBtn').on('click', function() {
      stopPlay();
      showNext();
    });
    $('#prevBtn').on('click', function() {
      stopPlay();
      showPrev();
    });
    $('#playBtn').on('click', function() {
      if (intervalId) {
        stopPlay();
      } else {
        startPlay();
      }
    });
  });