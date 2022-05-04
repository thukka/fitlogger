# Backend for fitlogger

## src/models (Mongo models)

- Entry schema.
  - User, string, required.
  - Date, string, required.
  - Distance, number, required.
  - Difficulty, number, not required.
- Returned object is transformed: __v is deleted and _id is renamed as id.

- User schema
  - Name, string, min length 3, required, unique.
  - Password hash, string.
  - Email, string, required.
  - Unique validator plugin is used.
  - Returned object is transformed: __v is deleted and _id is renamed as id. Password hash is deleted.

## src/routes

- Entry router.
  - Validate token on all actions. If token is incorrect, expired or missing return 401.
  - POST a new entry.
  - GET user entries.
  - DELETE specific entry.

- Login router.
  - Validate login via POST.
  - Sign token, expires in 1 hour.
  - Return object with token, username and name.

- Testing router.
  - Used only if NODE_ENV = test.
  - DELETE for removing all users and entries from the testing database.

- Users router.
  - GET users and return their toJSON objects.
  - POST a new user. Password hash is generated with bcrypt.
  - PUT for resetting user password.

## src/utils

- parseEntry used in validating incoming request body fields.
- parseNewUser used in validating incoming request body fields.
- parseString checks if passed prop is of type string.
- verifyToken used in getting the decoded token. 

## tests

- Tests for entry, login , users api.
- Entry:
  - Entry successfully deleted.
  - Entry successfully added.
  - Error 400 if a field is missing. 
  - Error 401 if token is incorrect.
- Login:
  - User can log in.
  - Error 401 if wrong credentials are used.
- Users:
  - New user is successfully created.
  - Password is successfully changed.

## app.ts
- Connect to the mongodb.
- Morgan middleware is used.
- Express json and static build are used.
- Routers are initiated. Checking if NODE_ENV is test.

## index.ts
- Check port and start the server.