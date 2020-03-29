<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    const ROLE_USER = 3;
    const ROLE_MANAGER = 1;
    const ROLE_ADMIN = 2;

    const ROLES = [self::ROLE_USER => 'USER', self::ROLE_MANAGER => 'MANAGER', self::ROLE_ADMIN => 'ADMIN'];

    protected $fillable = [
        'name', 'email', 'password', 'role',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
