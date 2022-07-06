$(function () {
  var $gnb = $("#gnb"),
    $allmenu = $gnb.find(".all_menu");

  $allmenu.find(".depth1_link").on("mouseenter focusin", function (event) {
    var $target = $(event.target);
    $allmenu.find(".depth1_li").removeClass("active");
    $target.parent(".depth1_li").addClass("active");
    return false;
  });
  $(window).on("load", function () {
    $allmenu.find(".depth1_li:first-child").addClass("active");
  });

  //공통 액티브 박스
  $(window).on("load", function () {
    $(".active_btn").attr("title", "열기");
  });
  $(".active_box button.active_btn").on("click", function () {
    var $this = $(this),
      $this_parent = $this.parent();

    if (!$this.hasClass("on")) {
      $this
        .parents(".active_box")
        .addClass("active")
        .find(".active_btn")
        .attr("title", "닫기")
        .addClass("on");
      if ($this_parent.hasClass("all_menu")) {
        $this.text("전체메뉴 닫기");
      }
    } else {
      $this
        .parents(".active_box")
        .removeClass("active")
        .find(".active_btn")
        .attr("title", "열기")
        .removeClass("on");
      if ($this_parent.hasClass("all_menu")) {
        $this.text("전체메뉴 보기");
      }
    }
  });

  //탭버튼

  $(".tab_layout").each(function () {
    var tab_layout = $(this),
      $tab = tab_layout.find("> .tab_button > ul > li"),
      $tab_btn = tab_layout.find("> .tab_button > ul > li > a"),
      $tabContent = tab_layout.find(" > .tab_content");

    $(window).on("load", function () {
      //로드 됐을때 보여줄 탭. data-roadtab 속성 없을시 기본값 1
      if (!tab_layout.is("[data-roadtab]")) {
        tab_layout.attr("data-roadtab", "1");
      }

      var num = tab_layout.attr("data-roadtab");

      $tab_view = tab_layout.find(" > .tab_content.tab" + num);
      $tab.eq(num - 1).addClass("active");
      $tab_view.addClass("active");
      if (num == 2) {
        if (typeof fn_ezorder == "function") {
          fn_ezorder();
        }
      }
    });

    $tab.bind("mouseover", function (event) {
      var this_eq = $tab.index($(this));
      $tab.removeClass("active");
      $tab.eq(this_eq).addClass("active");
      $tabContent.removeClass("active");
      tab_layout.find(".tab_content.tab" + (this_eq + 1)).addClass("active");
      if (this_eq == 1) {
        if (typeof fn_ezorder == "function") {
          fn_ezorder();
        }
      }
      event.preventDefault();
    });
  });

  $(".list_type1 .cart_list_btn").click(function () {
    $(".list_type1 .cart_list").removeClass("show");
    $(".list_type1 .cart_list2").removeClass("show");
    $(this).next().next().next().next(".cart_list").addClass("show");
    return false;
  });
  $(".list_type1 .cart_list_btn2").click(function () {
    $(".list_type1 .cart_list").removeClass("show");
    $(".list_type1 .cart_list2").removeClass("show");
    $(this).next().next(".cart_list2").addClass("show");
    return false;
  });
  $(".list_type1 .cart_list .btn_2").click(function () {
    $(".list_type1 .cart_list").removeClass("show");
    return false;
  });
  $(".list_type1 .cart_list2 .btn_2").click(function () {
    $(".list_type1 .cart_list2").removeClass("show");
    return false;
  });

  $(".list_type2 .cart_list_btn").click(function () {
    $(".cart_list").removeClass("show");
    $(this).parent().next(".cart_list2").addClass("show");
    return false;
  });
  $(".list_type2 .cart_list .btn_2").click(function () {
    $(".cart_list").removeClass("show");
    return false;
  });
  $(".list_type2 .cart_list2 .btn_2").click(function () {
    $(".cart_list2").removeClass("show");
    return false;
  });

  $("#sit_btn_buy2").click(function () {
    $(this).next(".cart_list").addClass("show");
    return false;
  });

  $(".pass_btn").click(function () {
    $(".pass_box").addClass("on");
    $(".pass_btn").addClass("on");
    $(".imsi_box").removeClass("on");
    $(".imsi_btn").removeClass("on");
    fn_ezorder();
    return false;
  });

  $(".imsi_btn").click(function () {
    $(".imsi_box").addClass("on");
    $(".imsi_btn").addClass("on");
    $(".pass_box").removeClass("on");
    $(".pass_btn").removeClass("on");
    fn_ezorder();
    return false;
  });

  $(".prdouct_modal_pop .close_btn").click(function () {
    $(".prdouct_modal_pop").removeClass("on");
    return false;
  });

  $(".select_order_title .more").click(function () {
    $(".prdouct_modal_pop").addClass("on");
    return false;
  });
});

