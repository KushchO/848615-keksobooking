'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var MAX_UPLOADED_IMAGES = 10;
  var MAX_AVATAR = 1;

  var loadImages = function (file, maxImages, targetBlock, evt, targetImage) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (maxImages === MAX_AVATAR && targetImage) {
          targetImage.src = reader.result;
        }
        if (maxImages > 1) {
          var NumberOfImages = document.querySelectorAll('.ad-form__photo').length;
          var uploadContainer = document.querySelector('.ad-form__photo-container');
          if (NumberOfImages < maxImages) {
            if (!targetBlock.querySelector('img')) {
              var adPhoto = document.createElement('img');
              adPhoto.alt = 'Фото объявления';
              adPhoto.src = reader.result;
              adPhoto.classList.add('ad-form__photo-img');
              targetBlock.appendChild(adPhoto);
              return;
            }
            if (targetBlock.querySelector('img')) {
              var imageBlock = targetBlock.cloneNode(true);
              var image = imageBlock.querySelector('img');
              image.src = reader.result;
              uploadContainer.appendChild(imageBlock);
            }
          }
          if (NumberOfImages === maxImages && !uploadContainer.querySelector('p')) {
            var message = document.createElement('p');
            message.textContent = 'Вы можете загрузить не более 10 фото.';
            message.style.color = 'red';
            uploadContainer.appendChild(message);
          }
        }
      });

      reader.readAsDataURL(file);
    }
  };

  var imageLoadHandler = function (maxImages, loader, targetBlock, evt, targetImage) {
    if (loader.files) {
      var file = loader.files[0];
      loadImages(file, maxImages, targetBlock, evt, targetImage);
    } else
    if (evt.dataTransfer.files) {
      var droppedFile = evt.dataTransfer.files[0];
      loadImages(droppedFile, maxImages, targetBlock, evt, targetImage);
    }
  };

  var preventDefaultActions = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  var avatarUploader = document.querySelector('.ad-form-header__input');
  var avatar = document.querySelector('.ad-form-header__preview img');

  avatarUploader.addEventListener('input', function (evt) {
    imageLoadHandler(MAX_AVATAR, avatarUploader, false, evt, avatar);
  });

  var adImagesUploader = document.querySelector('.ad-form__input');
  var adImagesBlock = document.querySelector('.ad-form__photo');

  adImagesUploader.addEventListener('input', function (evt) {
    imageLoadHandler(MAX_UPLOADED_IMAGES, adImagesUploader, adImagesBlock, evt);
  });

  var imagesDropBlock = document.querySelector('.ad-form__drop-zone');

  imagesDropBlock.addEventListener('dragover', function (evt) {
    preventDefaultActions(evt);
  });
  imagesDropBlock.addEventListener('drop', function (evt) {
    preventDefaultActions(evt);
    imageLoadHandler(MAX_UPLOADED_IMAGES, imagesDropBlock, adImagesBlock, evt);
  });

  var avatarDropBlock = document.querySelector('.ad-form-header__drop-zone');

  avatarDropBlock.addEventListener('dragover', function (evt) {
    preventDefaultActions(evt);
  });

  avatarDropBlock.addEventListener('drop', function (evt) {
    preventDefaultActions(evt);
    imageLoadHandler(MAX_AVATAR, avatarDropBlock, false, evt, avatar);
  });

})();
