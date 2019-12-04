$(function(){
	var $container = $('.container'),
	    $slider = $('.slider'),
	    $wrap = $('.wrap'),
	    $filter_wrap = $('.filter_wrap'),
  		length = [],
	    $slider_origin = $('.slider_origin'),
	    offsetX_R, offsetX_L, offsetX_T, offsetX_B,
	    imgArray = $slider_origin.children().toArray();

	$container.shapeshift({
    	gutterX: 20,
    	gutterY: 25,
    	animateOnInit: true,
    	animationSpeed: 1000,
    	handle: '.item'
	});

	$filter_wrap.shapeshift({
		enableDrag: false,
		animateOnInit: true,
		animationSpeed: 600,
		enableCrossDrop: false,
    	minHeight: 85
	});

	$('.item').on('mousedown', function( event ) {
		offsetX_L = event.pageX - $(this).offset().left;
        offsetX_R = $('html').width() - offsetX_L - 15;
		offsetX_T = event.pageY - $(this).offset().top;
        offsetX_B = $('html').height() - offsetX_T;
		$wrap.draggable({
			containment: [ -offsetX_L, -offsetX_T, offsetX_R, offsetX_B ]
		}).on('drag', function () {	
			$(this).find('.slider').pause();
	        if($('.item').offset().top >= ($('html').height() - offsetX_T)) {
	    		$('.item').draggable("option", "scroll", false );
	        } else {
	        	$wrap.draggable("option", "scroll", true );
	        }
		});
	});

	$('.flash, .modal_wrap').on('touchstart', function(event) {
		event.preventDefault();
		$('.modal').toggle();
	});

	$container.on('ss-drop-complete',function () {
		$slider.resume();
	})

	function sliderLoop (i,e) {
		$(e).animate({top: -length[i]}, length[i]*30, 'linear',  function () {
			$(this).css('top',0);
			sliderLoop(i,e);
		})
	}

	$slider.each(function(i,e) {
	    length[i] = 0;
	    $(this).children().each(function() {
	        length[i] += $(this).outerHeight(true);
	    })
	    // $('<style />').html('@keyframes loop' + i + '{from {transform:translate3d(0,0,0);}to{transform:translate3d(0,' + -length[i] + 'px,0);}}').appendTo('head');

	    // $(this).children().clone().addClass('slider_clone').removeClass('slider_origin').appendTo($(this)).parent().css({
	    //   'animation': 'loop' + i + ' linear '+ length[i]/30 +'s  infinite'
	    // });
    	$(this).children().clone().addClass('slider_clone').removeClass('slider_origin').appendTo($(this));
    	
		sliderLoop(i,e);
		}).on({'mouseenter': function(){
	    	$(this).css({'cursor':'url(img/openhand.cur),move'});
	    }, 'mousedown': function(){
	    	$(this).css({'cursor':'url(img/closedhand.cur),move'});
	    }, 'mouseup ': function(){
	    	$(this).css({'cursor':'url(img/openhand.cur),move'});
	    }
	});
	

	imgArray = imgArray.sort(function(a, b){return 0.5 - Math.random()});
	$.each(imgArray, function(index, el) {
		 var intervalT = Math.floor(Math.random() * 2000);
		 setTimeout(function(){
			$(el).animate({opacity: 1}, 1200);
		}, intervalT);
	});
	$('.filter_trigger').tagSort({
     	items:'.filter_item',
     	tagElement: 'a'
	});

	$('.filter').on('click', function(event) {
		event.preventDefault();
		if (!$(this).siblings().hasClass('active')) {
			var $filter_id = $(this).attr('id');
			$(' .filter_trigger a:contains(' + $filter_id + ')').trigger('click');
			$container.shapeshift({
				animateOnInit: true,
				animationSpeed: 600
			});
			$(this).toggleClass('active').siblings().toggleClass('disable');
		};
	});
	$('.back_top').click(function(event){
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000,'easeInOutExpo');
		event.preventDefault();
	});
})
