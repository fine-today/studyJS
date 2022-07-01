(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			$html = $('html'),
			debounce = null;

		$window.load(function(){
			$('.sub_visual').addClass('active');
		});

		/* up 버튼  */
		function checkUpTop(){
			var currentScroll = $html.scrollTop(),
				$footer = $('#footer'),
				footerTop = $footer.offset().top,
				scrollTop = $window.scrollTop(),
				windowBottom = scrollTop + $window.height();

			if(footerTop <  windowBottom){
				$html.addClass('up_off');
			}

			if( scrollTop == 0){
				$html.addClass('unfixed_header');
			}else if(footerTop <  windowBottom){
				$html.addClass('up_off');
			}else{
				$html.removeClass('unfixed_header');
				$html.removeClass('up_off');
			}
		}
		checkUpTop();
		$window.scroll(function(){
			checkUpTop();
		});

		/* 컨텐츠 탭메뉴 */
		var $tab = $contents.find('.tab'),
			$tabButton = $tab.find('button.tab_button'),
			$tabContent = $tab.find('.tab_content');

		$('.tab_select').click(function () {
			$(this).parent('.tab').toggleClass('active');
		});

		$tabButton.click(function (event) {
			var $this = $(this),
				tabButtonText = $this.text(),
				index = $tabButton.index(this);

			$this.parent().addClass('active').siblings().removeClass('active');
			$this.parents('.tab').find('.tab_select span').text(tabButtonText);
			$tabContent.eq(index).addClass('active').siblings().removeClass('active');
		});

		/* 박스높이() */
		function stepAutoHeight(){
			var $step = $container.find('.box.ul'),
				$stepList = $step.find('.box_list'),
				$stepTitle = $step.find('.box_title'),
				$stepText = $step.find('.box_text');

			//초기화
			$stepTitle.removeAttr('style', 'height');
			$stepText.removeAttr('style', 'height');

			$stepList.each(function (index, element) {
				var $element = $(element),
					titleMinHeight = 52, //기본 제목 높이
					textMinHeight = 0; //기본 텍스트 높이

				$element.find('li').each(function (index, element) {
					var $element = $(element),
						titleHeight = $element.find('.box_title').height(),
						textHeight = $element.find('.box_text').height();

					//제목 최고높이
					if (titleHeight > titleMinHeight) {
						titleMinHeight = titleHeight;
					}

					//텍스트 최고높이
					if (textHeight > textMinHeight) {
						textMinHeight = textHeight;
					}
				});

				$element.find('.box_title').height(titleMinHeight);
				$element.find('.box_text').height(textMinHeight);
			});

		}
		stepAutoHeight();

		function boxinfoHeightCheck(){

			var $boxinfo = $container.find('.box.info');

			//초기화
			$boxinfo.removeClass('over');

			$boxinfo.each(function (index, element) {
				var $element = $(element),
					minHeight = 64,
					outerHeight = $element.outerHeight();

				$element[(minHeight < outerHeight) ? 'addClass' : 'removeClass']('over');
				/*
				if(minHeight < outerHeight){
					$element.addClass('over');
				}else{
					$element.removeClass('over');
				}
				*/
			});

		}
		boxinfoHeightCheck();

		$window.on('resize', function () {
			clearTimeout(debounce);
			debounce = setTimeout(function (){
				stepAutoHeight();
				boxinfoHeightCheck();
			}, 50);
		});


		/* 반응형 테이블 */
		var $tableResponsive = $container.find('.table.responsive');

		$tableResponsive.each(function(index, element) {
			var $element = $(element),
				rowdivIs = $element.find('td, th').is('[rowdiv]'),
				theadLength = $element.find('thead').length;

			if(rowdivIs == false && !theadLength == 0){
				$element.find('tbody th, tbody td').each(function(index, element) {
					var $this = $(element),
						thisIndex = $this.index(),
						theadText = $this.parents('tbody').siblings('thead').find('th').eq(thisIndex).text();

					$this.attr('data-content', theadText);
				});

				$element.find('tfoot th, tfoot td').each(function(index, element) {
					var $this = $(element),
						thisIndex = $this.index(),
						theadText = $this.parents('tfoot').siblings('thead').find('th').eq(thisIndex).text();

					$this.attr('data-content', theadText);
				});
			}
		});

		/* 이미지 확대보기 */
		$('.img_zoom').each(function () {
			var src = $(this).find('img').attr('src');
			$(this).append('<a href="' + src + '" target="_blank" title="새창" class="zoom_btn">이미지 확대보기</a>')
		});

	});
})(window.jQuery);
