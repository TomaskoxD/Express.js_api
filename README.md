## Used technologies
- Express.js
- MySQL
- Node.js
- JsonWebToken
- Bcrypt

## How to run
1. Clone the repository
2. Run `npm install`
3. Run `npm start`

## How to use
1. Register a new user
2. Login with the new user
3. Use the token to access the protected route

## Endpoints
Users
- `POST api/users/register` - Register a new user
- `POST api/users/login` - Login with the new user

Authors
- `POST api/authors` - Create a new author
- `GET api/authors` - Get all authors
- `GET api/authors/:id` - Get an author by id
- `PUT api/authors/:id` - Update an author by id
- `DELETE api/authors/:id` - Delete an author by id
- `DELETE api/authors` - Delete all authors

Teachers
- `POST api/teachers` - Create a new teacher
- `GET api/teachers` - Get all teachers
- `GET api/teachers/:id` - Get a teacher by id
- `PUT api/teachers/:id` - Update a teacher by id
- `DELETE api/teachers/:id` - Delete a teacher by id
- `DELETE api/teachers` - Delete all teachers

Tutorials
- `POST api/tutorials` - Create a new tutorial
- `GET api/tutorials` - Get all tutorials
- `GET api/tutorials/:id` - Get a tutorial by id
- `PUT api/tutorials/:id` - Update a tutorial by id
- `DELETE api/tutorials/:id` - Delete a tutorial by id
- `DELETE api/tutorials` - Delete all tutorials

## Database
Local MySQL database is used. The database is named `nodejs_express_mysql` and the tables are named `authors`, `teachers` and `tutorials`. The database can be created with the script `db.sql` in the root folder.