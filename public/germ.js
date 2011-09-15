
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

function __load() {
  console.log('loaded')

	$.ajax({
		type: 'GET', url: 'germ.db', dataType: 'json',
		success: function(data) {
			$.each(data, function(val, data) {
				var message = $('<div href="#repo" class="entry"/>')

				$('<span class="id"/>').text('id:'+data.id).appendTo(message)
				$('<h2 class="message"/>').text(data.message).appendTo(message)
				$('<div class="description"/>').html(manify(data.description)).appendTo(message)

				message.appendTo('#content')
			});

			filter($('input').val())
		}, error: error
	})
}

$('document').ready(function() {
	__load()

	var url = window.location.toString().match(/\?(.+)$/)
	$('input').val(RegExp.$1)
});