
// -----------------------------------------------------------------------------
// Mentoring component
// Assuming ".face, .faces/or mentoring" exists somewhere on the site,
// their functionality should be broken out of the main functionality of the
// site. I blindly put this together because I couldn't find its useage on the
// homepage or elsewhere on the site :( (By blind, I mean untested)
//
// formally mentoringBubbleClick
// -----------------------------------------------------------------------------

(function ($) {

    "use strict"

    var $window,
        $face,
        $faces;

    function mentoringNarrowStart() {
        $faces.css({
            'top': '230px',
            'left': '0px'
        });

        $face.first().addClass('has-bubble-open')
        .siblings().removeClass('has-bubble-open');
    }

    // Not sure if this is used anywhere?
    function mentoringWideStart() {
        $faces.css({
            'top': '0px',
            'left': '0px'
        });

        $('.face:nth-child(3)').addClass('has-bubble-open')
        .siblings().removeClass('has-bubble-open');
    }

    function onFaceClick (e) {
        var $this = $(this),
            $siblings = $this.siblings(),
            $parent = $(this).parent(),

            faceTop = $this.position().top,
            vertMath =  -1 * (faceTop - 230),
            faceLeft = $this.position().left,
            horizMath =  0 - faceLeft;

        if ($window.width() > 640){
            $parent.css('top', vertMath + 'px');
        } else {
            if ($this.hasClass('back-btn')){
                mentoringNarrowStart();
            } else {
                $parent.css('left', horizMath +'px');
            }
        }

        if (!$this.hasClass('back-btn')) {
            $this.addClass('has-bubble-open');
            $siblings.removeClass('has-bubble-open');
        }
    }

    function bindings () {
        $face.on('click', onFaceClick);
    }

    $(document).ready(function () {
        // variable definitions
        $window = $(window);
        $face = $('.face');
        $faces = $('.faces');

        bindings();
    });

})(jQuery);



// -----------------------------------------------------------------------------
// Homepage
// -----------------------------------------------------------------------------

// Deomonstrate modularity
function timerModule (options) {
    var defaults = {
            interval: 1
        },
        settings,
        functions = [],
        timer;

    settings = $.extend({}, defaults, options);

    function start () {
        timer = setTimeout(function () {
            // execute functions
            for (var i = 0; i < functions.length; i++)
                functions[i]();

            stopTimer();
            start();
        }, (settings.interval * 1000));
    }

    function stopTimer () {
        clearTimeout(timer);
    }

    function attachFunction (func) {
        if ($.isFunction(func)) {
            functions.push(func);
            return true;
        }

        return false;
    }

    return {
        attachFunction: attachFunction,
        start: start,
        stop: stopTimer
    }
}

(function ($, timer) {

    "use strict"

    var $window;

    function fumbleArticle () {
        var $articles = $('.article-thumb'),
            randNum = Math.floor(Math.random() * $articles.length) + 1

        $articles.eq(randNum).addClass('is-emph')
        .siblings().removeClass('is-emph');
    }

    function swapDribbleBackground () {
        var $tile = $('.design-img-link');

        // on hover
        $tile.hover(function (e) {
            var $this = $(this),
                $container = $this.parents().parents();

            $container.css({
                'background-color': $(this).data('color')
            });

        // off hover
        }, function (e) {
            var $this = $(this),
                $container = $this.parents().parents();

            $container.css({
                'background-color': $container.data('orig-color')
            });
        });
    }

    $(document).ready(function () {
        // Variable definition
        $window = $(window);

        // Change background (designBGStuff)
        swapDribbleBackground();

        // (articleTada)
        timer.attachFunction(fumbleArticle);
        timer.start();
    });

})(jQuery, timerModule({
    interval: 4
}));



// -----------------------------------------------------------------------------
// Global functionality
// -----------------------------------------------------------------------------

(function ($) {

    "use strict"

    var $body,
        $window,
        settings = {
            scrollDuration: 300
        };

    function onMobileToggleClick (e) {
        var $this = $(this),
            $navigation = $('.mobile-nav');

        $this.toggleClass('is-open');
        $navigation.toggleClass('is-open');
    }

    function onBlankLinkClick (e) {
        var $this = $(this),
            href = $this.attr('href'),
            $target = $(href);

        if ($target.length == 0)
            return;

        e.preventDefault();

        $body.animate({
            scrollTop: $target.offset().top
        }, settings.duration);
    }

    function bindings () {
        // Toggle mobile navigation (mobileNav)
        $('.mobile-nav-toggle').on('click', onMobileToggleClick);

        // Smooth scroll (smoothScroll)
        $('a[href^="#"]').on('click', onBlankLinkClick);
    }

    $(document).ready(function () {
        // Variable definitions
        $body = $('html, body');
        $window = $(window);

        bindings();
    });

})(jQuery);



// -----------------------------------------------------------------------------
// OLD functionality
// -----------------------------------------------------------------------------
$(window).scroll(function() {
  youtubeVidScroll();
  //startMentoring();
  startArticles();
});


function youtubeVidScroll() {

  var wScroll = $(window).scrollTop();

  $('.video-strip').css('background-position','center -'+ wScroll +'px');
}

function startArticles(){
  var wScroll = $(window).scrollTop();

  if($('section.articles').offset().top - $(window).height()/1.2 < wScroll) {
    $('.article-thumb').each(function(i){
      setTimeout(function(){
        $('.article-thumb').eq(i).addClass('is-visible');
      }, 100 * i);
    });
  }
}

function startMentoring() {

  var wScroll = $(window).scrollTop();

  if($('section.mentoring').offset().top - $(window).height()/2 < wScroll) {
    if($(window).width() > 640) {
    $('.faces').addClass('launched');
      if(!$('.face').hasClass('has-bubble-open')){
        setTimeout(function(){
          $('.face:nth-child(3)').addClass('has-bubble-open');
        }, 400);
      }
    } else {
      mentoringNarrowStart();
    }
  }

}
