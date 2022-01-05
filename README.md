# Exercise REST Server for react application


| Contents
|---
| [Usage and Purpose](#usage)
| [Services](#services)
| - [Authentication](#authentication)
| - [Recipes](#recipes)
| - [Category](#category)


## Usage and Purpose

This is an exercise to build a REST API. To start the server, you can use `npm start` on application terminal. 

## Services 

All `GET` requests do not need an authorization.
For creating a recipe, user must be logged in.
In order to edit and delete recipe, user must be logged in and authorized as owner or admin.
Only admin can create new category.

### Authentication

#### Register

To register user, send `POST` request to `/users/register` with properties: name, email and password. The service automatically creates a session and returns an authorization token and user information as object with properties name, email and _id. Token can be used for requests.

#### Login

Login by sending a POST request with email and password to `/users/login`. The service will respond with an object contains a user info(name, email and _id) and standard string token, that can be used for requests.

#### Logout

This feature is in progress.

#### Authorized Requests

In order to make authorized requests, add the following header `x-authorization` and value token received from login or register.

```
x-authorization: {token}
```

### Recipes

To get all recipes send `GET` request on `/recipes`.

To create a new recipe send `POST` request on `/recipes`.

To get one recipe send `GET` request on `/recipes/:recipeId`.

To delete recipe send `DELETE` request on `/recipes/:recipeId`.

To update recipe send `PUT` request on `/recipes/:recipeId`.

To get all recipes of specific user send `GET` request on `/recipes/user/:userId`. Request must be authenticated.

### Category

To create a new category send `POST` request on `/category`. User must be authorized as admin.

To get all categories send `GET` request on `/category`.

To get all recipes of specific category send `GET` request on `/category/:categoryName`.