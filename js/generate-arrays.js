'use strict';

(function () {
  window.generateArryas = {};
  var AuthorList = [];
  var tittleList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var addressList = [];
  window.generateArryas.locationListX = [];
  window.generateArryas.locationListY = [];
  var priceList = [];
  var typeOfAparts = ['palace', 'flat', 'house', 'bungalo'];
  var checkinList = ['12:00', '13:00', '14:00'];
  var checkoutList = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  /* Создаем переменные и  */


  var generateArryasForadObject = function () {
    for (var i = 1; i < 9; i++) {
      /* Генерируем массив ссылок на авторов объявлений */
      var authorId = i;
      if (i < 10) {
        authorId = '0' + i;
      }
      AuthorList.push('img/avatars/user' + authorId + '.png');
      /* Генерируем массив коородинат локаций и заполняем массив адресов */
      var addressX = window.utility.getRandomInRange(25, window.variables.map.offsetWidth - 50);
      var addressY = window.utility.getRandomInRange(130, 630);
      var address = addressX + ', ' + addressY;
      window.generateArryas.locationListX.push(addressX);
      window.generateArryas.locationListY.push(addressY);
      addressList.push(address);
      /* Генерируем массив цен на апартаменты */
      priceList.push(window.utility.getRandomInRange(1000, 1000000));
    }
  };

  generateArryasForadObject();

  var createAdArray = function () {
    var roomAdsList = [];
    for (var i = 0; i < 8; i++) {
      var ad = {};
      var apartsNum = window.utility.getRandomInRange(0, 3);
      var checiinNum = window.utility.getRandomInRange(0, 2);
      var checioutNum = window.utility.getRandomInRange(0, 2);
      var tempFeatureArray = featuresList.slice();
      tempFeatureArray.length = window.utility.getRandomInRange(1, featuresList.length);
      var tempphotoArray = window.utility.shuffleArray(photosList).slice();
      ad.offer = {};
      ad.offer.title = tittleList[i];
      ad.offer.address = addressList[i];
      ad.offer.price = priceList[i];
      ad.offer.type = typeOfAparts[apartsNum];
      ad.offer.guests = window.utility.getRandomInRange(1, 10);
      ad.offer.rooms = window.utility.getRandomInRange(1, 5);
      ad.offer.checkin = checkinList[checiinNum];
      ad.offer.checkout = checkoutList[checioutNum];
      ad.offer.features = tempFeatureArray;
      ad.offer.description = 'Описание';
      ad.offer.photos = tempphotoArray;
      ad.author = {};
      ad.author.avatar = AuthorList[i];

      roomAdsList.push(ad);
    }

    return roomAdsList;
  };

  window.generateArryas.adArray = createAdArray();
})();
