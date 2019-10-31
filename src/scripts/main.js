$(document).ready(function () {

	// YOUR CODE
	$('.user-action .username').on('click', function () {
		$(this).siblings('.nav-actions').toggleClass('active')
	});

	// Set background when tick records customers
	var $SelectAllRecordsCustomers = $('.records-customers thead input:checkbox');
	var $ListRecordsCustomers = $('.records-customers tbody input:checkbox');
	var $ShowTotalRecordsSelected = $('.action-customers .records-selected');
	var TotalRecordSelected = 0;
	function showTotalRecordsSelected() {
		if (TotalRecordSelected > 0) {
			$ShowTotalRecordsSelected.show().find('span').first().text(TotalRecordSelected);
		} else {
			$ShowTotalRecordsSelected.hide();
		}
	}
	$SelectAllRecordsCustomers.on('click', function () {
		if ($(this).is(':checked')) {
			$ListRecordsCustomers.each(function () {
				$(this).parents('tr').addClass('selected');
				$(this).prop('checked', true);
			});
			TotalRecordSelected = $ListRecordsCustomers.length;
		} else {
			$ListRecordsCustomers.each(function () {
				$(this).parents('tr').removeClass('selected');
				$(this).prop('checked', false);
			})
			TotalRecordSelected = 0;
		}
		showTotalRecordsSelected();
	});
	$ListRecordsCustomers.on('click', function () {
		if ($(this).is(':checked')) {
			$(this).parents('tr').addClass('selected');
			TotalRecordSelected++;
		} else {
			TotalRecordSelected--;
			$(this).parents('tr').removeClass('selected');
			// Untick `SelectAllRecordsCustomers`  when any record of `ListRecordsCustomers` untick
			if ($SelectAllRecordsCustomers.is(':checked')) {
				$SelectAllRecordsCustomers.prop('checked', false);
			}
		};
		// Tick `SelectAllRecordsCustomers` when all record of `ListRecordsCustomers` is ticked
		if (TotalRecordSelected == $ListRecordsCustomers.length) {
			$SelectAllRecordsCustomers.prop('checked', true);
		};
		showTotalRecordsSelected();
	});
});