$(function () {
  //리스트 이미지 슬라이드
  $(".best .list").each(function () {
    var $photoList = $(this);
    $photoList.slick({
      autoplay: true,
      dots: true,
      infinite: true,
      arrows: false,
    });
  });

  //visual
  var $visualSlideWrap = $(".visual .visual_slide"),
    $visualSlide = $visualSlideWrap.find(".visual_list"),
    $visualCtrl = $visualSlideWrap.find(".visual_ctrl"),
    $visualPrev = $visualCtrl.find(".prev"),
    $visualNext = $visualCtrl.find(".next");
  $visualSlide.slick({
    autoplay: false,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    appendDots: $visualCtrl,
    prevArrow: $visualPrev,
    nextArrow: $visualNext,
  });
});
