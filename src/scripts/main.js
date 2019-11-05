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


	// Modal listener event
	var ListEventCustomersModal = [{
			'buttonCallEvent': '#new-customer',
			'modal': '#modal-new'
		},
		{
			'buttonCallEvent': '#delete-customer',
			'modal': '#modal-delete'
		},
		{
			'buttonCallEvent': '#edit-customer',
			'modal': '#modal-edit'
		},
		{
			'buttonCallEvent': '.upload-image .btn-show-modal',
			'modal': '#modal-upload'
		},
		{
			'buttonCallEvent': '.table-parent .delete',
			'modal': '#modal-delete'
		},
	];
	for (const item of ListEventCustomersModal) {
		// Open modal
		$(item.buttonCallEvent).on('click', function () {
			$(item.modal).show();
		});
		//Close modal
		$($(item.modal).find('.modal-title button')).on('click', function () {
			$(item.modal).hide();
			clearAllParamInsideUploadModal();
		})
		$($(item.modal).find('.modal-footer button[type=reset]')).on('click', function () {
			$(item.modal).hide();
			clearAllParamInsideUploadModal();
		})
	};

	// ================= CUSTOMERS UI =================
	// Set background when tick records customers
	var $SelectAllRecordsCustomers = $('.table-parent thead input:checkbox'),
		$ListRecordsCustomers = $('.table-parent tbody input:checkbox'),
		$ShowTotalRecordsSelected = $('.table-row-selected'),
		TotalRecordSelected = 0;

	function showTotalRecordsSelected() {
		if (TotalRecordSelected > 0) {
			$ShowTotalRecordsSelected.show().find('span').first().text(TotalRecordSelected);
		} else {
			$ShowTotalRecordsSelected.hide();
		}
	};
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
	});
	// ================= END CUSTOMERS UI =================


	// ================= UPLOAD, PREVIEW IMAGE =================
	// Preview avatar before upload to Server
	var $PreviewBeforeCrop = $('.preview-before-crop'),
		$AvatarAfterCrop = $('.avatar-after-crop'),
		$FancyboxAvatar = $('.box-avatar a'),
		$CropButton = $('.btn-crop'),
		$DownloadAvatar = $('.btn-download-avatar'),
		$UploadAvatar = $('#upload-avatar'),
		$ClearButton = $('.btn-clear'),
		$ClearAvatar = $('.btn-clear-avatar'),
		cropper = '';

	// On change show image
	$UploadAvatar.on('change', function (e) {
		if (e.target.files.length) {
			// Start file reader
			const reader = new FileReader();
			reader.onload = function (e) {
				if (e.target.result) {
					// create new image
					let img = document.createElement('img');
					img.id = 'image';
					img.src = e.target.result;
					// clean $PreviewBeforeCrop before
					$PreviewBeforeCrop.empty();
					// Append new image to PriviewBefore
					$PreviewBeforeCrop.append(img);
					// Initial ( Cropper Plugin )
					cropper = new Cropper(img, {
						aspectRatio: 1 / 1
					});
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	});
	// Clear all when click Cancel in Modal
	function clearAllParamInsideUploadModal() {
		$UploadAvatar.val('');
		$PreviewBeforeCrop.empty();
		$AvatarAfterCrop.attr('src', '');
	};
	// Clear avatar after crop
	$ClearAvatar.on('click', function () {
		$AvatarAfterCrop.attr('src', '');
	});
	// Clear preview before crop
	$ClearButton.on('click', function (e) {
		e.preventDefault();
		$UploadAvatar.val('');
		$PreviewBeforeCrop.empty();
	});
	$CropButton.on('click', function (e) {
		e.preventDefault();
		// Get result to Data Url
		let imgSrc = cropper.getCroppedCanvas().toDataURL();
		$AvatarAfterCrop.attr('src', imgSrc);
		$DownloadAvatar.attr('download', 'avatar.png');
		$DownloadAvatar.attr('href', imgSrc);
		$FancyboxAvatar.attr('href', imgSrc);
		$PreviewBeforeCrop.empty();
		alert("Crop successful");
		$('#modal-upload').hide();
	})
	// ================= END UPLOAD, PREVIEW IMAGE =================
});