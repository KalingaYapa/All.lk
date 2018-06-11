<?php

namespace app\models;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;
use yii\web\IdentityInterface;
use yii\db\ActiveRecord;

class User extends ActiveRecord implements IdentityInterface
{

    const SCENARIO_CREATE = 'create';


    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['firstname'], 'string', 'max' => 45],
            [['lastname'], 'string', 'max' => 45],
            [['address'], 'string', 'max' => 45],
            [['email'], 'string', 'max' => 45],
            [['password'], 'string', 'max' => 45]
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'firstname' => 'Firstname',
            'lastname' => 'Lastname',
            'address' => 'Address',
            'email'=>'Email',
            'password'=>'Password'
        ];
    }

    public function fields()
    {
        $fields = parent::fields();

        // remove fields that contain sensitive information
        unset($fields['auth_key'], $fields['password_hash'], $fields['password_reset_token'], $fields['access_token']);

        return $fields;
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios['create'] = ['firstname','lastname','address','password','email','access_token'];
        return $scenarios;
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => CompositeAuth::className(),
            'authMethods' => [
                HttpBasicAuth::className(),
                HttpBearerAuth::className(),
                QueryParamAuth::className(),
            ],
        ];
        return $behaviors;
    }

    public static function findIdentity($id)
      {
          return static::findOne($id);
     }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    public function getId()
      {
          return $this->id;
      }

    public function getAuthKey()
      {
          return $this->authKey;
      }

    public function validateAuthKey($authKey)
      {
          return $this->authKey === $authKey;
      }

}
