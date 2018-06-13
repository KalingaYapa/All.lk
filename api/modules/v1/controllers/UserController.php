<?php
/**
 * Created by PhpStorm.
 * User: KalingaY
 * Date: 5/25/2018
 * Time: 12:19 AM
 */

namespace app\modules\v1\controllers;


use app\models\User;
use yii\rest\ActiveController;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\AccessControl;
use yii\web\HttpException;
use yii\helpers\Url;
use app\models\UserSearch;
use app\models\LoginForm;
use app\models\SignupForm;
use yii\web\BadRequestHttpException;
use yii\data\ActiveDataProvider;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;
use Yii;

class UserController extends ActiveController
{
    public $modelClass = 'app\models\User';

    public function actions()
    {
        return [];
    }

    public function behaviors()
    {

        $behaviors = parent::behaviors();

        $behaviors['authenticator'] = [
            'class' => CompositeAuth::className(),
            'authMethods' => [
                HttpBearerAuth::className(),
            ],

        ];

        $behaviors['verbs'] = [
            'class' => \yii\filters\VerbFilter::className(),
            'actions' => [
                'index' => ['get'],
                'view' => ['get'],
                'create' => ['post'],
                'update' => ['put'],
                'delete' => ['delete'],
                'login' => ['post'],
                'me' => ['get', 'post'],

            ],
        ];

        // remove authentication filter
        $auth = $behaviors['authenticator'];
        unset($behaviors['authenticator']);

        // add CORS filter
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
            ],
        ];

        // re-add authentication filter
        $behaviors['authenticator'] = $auth;
        // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
        $behaviors['authenticator']['except'] = [
            'options',
            'login',
            'signup',
            'confirm',
            'password-reset-request',
            'password-reset-token-verification',
            'password-reset'
        ];

        // setup access
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['index', 'view', 'create', 'update', 'delete'], //only be applied to
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['index', 'view', 'create', 'update', 'delete'],
                    'roles' => ['admin', 'manageUsers'],
                ],
                [
                    'allow' => true,
                    'actions' => ['me'],
                    'roles' => ['user']
                ]
            ],
        ];

        return $behaviors;
    }

    public function actionCreate()
    {
        $model = new User();
        $model->load(\Yii::$app->getRequest()->getBodyParams(), '');

        if ($model->validate() && $model->save()) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = implode(',', array_values($model->getPrimaryKey(true)));
            $response->getHeaders()->set('Location', Url::toRoute([$id], true));
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errors));
        }

        return $model;
    }

    /**
     * List users
     *
     * @return ActiveDataProvider
     * @throws BadRequestHttpException
     */
    public function actionIndex()
    {
        $search = new UserSearch();
        $search->load(\Yii::$app->request->get());
        $search->in_roles = [User::ROLE_USER];
        $search->not_in_status = [User::STATUS_DELETED];
        if (!$search->validate()) {
            throw new BadRequestHttpException('Invalid parameters: '.json_encode($search->getErrors()));
        }

        return $search->getDataProvider();
    }

    /**
     * Update user
     *
     * @param $id
     * @return array|null|\yii\db\ActiveRecord
     * @throws HttpException
     * @throws NotFoundHttpException
     * @throws \yii\base\InvalidConfigException
     */
    public function actionUpdate($id)
    {
        $model = $this->actionView($id);

        $model->load(\Yii::$app->getRequest()->getBodyParams(), '');

        if ($model->validate() && $model->save()) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(200);
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errors));
        }

        return $model;
    }

    /**
     * View user
     *
     * @param $id
     * @return array|null|\yii\db\ActiveRecord
     * @throws NotFoundHttpException
     */
    public function actionView($id)
    {
        $staff = User::find()->where([
            'id' => $id
        ])->andWhere([
            '!=',
            'status',
            -1
        ])->andWhere([
            'role' => User::ROLE_USER
        ])->one();

        if ($staff) {
            return $staff;
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }

    /**
     * Delete user
     *
     * @param $id
     * @return string
     * @throws NotFoundHttpException
     * @throws ServerErrorHttpException
     */
    public function actionDelete($id)
    {
        $model = $this->actionView($id);

        $model->status = User::STATUS_DELETED;

        if ($model->save(false) === false) {
            throw new ServerErrorHttpException('Failed to delete the object for unknown reason.');
        }

        $response = \Yii::$app->getResponse();
        $response->setStatusCode(204);
        return "ok";
    }


    /**
     * Process login
     *
     * @return array
     * @throws HttpException
     */
    public function actionLogin()
    {
        $model = new LoginForm();
        $model->roles = [
            User::ROLE_USER,
        ];
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            $user = $model->getUser();
            $user->generateAccessTokenAfterUpdatingClientInfo(true);

            $response = \Yii::$app->getResponse();
            $response->setStatusCode(200);
            $id = implode(',', array_values($user->getPrimaryKey(true)));

            $responseData = [
                'id' => (int)$id,
                'access_token' => $user->access_token,
            ];

            return $responseData;
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errors));
        }
    }

    /**
     * Process user sign-up
     * @return string
     * @throws HttpException
     */
    public function actionSignup()
    {
        $model = new SignupForm();

        $model->load(Yii::$app->request->post());

        if ($model->validate() && $model->signup()) {
            // Send confirmation email
            $model->sendConfirmationEmail();

            $response = \Yii::$app->getResponse();
            $response->setStatusCode(201);
            $responseData = [
                'status' => 200,
                'success' => true,
                'data' => 'registered successfully '
            ];
            return $responseData;
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errors));
        }
    }

    public function actionTest()
    {
        $response = \Yii::$app->getResponse();
        $response->setStatusCode(200);
        $responseData = "true";
        return $responseData;
    }

    /**
     * Handle OPTIONS
     *
     * @param null $id
     * @return string
     */
    public function actionOptions($id = null)
    {
        return "ok";
    }

}