//상단메뉴
function web_menu(a) {
  var top1menu = $("#lnb .top1menu"),
    depth1 = $("#lnb .top1menu > li"),
    depth1_t = $("#lnb .top1menu li.depth1 > .depth1_ti"),
    depth2 = $(".depth2 > li");

  top1menu.find(" > li > div").addClass("top2m");
  depth1_t.bind({
    mouseenter: function () {
      $(this)
        .parents(".depth1")
        .addClass("on")
        .find("div.top2m")
        .stop()
        .slideDown(300);
    },
    focusin: function () {
      depth1.removeClass("on").find("div.top2m").stop().slideUp(100);
      $(this)
        .parents(".depth1")
        .addClass("on")
        .find("div.top2m")
        .stop()
        .show(300);
    },
  });

  depth1.find("ul").focusin(function () {
    $(this).parents(".depth1").addClass("on");
  });

  depth1.mouseleave(function () {
    $(this).removeClass("on").find("div.top2m").stop().slideUp(100);
  });

  top1menu.find("li:last-child .top2m li:last-child a").focusout(function () {
    $("#lnb .depth1.on").removeClass("on");
    $(this)
      .parents("li.depth1")
      .removeClass("on")
      .find(".top2m")
      .stop()
      .slideUp(100);
  });

  depth2.bind({
    mouseenter: function () {
      $(this).addClass("on");
    },
    focusin: function () {
      depth2.find("li").removeClass("on");
      $(this).addClass("on");
    },
    focusout: function () {
      $(this).siblings("ul li:last-child()").removeClass("on");
    },
  });

  depth2.mouseleave(function () {
    $(this).removeClass("on");
  });

  depth1.each(function (index) {
    $(this).addClass("depth1_" + index);
  });

  top1menu.find("> li:last-child").addClass("part_info");
  top1menu.find("> li:last-child ul li").each(function (index) {
    $(this).addClass("part_icon" + index);
  });
  //2017-05-25異붽�
  //$('.part_info div ')
}

function mobile_menu(a) {
  var depth1 = $(".top1menu"),
    dep1_length = depth1.find(" > li").size(),
    depLast_length = depth1
      .find(" > li:nth-child(" + dep1_length + ")  li")
      .size();

  depth1.find(" > li > div").addClass("top2m");
  depth1.off();
  depth1.find(" > li > a").off();
  depth1.find(" ul > li a").off();

  depth1
    .find(" > li > a")
    .siblings()
    .each(function (index) {
      if (!$(this).hasClass("load_actvie")) {
        $(this).slideUp();
      }
    });

  $(".top1menu .top2m, .top1menu .top2m div").css("height", "auto");
  $(".top1menu .top2m, .top1menu .top2m div.menu_bg2")
    .removeClass("menu_bg2")
    .addClass("menu_bg");
  $(".top1menu .top2m, .top1menu .top2m").removeClass("top2m2");
  depth1.find(" >  li > a").on("click", function (event) {
    var depth2_has = $(this).siblings("div").size();
    if (depth2_has == 0) {
    } else {
      event.preventDefault();
      var m_open = $(this).hasClass("active");
      if (m_open == true) {
        $(this).siblings().slideUp();
        $(this).removeClass("active");
      } else {
        depth1.find(" > li > div ").stop().slideUp();
        depth1.find(" a ").removeClass("active");
        $(this).siblings().slideDown();
        $(this).addClass("active");
      }
    }
  });

  depth1.find(" ul > li a ").on("click", function (event) {
    var depth3_has = $(this).siblings("ul").size();
    if (depth3_has > 0) {
      event.preventDefault();
    }
    var m_open = $(this).hasClass("active");
    if (m_open == true) {
      $(this).siblings().slideUp();
      $(this).removeClass("active");
    } else {
      depth1.find(" ul ul").stop().slideUp();
      depth1.find(" ul a").removeClass("active");
      $(this).siblings().slideDown();
      $(this).addClass("active");
    }
  });
}

$(document).ready(function () {
  var lnb = $("#lnb"),
    m_nav_open = $(".lnb_m_nav"),
    m_nav_close = $(".mask, .lnb_close button"),
    mask = $(".mask"),
    lnb_close = $(".lnb_close"),
    bodyFrame = $("body, html"),
    m_nav_display = false,
    gnb_navi = $(".gnb_navi");
  link_set = $(".link_set");

  m_nav_open.click(function () {
    var h = $(window).height();
    lnb.animate({ left: 0 }, 500);
    gnb_navi.animate({ left: 0 }, 500);
    link_set.animate({ left: 0 }, 500);
    lnb_close.animate({ left: 225 }, 500);
    bodyFrame.css("overflow", "hidden");
    bodyFrame.addClass("openM");
    m_nav_open.fadeOut(500);
    mask.show();
  });
  m_nav_close.click(function () {
    lnb.animate({ left: -280 }, 500);
    gnb_navi.animate({ left: -280 }, 500);
    link_set.animate({ left: -280 }, 500);
    lnb_close.animate({ left: -48 }, 500);
    bodyFrame.css("overflow", "");
    bodyFrame.removeClass("openM");
    m_nav_open.delay(300).fadeIn(0);
    mask.hide();
  });
});

$(function () {
  $(window).on({
    load: function () {
      if ($(window).width() > 1000) {
        web_menu();
        //web_lang();
      } else {
        mobile_menu();
        //mobile_lang();
      }
      //header_search();
    },
    resize: function () {
      if ($(window).width() > 1000) {
        web_menu();
        //web_lang();
      } else {
        mobile_menu();
        //mobile_lang();
      }
      //header_search();
    },
  });
});
