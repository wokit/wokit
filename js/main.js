function alignOrdername() {
	var $name = $('.name');
	var $leftLine = $name.find('.left-line');
	var $rightLine = $('.right-line');

	$rightLine.width( $name.parent().width() - ( $name.outerWidth() + $leftLine.width() ) );
}
alignOrdername();

$(function(){
	$(document).on('change', '.js-check', function(){
		var id = $(this).attr('id');
		var fake = $('label[for=' + id + ']').find('i.js-check');
		if($(this).is(':checked')) {
			fake.addClass('checked');
		} else {
			fake.removeClass('checked');
		}
	});

	$(document).on('change', '.js-radio', function(){
		var id = $(this).attr('id');
		var name = $(this).attr('name');
		var fake = $('label[for=' + id + ']').find('i.js-radio');
		if($(this).is(':checked')) {
			$('.js-radio').removeClass('checked');
			fake.addClass('checked');
		}
	});

	$(document).on('input', '.order-inp', function(){
		if($(this).val() != '') {
			$(this).parent().find('.inp-place').addClass('hide');
		} else {
			$(this).parent().find('.inp-place').removeClass('hide');
		}
	});

	$(document).on('click', '.ord-tit-block', function(){
		if($(this).attr('data-block') == 'ord-pay' && !validate()) {
			return false;
		}
		if(!$(this).hasClass('active')) {
			var block = $(this).data('block');
			$('.ord-tit-block.active').removeClass('active');
			$(this).addClass('active');
			$('.ord-body.active').removeClass('active');
			$('.' + block).addClass('active');
		}
		return false;
	});

	$(document).on('click', '.doublep-icon', function(){
		$('.product-in').addClass('scaled');
	});
});

var Pop = (function(){

	var show = function(id) {
		$('[data-id=' + id + ']').addClass('faded').css('z-index', 999);
	};

	var close = function(id) {
		$('.overlay[data-id=' + id + ']').removeClass('faded');
		setTimeout(function(){
			$('.overlay[data-id=' + id + ']').css('z-index', -1);
		}, 500);
	}

	$(document).on('click', '.pop-btn', function(){
		show($(this).data('id'));
		return false;
	});

	$(document).on('click', '.pop-close', function(){
		close($(this).data('id'));
		return false;
	});

	$(document).on('click', '.black-screen', function(){
		close($(this).parent().data('id'));
		return false;
	});

	return { show: show, close: close };
})();

var SelBox = (function(){
	var init = function(doublePlace) {

		$('.select-add .product-item').first().addClass('active');
		$('.select-main .product-item').last().addClass('active');
		$('.orders-li').first().addClass('active');


		var opened = false;
		$(document).on('click touch', '.product-item', function(){
			var that = $(this);
			var block = $(this).parents('.select-block');
			var bIndex = block.index();
			var bWind = block.find('.prd-window');
			if(!opened) {
				block.find('.select-arrow').addClass('act-arr');
				block.find('.prd-inside').removeAttr('style');
				block.addClass('opened');
				bWind.css({
					'height': block.find('.prd-inside').height(),
					'overflow': 'auto',
				});
				$('.select-block').eq(Math.abs(bIndex-1)).addClass('closed');
				block.find('.product-info').addClass('closed');
				opened = true;
			} else {
				block.find('.select-arrow').removeClass('act-arr');
				bWind.animate({ scrollTop: 0 }, 200);
				if(doublePlace) {
					var placeImg = $('.select-main').find('.product-item.active').data('img') + '+' + $('.select-add').find('.product-item.active').data('img');
				} else {
					var placeImg = that.data('img');
				}
				if(!that.hasClass('active')) {
					var info = that.find('.info-toselect').html();
					block.find('.product-info').html(info);
					block.find('.product-item.active').removeClass('active');
					that.addClass('active');
					setTimeout(function(){
						$('.product-in').addClass('prd-changed');
						setTimeout(function(){
							block.find('.product-info').removeClass('closed');
							$('.prd-changed').remove();
							$('.product').html('<div class="product-in prd-changed" style="background-image: url(img/products/' + placeImg + '.png)"></div>');
							setTimeout(function(){
								$('.product-in').removeClass('prd-changed');
							}, 100);
						}, 500);
					}, 500);
				}
				if(block.hasClass('select-main')) {
					var trans = -(that.index()-that.length-1)*that.outerHeight()
				} else {
					var trans = -that.index()*that.outerHeight()
				}
				block.find('.prd-inside').attr('style', '-webkit-transform: translateY(' + trans + 'px); transform: translateY(' + trans + 'px)');
				block.removeClass('opened');
				bWind.removeAttr('style');
				$('.select-block.closed').removeClass('closed');
				opened = false;
			}
			return false;
		});
	};

	return {init: init};
		
})();



