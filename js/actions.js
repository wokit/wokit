var grphm_slider = (function(){
	var slide_class = 'ac-slide'
		slide = $('.' + slide_class),
		amount = slide.length,
		act_id = 0,
		allow = true,
		terms = $('.terms');

	$(document).on('click', '.control-next', function(){
		if(allow) {
			next();
		}
	});

	$(document).on('click', '.control-prev', function(){
		if(allow) {
			prev();
		}
	});

	var term = function(id) {
		terms.siblings().removeClass('active');
		terms.eq(id).addClass('active');
	}

	var next = function() {

		var toid;
		if(act_id == amount - 1) {
			toid = 0;
		} else {
			toid = act_id + 1;
		}

		allow = false;
		term(toid);
		$('.' + slide_class + '.active').addClass('slide-left').removeClass('active');
		slide.eq(toid).addClass('no-trans').addClass('slide-right');
		setTimeout(function(){
			slide.eq(toid).removeClass('no-trans').addClass('active').removeClass('slide-right');
		}, 1);
		setTimeout(function(){
			slide.eq(act_id).addClass('no-trans');
			slide.eq(act_id).removeClass('slide-left');
			act_id = toid;
			allow = true;
			setTimeout(function(){
				slide.eq(act_id).removeClass('no-trans');
			}, 1);
		}, 495);
	}

	var prev = function() {

		var toid;
		if(act_id == 0) {
			toid = amount - 1;
		} else {
			toid = act_id - 1;
		}

		allow = false;
		term(toid);
		$('.' + slide_class + '.active').addClass('slide-right').removeClass('active');
		slide.eq(toid).addClass('no-trans').addClass('slide-left');
		setTimeout(function(){
			slide.eq(toid).removeClass('no-trans').addClass('active').removeClass('slide-left');
		}, 1);
		setTimeout(function(){
			slide.eq(act_id).addClass('no-trans');
			slide.eq(act_id).removeClass('slide-right');
			act_id = toid;
			allow = true;
			setTimeout(function(){
				slide.eq(act_id).removeClass('no-trans');
			}, 1);
		}, 495);
	}

	var init = function() {
		slide.eq(0).addClass('active');
		terms.eq(0).addClass('active');
	};

	return { init : init }
})();

grphm_slider.init();