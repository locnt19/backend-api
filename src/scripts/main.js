$(document).ready(function () {

	// YOUR CODE
	$('.user-action .username').on('click', function () {
		$(this).siblings('.nav-actions').toggleClass('active');
	})
});