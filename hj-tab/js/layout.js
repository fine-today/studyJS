(function($) {
    'use strict';

    //window.element = {};
    var $document = $(document),
        $window = $(window),
        $screen = $.screen;

    //screen
    $document.on('ready', function(event) {
        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1500
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1500,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : 1000,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }]
        });
    });

    //특정인쇄영역 프린트
    $window.load(function (){
        var printAreaCount = 0;
        $.fn.printArea = function () {
            var ele = $(this);
            var idPrefix = "printArea_";
            removePrintArea(idPrefix + printAreaCount);
            printAreaCount++;

            var iframeId = idPrefix + printAreaCount;
            var iframe = document.createElement('IFRAME');

            $(iframe).attr('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
            $(iframe).attr('name', 'print_it');
            $(iframe).attr('id', iframeId);

            document.body.appendChild(iframe);
            var doc = iframe.contentWindow.document;
            var links = window.document.getElementsByTagName('link');

            for (var i = 0; i < links.length; i++)
                if (links[i].rel.toLowerCase() == 'stylesheet')
                    doc.write('<link type="text/css" rel="stylesheet" href="' + links[i].href + '"></link>');

            doc.write('<div class="' + $(ele).attr("class") + '">' + $(ele).html() + '</div>');
            doc.close();

            setTimeout(function() {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            }, 500);

        }

        var removePrintArea = function (id) {
            $("iframe#" + id).remove();
        };
    });

})(window.jQuery);