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
	$('.btn-menu').on('click', function () {
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
	var ListEventCustomersModal = [{
			'idButton': '#new-customer',
			'idModal': '#modal-new'
		},
		{
			'idButton': '#delete-customer',
			'idModal': '#modal-delete'
		},
		{
			'idButton': '#edit-customer',
			'idModal': '#modal-edit'
		}
	];
	for (const item of ListEventCustomersModal) {
		$(item.idButton).on('click', function () {
			$(item.idModal).show();
		})
	};

	// Set background when tick records customers
	var $SelectAllRecordsCustomers = $('.table-parent thead input:checkbox');
	var $ListRecordsCustomers = $('.table-parent tbody input:checkbox');
	var $ShowTotalRecordsSelected = $('.table-row-selected');
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
			$(this).parents('tr').addClass('selected').next('.tr-child').addClass('selected');
			TotalRecordSelected++;
		} else {
			TotalRecordSelected--;
			$(this).parents('tr').removeClass('selected').next('.tr-child').removeClass('selected');
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

	// Toggle `tr-child` in table customers
	$('.table-parent .show-more').on('click', function () {
		switch ($(this).hasClass('minus')) {
			case true:
				$(this).removeClass('minus').addClass('plus')
				break;
			case false:
				$(this).removeClass('plus').addClass('minus')
				break;
		}
		$(this).parents('tr').toggleClass('more');
		$(this).parents('tr').next('.tr-child').toggleClass('show');
	})

	// Preview avatar before upload to Server

	// vars
	var $PreviewAvatar = $('.preview-avatar'),
		$AvatarAfterCrop = $('.avatar-after-crop'),
		$SetAvatarWitdh = $('.avatar-width'),
		$SetAvatarHeight = $('.avatar-height'),
		$SaveAvatarAfterCrop = $('.save-avatar'),
		$DownloadAvatar = $('.download-avatar'),
		$UploadAvatar = $('.upload-avatar');
	
	let result = document.querySelector('.result'),
		img_result = document.querySelector('.img-result'),
		img_w = document.querySelector('.img-w'),
		img_h = document.querySelector('.img-h'),
		options = document.querySelector('.options'),
		save = document.querySelector('.save'),
		cropped = document.querySelector('.cropped'),
		dwn = document.querySelector('.download'),
		upload = document.querySelector('#file-input'),
		cropper = '';

	// on change show image with crop options
	upload.addEventListener('change', (e) => {
		if (e.target.files.length) {
			// start file reader
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target.result) {
					// create new image
					let img = document.createElement('img');
					img.id = 'image';
					img.src = e.target.result
					// clean result before
					result.innerHTML = '';
					// append new image
					result.appendChild(img);
					// show save btn and options
					save.classList.remove('hide');
					options.classList.remove('hide');
					// init cropper
					cropper = new Cropper(img);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	});

	// save on click
	save.addEventListener('click', (e) => {
		e.preventDefault();
		// get result to data uri
		let imgSrc = cropper.getCroppedCanvas({
			width: img_w.value // input value
		}).toDataURL();
		// remove hide class of img
		cropped.classList.remove('hide');
		img_result.classList.remove('hide');
		// show image cropped
		cropped.src = imgSrc;
		dwn.classList.remove('hide');
		dwn.download = 'imagename.png';
		dwn.setAttribute('href', imgSrc);
	});




});