//Работа с корзиной
var Cart = (function() {

	var cart = {

		//Удаление одной корзины
		delete: function() {

		},

		//Добавление одной корзины
		add: function() {
			var obj = this;
			$.ajax({
				url: 'ajax.php?act=cart_add',
				data: null,
				type: 'POST'

			}).fail(function(data){
				alert('Ошибка, Информация в консоле');
				console.log(data);

			}).done(function(data){
				var lastId = parseInt($('.orders-li').last().attr('data-id')) + 1;
				$('.orders-ul').append('<dt class="orders-li" data-name="" data-id="' + lastId + '"><div class="name"><div class="left-line"></div><input class="name-input" type="text" placeholder="Ваше имя"></div><div class="right-line"></div><dl class="order-prods"></dl></dt><dd class="orders-price"><span>0</span> руб</dd>');
				$('.cart-names').append('<a href="#" class="cart-name active" data-id="' + lastId + '"><input type="text" placeholder="Ваше имя" class="cname-input"></a>');
				$('.orders-win').animate({ scrollTop : $('.orders-li').innerHeight()*$('.orders-li').length });
				obj.Click($('.orders-li').last());
				setTimeout( function(){ alignOrdername(); }, 1);
				alignOrdername();
			});
		},

		Click: function(block) {
			$('.orders-li.active').removeClass('active');
			block.addClass('active');
			$('.cart-name.active').removeClass('active');
			$('.cart-name[data-id=' + $('.orders-li.active').attr('data-id') + ']').addClass('active');
		}

	}

	var item = {

		//Удаление товара из корзины
		delete: function(item) {
			$.ajax({
				url: 'ajax.php?act=item_delete',
				data: null,
				type: 'POST'

			}).fail(function(data){
				alert('Ошибка, Информация в консоле');
				console.log(data);

			}).done(function(data){
				var resp = JSON.parse(data);
				item.parents('.orders-li').next().find('span').text(resp['price']);
				item.next().fadeOut();
				item.fadeOut(function(){
					if(!item.parents('.orders-li').find('.one-item').is(':visible') && item.parents('.orders-li').attr('data-id') != 1)
					{
						item.parents('.orders-li').next().remove();
						item.parents('.orders-li').remove();
						cart.Click($('.orders-li').last());
					}
				});
				$('.final-price').text(resp['final_price']);
			});
		},

		//Добавление товара в корзину 
		add: function() {
			var cartId = $('.cart-name.active').attr('data-id');
			var cartBlock = $('.orders-li[data-id=' + cartId + ']');
			$.ajax({
				url: 'ajax.php?act=item_add',
				data: null,
				type: 'POST'

			}).fail(function(data){
				alert('Ошибка, Информация в консоли');
				console.log(data);

			}).done(function(data){
				var resp = JSON.parse(data);
				cartBlock.find('.order-prods').append('<dt class="one-item" data-id="1">' + resp['product'] + '<div class="prods-cross"></div></dt><dd>' + resp['product_price'] + ' руб</dd>');
				cartBlock.next().find('span').text(resp['price']);
				$('.final-price').text(resp['final_price']);
			});
		},
		mobileAdd: function() {
			//Check mobile version
			var $buyBlock = $('.buy-block');
			var $ordersUl = $('.orders-ul');

			if( $('.autoselect').not(':visible') ) {
				console.log('mobile');
				$buyBlock.addClass('orders-active');
				$ordersUl.addClass('orders-active');
			}
			else {
				return;
			}
		}

	};

	var init = function() {
		$(document).on('input', '.name-input', function(){
			var cBlock = $(this).parents('.orders-li');
			cBlock.attr('data-name', $(this).val());
			$('.cart-name[data-id=' + cBlock.attr('data-id') + '] .cname-input').val($(this).val());
		});
		$(document).on('input', '.cname-input', function(){
			var cBlock = $(this).parents('.cart-name');
			cBlock.attr('data-name', $(this).val());
			$('.orders-li[data-id=' + cBlock.attr('data-id') + '] .name-input').val($(this).val());
		});
		$(document).on('click touch', '.prods-cross', function(){
			var cItem = $(this).parents('.one-item');
			item.delete(cItem);
			return false;
		});
		$(document).on('click touch', '.buy-block .add-to-cart', function(){
			item.add();
			item.mobileAdd();
			return false;
		});
		$(document).on('click touch', 'aside .add-to-cart', function(){
			cart.add();
			return false;
		});
		$(document).on('click touch', '.orders-li', function(){
			cart.Click($(this));
			return false;
		});
	};

	return { init: init };
})();

