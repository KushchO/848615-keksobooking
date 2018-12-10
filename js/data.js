'use strict';

(function () {
  window.data = {};
  var map = document.querySelector('.map');
  window.data.map = map;
  var AuthorList = [];
  var tittleList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var addressList = [];
  window.data.locationListX = [];
  window.data.locationListY = [];
  var priceList = [];
  var typeOfAparts = ['palace', 'flat', 'house', 'bungalo'];
  var checkinList = ['12:00', '13:00', '14:00'];
  var checkoutList = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  /* Создаем переменные и  */


  var generateArraysForAdObject = function () {
    for (var i = 1; i < 9; i++) {
      /* Генерируем массив ссылок на авторов объявлений */
      AuthorList.push('img/avatars/user' + '0' + i + '.png');
      /* Генерируем массив коородинат локаций и заполняем массив адресов */
      var addressX = window.utility.getRandomInRange(25, map.offsetWidth - 50);
      var addressY = window.utility.getRandomInRange(130, 630);
      var address = addressX + ', ' + addressY;
      window.data.locationListX.push(addressX);
      window.data.locationListY.push(addressY);
      addressList.push(address);
      /* Генерируем массив цен на апартаменты */
      priceList.push(window.utility.getRandomInRange(1000, 1000000));
    }
  };

  generateArraysForAdObject();

  var createAdArray = function () {
    var roomAdsList = [];
    for (var i = 0; i < 8; i++) {
      var apartsNum = window.utility.getRandomInRange(0, 3);
      var checkinNum = window.utility.getRandomInRange(0, 2);
      var checkoutNum = window.utility.getRandomInRange(0, 2);
      var tempFeatureArray = featuresList.slice();
      tempFeatureArray.length = window.utility.getRandomInRange(1, featuresList.length);
      var tempphotoArray = window.utility.shuffleArray(photosList).slice();
      var ad = {
        author: {
          avatar: AuthorList[i]
        },
        offer: {
          title: tittleList[i],
          address: addressList[i],
          price: priceList[i],
          type: typeOfAparts[apartsNum],
          guests: window.utility.getRandomInRange(1, 10),
          rooms: window.utility.getRandomInRange(1, 5),
          checkin: checkinList[checkinNum],
          checkout: checkoutList[checkoutNum],
          features: tempFeatureArray,
          description: 'Описание',
          photos: tempphotoArray
        }
      };

      roomAdsList.push(ad);
    }

    return roomAdsList;
  };

  window.data.adArray = createAdArray();
})();
