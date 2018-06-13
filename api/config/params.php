<?php

$paginationParams = [
    'pageParam',
    'pageSizeParam',
    'params',
    'totalCount',
    'defaultPageSize',
    'pageSizeLimit'
];

return [
    'frontendURL' => 'http://localhost/frontend/',
    'supportEmail' => 'kkyapa@gmail.com',
    'adminEmail' => 'admin@example.com',
    'jwtSecretCode' => 'someSecretKey',
    'user.passwordResetTokenExpire' => 3600,
    'paginationParams' => $paginationParams,
];
