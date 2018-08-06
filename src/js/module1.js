define(function(require,exports,module){
  console.log('module1.js');
  var $ = require('jquery');
  var swiper = require('swiper');
  new Swiper('.swiper-container',{
    loop: true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  $('#p1').html('加载module1');
});