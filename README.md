# RISK

The classic game RISK.

## File structure

 - **web-server** - The backend server for the frontend (`public/`). Contains our API to get highscore, register, login, etc
    - **public** - All HTML/CSS/JS/images files etc. Everything that the user can access.
 - **game-server** - The game, the whole game is executed on the server to prevent cheating
 - **chat-server** - This is our node.js chat server (the chat in the game)

## The Stack
 - Node.js as server for both the game, chat and as http server
 - Angular.js for the website. hemsida.
 - Canvas and TREE.js to create the game
 - MongoDB as database
 - Sass (SCSS)


## Getting started

1. `npm install`
2. `bower install`
4. `grunt` (build everything and launch the webserver)


## Build & development

Run `grunt` for building and `grunt serve` for preview.


## Testing

We don't use TDD in this project since we are only two persons.