
$(function () {
    "use strict";


    var pswp = {};

    pswp.slides = [];
    var $slides = $("#gallery .gallery > figure");
    $slides.each(function () {
        var $each = $(this);
        pswp.slides.push({
            src  : $each.find('a[itemprop="contentUrl"]').attr("href"),
            w    : $each.find('meta[itemprop="width"]').attr("content"),
            h    : $each.find('meta[itemprop="height"]').attr("content"),
            title: $each.find('figcaption[itemprop~="caption"]').html()
        });
    });

    pswp.options = {
        captionEl: false,
        shareEl: false
    };


    var openPhotoSwipe = function (index) {
        pswp.options.index = index;
        new PhotoSwipe($(".pswp")[0], PhotoSwipeUI_Default, pswp.slides, pswp.options).init();
    };

    var initPhotoSwipe = function () {
        $("body").append('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="닫기 (Esc)"></button><button class="pswp__button pswp__button--share" title="공유"></button><button class="pswp__button pswp__button--fs" title="전체 화면"></button><button class="pswp__button pswp__button--zoom" title="확대/축소"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="이전 사진 (왼쪽 화살표)"></button><button class="pswp__button pswp__button--arrow--right" title="다음 사진 (오른쪽 화살표)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>');

        $(document).on("click", "#gallery .gallery > figure", function (event) {
            openPhotoSwipe($(this).index());

            return false;
        });

        var hash = location.hash.substring(1).split("&");
        for (var i = 0; i < hash.length; ++i) {
            var pair = hash[i].split("=");
            if (pair.length == 2 && pair[0] == "pid") {
                openPhotoSwipe(Number(pair[1]) - 1);
                break;
            }
        }
    };

    var runSlideshow = function (slideDuration, fadeDuration) {
        var slideshow = function (prev) {
            var next;

            do next = Math.floor(Math.random() * pswp.slides.length);
            while (next == prev);

            $slides.eq(prev).fadeTo(fadeDuration, 0, function () {
                $(this).css("z-index", -1);
            });
            $slides.eq(next).fadeTo(fadeDuration, 1, function () {
                $(this).css("z-index", 1);
            });

            setTimeout(function () {
                slideshow(next);
            }, slideDuration);
        };

        $slides.fadeTo(0, 0);
        $slides.css("z-index", -1);
        slideshow(0);
    };

    var initKakao = function () {
        var settings = {
            container: ".share_ktalk",
            label: [
                $('meta[property="og:title"]').attr("content"),
                $('meta[property="og:description"]').attr("content")
            ].join("\n"),
            image: {
                src: $('meta[property="og:image"]').attr("content"),
                width: $('meta[property="og:image:width"]').attr("content"),
                height: $('meta[property="og:image:height"]').attr("content")
            },
            webButton: {
                text: $('meta[property="og:title"]').attr("content")
            },
            webLink: {
                text: $('meta[property="og:url"]').attr("content")
            }
        };

        Kakao.init("bb350980b273938cc0b2ed80229816e0");

        Kakao.Link.createTalkLinkButton(settings);

        $(document).on("click", "#share .share_kstory", function (event) {
            Kakao.Story.share({
                url: settings.webLink.text,
                text: settings.webButton.text
            });

            return false;
        });
    };

    var initDisqus = function () {
        window.disqus_config = function () {
            this.page.url = $('meta[property="og:url"]').attr("content");
            this.page.identifier = "wedding_invitation";
        };

        var d = document, s = d.createElement('script');
        s.src = 'https://jb-hy.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    };


    runSlideshow(5000, 1000);
    initKakao();
    initDisqus();
    initPhotoSwipe();
});

