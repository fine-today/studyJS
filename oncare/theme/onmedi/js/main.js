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
    variableWidth: true,
    appendDots: $visualCtrl,
    prevArrow: $visualPrev,
    nextArrow: $visualNext,
    centerMode: true,
  });

  //추천제품 탭
  var $rcmd = $(".recommend"),
    $rcmdNavBtn = $rcmd.find(".tab_nav .tab_btn"),
    $rcmdCon = $rcmd.find(".tab_con_list");

  $rcmdNavBtn
    .on("click", function () {
      var $this = $(this),
        thisIndex = $this.index();
      $rcmdNavBtn.removeClass("active");
      $this.addClass("active");
      $rcmdCon.removeClass("active");
      $rcmdCon.eq(thisIndex).addClass("active");
    })
    .triggerHandler("click");

  //견적서
  var $estimateSlideWrap = $(".estimate_slide"),
    $estimateSlide = $estimateSlideWrap.find(".estimate_list"),
    $estimateItem = $estimateSlide.find(".estimate_item"),
    $estimateDots = $estimateSlideWrap.find(".estimate_ctrl .dots"),
    nextIndex = 0;

  var $estimate2Wrap = $(".estimate2_slide_list"),
    $estimate2SlideWrap = $estimate2Wrap.find(".estimate2_slide");
  $estimateSlide.slick({
    autoplay: false,
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: $estimateDots,
    customPaging: function (slider, i) {
      return (
        '<button type="button" data-index="' +
        i +
        '">' +
        (i + 1) +
        "/" +
        slider.slideCount +
        "</button>"
      );
    },
  });
  $estimateSlide.on("beforeChange", function (slide, i, crr, next) {
    nextIndex = next;
  });

  $estimate2SlideWrap.each(function () {
    $(this).find(".estimate2_list").slick({
      autoplay: false,
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      swipeToSlide: true,
    });
  });
  $estimateItem
    .find("button")
    .on("click", function () {
      $estimate2SlideWrap
        .eq(nextIndex)
        .addClass("active")
        .siblings()
        .removeClass("active");
    })
    .triggerHandler("click");
  $(document).on("click", ".estimate_slide .dots button", function () {
    var $this = $(this),
      thisIndex = $this.attr("data-index");
    $estimate2SlideWrap
      .eq(thisIndex)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
});
