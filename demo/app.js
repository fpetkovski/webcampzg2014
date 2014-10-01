$(document).ready(function() {

	var comments = new Firebase('https://webcamp.firebaseio.com/comments');
	var username = 'User' + Math.floor(Math.random() * 100);
	$('#username').val(username).attr('readonly', 'readonly');
	
	$('#btnPost').click(function(e) {
		var comment = $('#comment').val();	
		comments.push({
			username: username,
			comment: comment
		}, function(data) {
			$('#comment').val('');
		});
	});
	
	comments.on('child_added', function(child) {
		var value = child.val();
		var label = value.username + " says: " + value.comment;
		
		var template = $($('#comment-template').html());
		template.find('label').text(label);
		template.find('span').attr('id', child.name()).
			on('click', function(e) {
				var id = $(this).attr('id');
				comments.child(id).remove();
			});

		$('#comments').append(template);
	});

	comments.on('child_removed', function(child) {
		$('#' + child.name()).parent().remove();
	});
});
