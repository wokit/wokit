<?php

//Возвращаем тестовые данные
switch ($_GET['act']) {
	
	case 'item_delete':
		echo 	'{ 
				"price": 300,
				"final_price": 300
				}';
		break;
	
	case 'item_add':
		echo 	'{ 
				"price": 800,
				"product": "Вермешель",
				"product_price": 200,
				"final_price": 900
				}';
		break;


	case 'cart_delete':
		echo 	'{ 
				"price": 300,
				"final_price": 300
				}';
		break;
	
	case 'cart_add':
		echo 	'{ 
				"price": 800,
				"product": "Вермешель",
				"product_price": 200,
				"final_price": 900
				}';
		break;
}