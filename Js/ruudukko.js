
$(function() {
    var $container = $('.media-container');
  
    $('#btn-list').on('click', function() {
      $container
        .removeClass('grid-view')
        .addClass('list-view');
    });
  
    $('#btn-grid').on('click', function() {
      $container
        .removeClass('list-view')
        .addClass('grid-view');
    });
  });