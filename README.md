# Mordomo Digital API

API of the Mordomo Digital app developed with Node and Express with Mongo as database.

- [Running the project](#running-the-project)
  - [Prerequisites](#prerequisites)
  - [Instalation](#instalation)
  - [Environment variables](#environment-variables)
  - [Start](#start)
- [Project structure](#project-structure)
  - [/controllers](#controllers)
  - [/middleware](#middleware)
  - [/models](#models)
  - [/routes](#routes)
  - [/temp_files](#temp_files)
  - [/node_modules](#node_modules)
- [/Endpoints](#endpoints)
  - [/users](#users)
  - [/auth](#auth)
  - [/room-types](#room-types)
  - [/room-tasks](#room-tasks)
  - [/room-market-itens](#room-market-itens)
  - [/rooms](#rooms)
- [Author](#author)

## Running the project

Follow the instructions below to copy the project and run locally.

### Prerequisites

As prerequisites to run the project is needed to have Node.js, the package manager NPM and MongoDB installed in you machine.

### Instalation

Clone the project with the command:

```sh
$ git clone https://github.com/alexisbarros/mordomo-digital-api.git
```

Go to the created folder:

```sh
$ cd mordomo-digital-api
```

Install all dependencies:

```sh
$ npm install
```

### Environment variables

Create a .env file and use the .env-example file to set the enviroment variables.

### Start

Start the project using node command:

```sh
$ node index.js
```

## Project structure

The project is structured as follows:

```
mordmo-digital-api/
  controllers/
  middleware/
  models/
  node_modules/
  routes/
  temp_files/
  .env
  index.js
  package.json
  README.md
```

Below is a breakdown of some project directories.

### /controllers

Contains all controllers files of the project.

### /middleware

Contains all middleware files of the project.

### /models

Contains all models files responsable to create the collections in mongodb.

### /routes

Contains all routes files of the project.

### /temp_files

Contains all the temporary files that will be put in mongodb.

### /node_modules

Contains all the modules installed by NPM.

## Endpoints

### /users

CRUD users.

### /auth

/register signin a user.

/login login a user.

/login-admin login a admin user.

### /room-types

Types of the room CRUD.

### /room-tasks

Tasks in each room type CRUD.

### /room-market-itens

Market itens in each room type CRUD.

### /rooms

Rooms CRUD.

## Author

Alexis Barros - [github](https://github.com/alexisbarros)
