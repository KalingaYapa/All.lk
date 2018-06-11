<?php
/**
 * Created by PhpStorm.
 * User: KalingaY
 * Date: 5/24/2018
 * Time: 10:14 PM
 */

namespace app\controllers;


use yii\rest\ActiveController;
use app\models\Todo;

class TodoController extends ActiveController
{

    public $modelClass = 'app\models\Todo';
}