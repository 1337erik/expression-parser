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

## Understanding the Code - Client-Side

The approach taken for this first pass is a "two-stack" approach for parsing equations. First, before diving into the algorithm, I'll explain the layout of the different classes.

The parsing is done client-side in javascript, I put a big emphasis on "separation of concerns" as the vue templates exist strictly for displaying the data given to them ( true "views" ).
The relevant vue components are:
- The "Solver" which hosts the input to "create new" as well as displays the list of existing equations.
- The "Equation" component which takes an equation as a prop, displays its expression as a list of its tokens and then exposes a few buttons for editing/deleting it
- The "Token" component, which at the moment is very thin, simply jsut displays a token with its relevant classes

The Business logic is separated into 4 main files:
- The Vuex Store "equation-solver.js" which is concerned with the persistence of the data. No more passing props around there is a centralized store which holds all of the data relevant to parsing and understanding the list of equations.
- The Vue Mixin "EquationManager.js" which is the service-layer for the equation components, abstracting out the access to the vuex store and providing some base-level interactions with the api
- The "EquationModel" class which primarily hosts the algorithm for determining the equations value
- The "TokenModel" class which is very thin at the moment and stands to gain the most improvement as the project develops. Much more responsibility will be given to this class as the foundation has been set and it will be clearer how to abstract such responsibility out of the rest of the application into this model class ( such as determining one's own validity and establishing a grammar for the parser )

The class-based approach for this program helps a lot with separating the concerns and thus making the code much more maintainable and expandable. This level of separation makes it apparent where refactoring can be made, and I've set the stage to start supporting new operators such as the "^" for exponents and both parenthesis.

## Understanding the Code - Server-Side


In PHP land we have a very rudimentary and simple API that exists really for persistence and simple CRUD operations on the "equation" model. Here we have a resource controller, an "EquationManager" for hosting the abstracted CRUD functionalities and a test class for said manager. Ideally I would have a few other utility classes for standardizing the json responses and abstracting the common CRUD code into traits that every manager class would be using,
but for this project that would be dramatic. Also, I did not utilize the policy class because that again would be overkill for this - as there are no other users other than the main seeded user and he/she is allowed to do everything. The policy would be helpful in extending the functionality of the app to prevent/allow users to perform certain actions