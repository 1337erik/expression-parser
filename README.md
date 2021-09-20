<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

## Expression Parser

This is a Laravel 8 project with Vue 3 and Laravel's front-end scaffolding package called Jetstream. In order to run this application, you have a few options:

- [Serve locally with Laravel Valet](https://laravel.com/docs/8.x/valet).
- [Serve locally with Laravel Homestead (Vagrant)](https://laravel.com/docs/8.x/homestead).
- [Serve Locally with Laravel Sail (Docker)](https://laravel.com/docs/8.x/sail).

I myself use Homestead for my local setup, but all have their pros/cons.

First, close the repo and change the .env database connection details to match a local database connection of your own. Then, make sure all npm and composer packages are installed.
One you are ready, run "php artisan migrate:fresh --seed" to seed the databse with a test user.

The Test User credentials are:
email: testme@aol.com
password: password

## Interacting With The Parser

Created based upon the following rules:
- The equations will only ever contain addition or subtraction. Multiplication, division, and any other 
    operators should return null or error. 
- The equations will only ever reference variables from preceding lines in the same payload.
- Input spacing may be inconsistent

You simply add an equation in the input on the bottom of the equations list. Once you press enter, or click the save-button, you will have added a new equation to the database.
Afterwards, you can edit and/or delete the equation by using the commands on screen.