var validate = function() {
	$('.inp-req').each(function(){
		if($(this).find('input').val().length == 0) {
			$(this).addClass('inp-red');
		}
	});
	var policy = $('input[name=policy]').is(':checked');
	if(!policy) {
		$('label[for=policy]').addClass('text-error');
	}
	if($('.inp-req').hasClass('inp-red') || !policy) {
		return false;
	} else {
		return true;
	}
};

var Order = (function(){
	$(document).on('focusout', '.validate .inp-req input', function(){
		if($(this).val().length == 0)
		{
			$(this).parent().addClass('inp-red');
		}
	});
	$(document).on('focus', '.validate .inp-req input', function(){
		$(this).parent().removeClass('inp-red');
	});
	$(document).on('click', 'label[for=policy]', function(){
		if(!$(this).next().is(':checked')) {
			$(this).removeClass('text-error');
		}
	});
	$(document).on('click', '.ord-next', function(){
		if(!validate()) return false;
		var toblock = $(this).attr('data-block');
		$('.ord-tit-block.active').removeClass('active');
		$('.ord-tit-block[data-block=' + toblock + ']').addClass('active');
		$('.ord-body.active').removeClass('active');
		$('.' + toblock).addClass('active');
		return false;
	});
})();

var Mobile = (function(){
	$(document).on('click touchstart', '.mobile-switch', function(){
		if($('.mobile-order-view')[0]) {
			$('.mobile-ordername').find('span').fadeIn( 400 );
		}
		$('body').toggleClass('mobile-order-view');
		if($('.orders-active')[0]) {
			$('.orders-active').removeClass('orders-active');
		}
	});
	$(document).on('click touchstart', '.mobile-ordername', function(){
		if($('.orders-active')[0]) {
			$('body').toggleClass('mobile-order-view');
			$('.orders-active').removeClass('orders-active');
			$(this).find('span').hide();
		}
	});
})();

var Tips = (function(){
	var doTimer = function(i, elem, time) {
		setTimeout( function(){ elem.addClass('active animated bounceIn'); }, time);

	};
	var show = function() {
		var $tipsArr = $('.tip');
		var time = 100;

		for (var i = 1; i <= $tipsArr.length; i++) {
			doTimer(i, $('.tip-' + i), time);
			time += 1200;
			if( i == 8 ) {
				setTimeout( function(){ $('.animated.bounceIn').removeClass('animated bounceIn'); }, time);
			}
		}
	};
	var hide = function() {
		var $tipsArr = $('.tip');
		$tipsArr.removeClass('active');
	};
	return { show: show, hide: hide};
})();

var Scroll = (function(){
	var amount = 10;

	$('.orders-win').on('scroll', function(){
		var sPerc = 100 * $(this).scrollTop()/($(this).find('.orders-ul').outerHeight() - $(this).outerHeight());
		var number = 0;
		var min = 150;
		var nArr = [];
		for(var i = 0; i < amount; i++) {
			var away = Math.abs(~~(sPerc - i*100/amount));
			if(away < min) {
				min = away;
				number = i;
			}
		}
		console.log(number);

		$('.ord-scroll-dot').removeClass('active').removeClass('b-active').removeClass('bb-active');
		if(number !=0 ) {
			$('.ord-scroll-dot').eq(number-2).addClass('bb-active');
			$('.ord-scroll-dot').eq(number-1).addClass('b-active');
		}
		$('.ord-scroll-dot').eq(number).addClass('active');
		$('.ord-scroll-dot').eq(number+1).addClass('b-active');
		$('.ord-scroll-dot').eq(number+1).addClass('bb-active');
	});

	var init = function() {
		
		for(var i = 0; i < amount; i++) {
			$('<div class="ord-scroll-dot"></div>').appendTo('.ord-scroll')/*.css('top', i*80/amount + '%')*/;
		}
	}

	return { init: init }
})();

Scroll.init();

Cart.init();