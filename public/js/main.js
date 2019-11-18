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
			'buttonCallEvent': '.btn-open-new-modal',
			'modal': '.new-modal'
		},
		{
			'buttonCallEvent': '.btn-open-delete-modal',
			'modal': '.delete-modal'
		},
		{
			'buttonCallEvent': '.btn-open-edit-modal',
			'modal': '.edit-modal'
		},
		{
			'buttonCallEvent': '.upload-image .btn-show-modal',
			'modal': '.upload-modal'
		},
		{
			'buttonCallEvent': '.table-parent .btn-edit-more',
			'modal': '.edit-modal'
		},
	];
	for (const item of ListEventCustomersModal) {
		// Open modal
		$(item.buttonCallEvent).on('click', function (e) {
			e.preventDefault();
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

	// Random password
	function randomString(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	$('.random-password').on('click', function (e) {
		e.preventDefault();
		$('#edit-password').val(randomString(10));
	});



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
	// PreventDefault all button in .upload-image
	$('.upload-image button').on('click', function (e) {
		e.preventDefault();
	});
	$('.upload-image a').on('click', function (e) {
		if ($(this).attr('href') == '') {
			e.preventDefault();
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
		clearAllParamInsideUploadModal();
		$DownloadAvatar.attr('href', '');
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
		$UploadAvatar.val('');
		$('#croped').attr('value', imgSrc)
		$PreviewBeforeCrop.empty();
		alert("Crop successful");
		$('.upload-modal').hide();
	})
	// ================= END UPLOAD, PREVIEW IMAGE =================

	// SET OWNER-NAME WHEN SELECT OWNER IN ACCOUNTS PAGE
	$('.list-owners select').on('change', function () {
		var
			ownerName = $(this).siblings('input'),
			id = $(this).val(),
			arr = $(this).find('option');
		for (let i = 0; i < arr.length; i++) {
			if ($(arr[i]).val() == id) {
				ownerName.val($(arr[i]).text());
				break;
			}
		}
	})

	// GET ID AND USERNAME OF ACCOUNT WHEN CLICK RESET PASSWORD IN ACCOUNT PAGE
	$('.table-parent .btn-edit-more').on('click', function () {
		var tr = $(this).parents('tr');
		var id = tr.find('input:checkbox').val();
		var ownerName = tr.find('td:nth-child(3) a').text();
		var userName = tr.find('td:nth-child(2)').text();

		$('#edit-id').val(id);
		$('#edit-username').val(userName);
		$('#edit-owner-name').val(ownerName);
		$('#edit-owner option').each(function () {
			if ($(this).text() == ownerName) {
				$(this).attr('selected', 'selected');
				return false; // break loop
			}
		})
	});

});