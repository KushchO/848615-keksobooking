'use strict';

(function () {
  /* Загружаем аватар */
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  /* Загружаем фото объявления */

  var imageLoadHandler = function (maxImages, loader, targetBlock, targetImage) {
    var file = loader.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          if (maxImages === 1 && targetImage) {
            targetImage.src = reader.result;
          }
          if (maxImages > 1) {
            var NumberOfImages = targetBlock.querySelectorAll('img').length;
            if (NumberOfImages < maxImages) {
              targetBlock.style.display = 'flex';
              var adPhoto = document.createElement('img');
              adPhoto.alt = 'Фото объявления';
              adPhoto.src = reader.result;
              adPhoto.style.width = 30 + 'px';
              adPhoto.style.height = 30 + 'px';
              targetBlock.appendChild(adPhoto);
            } else {
              loader.setCustomValidity('Вы загрузили максимальное количество изображений');
            }
          }
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var avatarUploader = document.querySelector('.ad-form-header__input');
  var avatar = document.querySelector('.ad-form-header__preview img');

  avatarUploader.addEventListener('input', function () {
    imageLoadHandler(1, avatarUploader, false, avatar);
  });

  var adImagesUploader = document.querySelector('.ad-form__input');
  var adImagesBlock = document.querySelector('.ad-form__photo');
  adImagesUploader.addEventListener('change', function () {
    imageLoadHandler(2, adImagesUploader, adImagesBlock);
  });
})();
