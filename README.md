<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

## Expression Parser

This is a Laravel 8 project with Vue 3 and Laravel's front-end scaffolding package called Jetstream. In order to run this application, you have a few options:

- [Serve locally with Laravel Valet](https://laravel.com/docs/8.x/valet).
- [Serve locally with Laravel Homestead (Vagrant)](https://laravel.com/docs/8.x/homestead).
- [Serve Locally with Laravel Sail (Docker)](https://laravel.com/docs/8.x/sail).

I myself use Homestead for my local setup, but all have their pros/cons.

First, clone the repo and change the .env database connection details to match a local database connection of your own.
Then, make sure all npm and composer packages are installed by running their respective "install" commands.
Once that is all done, run "php artisan migrate:fresh --seed" to seed the database with a test user and two test equations.

## Test User Credentials
- email: testme@aol.com
- password: password

## Interacting With The Parser

Created based upon the following rules:
- The equations will only ever contain addition or subtraction. Multiplication, division, and any other 
    operators should return null or error. 
- The equations will only ever reference variables from preceding lines in the same payload.
- Input spacing may be inconsistent

You simply add an equation in the input on the bottom of the equations list. Once you press enter, or click the save-button, you will have added a new equation to the database.
Afterwards, you can edit and/or delete the equation by using the commands on screen.

You will notice that there is real-time updating when you are editing an existing expression, that is due to the nature of vue and vuex's reactivity - and also the fact that the
processing for the functions is being done client-side in vue as opposed to server-side in laravel. This is on purpose because I feel as if the business logic for calculating
the expression's values is more appropriately placed client-side, using the server for simple persistence and user-authentication.