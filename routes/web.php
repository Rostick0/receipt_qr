<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::view('/', 'pages.index', [
    'options_operation_type' => [
        [
            'value' => 1,
            'name' => 'Приход'
        ],
        [
            'value' => 2,
            'name' => 'Возврат прихода'
        ],
        [
            'value' => 3,
            'name' => 'Расход'
        ],
        [
            'value' => 4,
            'name' => 'Возврат расход'
        ],
    ]
]);

Route::view('/welcome', 'pages.welcome');
