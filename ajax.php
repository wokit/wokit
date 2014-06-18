<?php

//Возвращаем тестовые данные
switch ($_GET['act']) {
	
	case 'item_delete':
		/*
			cart_price - итого корзины из которой удаляют товар
			final_price - общая сумма всех корзин
		*/
		echo 	'{ 
				"cart_price": 300,
				"final_price": 300
				}';
		break;
	
	case 'item_add':
		/*
			cart_price - итого корзины в которую добавляют товар
			product_price - стоимость товара добавляемого в корзину
			final_price - общая сумма всех корзин
		*/
		echo 	'{ 
				"cart_price": 800,
				"product_price": 200,
				"final_price": 900
				}';
		break;


	case 'cart_delete':
		/*
			final_price - общая сумма всех корзин
		*/
		echo 	'{ 
				"final_price": 300
				}';
		break;
	
	case 'cart_add':
		echo 	'{}';
		break;
}