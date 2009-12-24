
function error(req, status, err) {
	$('#content').text('An error occurred while processing the request ('+err+', '+req.status+')')
}

function manify(string) {
	var link = '<a href="http://www.kernel.org/pub/software/scm/git/docs/$1.html">$1$2</a>'
	return string.replace(/(git[-\w]*)(\(\d\))/, link)
}

function __load() {
	$.ajax({
		type: 'GET', url: 'germ.db', dataType: 'json',
		success: function(data) {
			$.each(data, function(val, data) {
				var message = $('<div href="#repo" class="entry"/>')

				$('<span class="id"/>').text(data.id).appendTo(message)
				$('<h1 class="message"/>').text(data.message).appendTo(message)
				$('<div class="description"/>').text('Description: '+data.description).appendTo(message)

				var expand = $('<div class="expand"/>').hide().appendTo(message)
				$('<div class="action"/>').html('Action: '+manify(data.action)).appendTo(expand)

				message.appendTo('#content')
				message.hover(
					function () {
						$(this).css('background-color', '#111')
						$(this).find('.expand').slideDown(100)
					},
					function () {
						$(this).css('background-color', '#000')
						$(this).find('.expand').slideUp(100)
					}
				)
			})
		}, error: error
	})
}

function filterErrorMessages(value) {
	$('.entry').each(function() {
		var elt = $(this);
		if (value.length > 0 && elt.text().match(new RegExp(value)))
			elt.show()
		else
			elt.hide()
	})
}

$('document').ready(function() {
	__load()
});