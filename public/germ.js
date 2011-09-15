
function error(req, status, err) {
  $('#content').text('An error occurred while processing the request ('+err+', '+req.status+')')
}

function manify(string) {
  var link = '<a href="http://www.kernel.org/pub/software/scm/git/docs/$1.html">$1$2</a>'
  return string.replace(/(git[-\w]*)(\(\d\))/, link)
}

function filter(value) {
  var count = 0;
  $('.entry').each(function() {
    var elt = $(this);
    if (value.length > 0 && elt.text().match(new RegExp(value, 'i')) && ++count < 6)
      elt.show()
    else
      elt.hide()
  })
}

function version(v) {
  if (v.length === 1) {
    return v[0] + ' and later';
  } else {
    return v[0] + ' - ' + v[1];
  }
}

function __load() {
  $.ajax({
    type: 'GET', url: '/germ.db', dataType: 'json',
    success: function(data) {
      $.each(data, function(val, data) {
        var message = $('<div href="#repo" class="entry"/>')

        $('<a class="id"/>').text(data.id).attr('href', '/id/' + data.id).appendTo(message)
        var $header = $('<h2 class="message"/>').text(data.message)
        $header.appendTo(message);

        $('<span class="version"/>').text(version(data.version)).appendTo(message)
        $('<div class="description"/>').html(manify(data.description)).appendTo(message)

        message.appendTo('#content')
      });

      filter($('input').val())
    }, error: error
  })
}

$('document').ready(function() {
  __load()

  if (window.location.pathname.match(/\/id\/(.+)$/)) {
    $('input').val(RegExp.$1);
    $('#filter').hide();
  } else if (window.location.search.match(/^\?(.+)$/)) {
    $('input').val(RegExp.$1);
  }
});