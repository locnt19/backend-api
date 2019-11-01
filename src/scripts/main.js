$(document).ready(function () {

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('header').css({
				"box-shadow": "0 0 5px 0 rgba(0, 0, 0, .3)"
			});
		} else {
			$('header').css({
				"box-shadow": "none"
			});
		}
	})

	// Initial date time picker (Jquery UI Plugin)
	$('.datepicker').datepicker({
		dateFormat: "dd-mm-yy"
	});

	// Open - Close Sidebar
	$('header .btn-menu').on('click', function () {
		$('.sidebar').toggleClass('collapse')
	});

	// Open More action of end-user
	$('.user-action .username').on('click', function () {
		$(this).siblings('.nav-actions').toggleClass('active')
	});

	// Close modal
	$('.modal .modal-title button, .modal .modal-footer button[type=reset]').on('click', function () {
		$(this).parents('.modal').hide();
	})

	// ================= CUSTOMERS UI =================
	// Open modal when click add new customers
	$('#new-customer').on('click', function () {
		$('#modal-new-customer').show();
	});
	$('#delete-customer').on('click', function () {
		$('#modal-delete-customer').show();
	});
	$('#edit-customer').on('click', function () {
		$('#modal-edit-customer').show();
	});

	// Set background when tick records customers
	var $SelectAllRecordsCustomers = $('.table-wrapper thead input:checkbox');
	var $ListRecordsCustomers = $('.table-wrapper tbody input:checkbox');
	var $ShowTotalRecordsSelected = $('.action-customers .table-row-selected');
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