<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
    @inertiaHead
    <title>Popechati</title>
</head>
<body >
    @inertia
</body>
</html>
