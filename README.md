# Node.js Express MySQL API with JWT Authentication

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
######Optional: 
4. Run `npm test` to run the tests to check the functionality of the API

## How to use
1. Register a new user
2. Login with the new user
3. Use the token to access the protected route

## Endpoints
Users
- `POST api/users/register` - Register a new user
- `POST api/users/login` - Login with the new user
- `GET api/users/email` - Get a user by email
- `DELETE api/:id` - Delete a user by id

Authors
- `POST api/authors` - Create a new author
- `GET api/authors` - Get all authors
- `GET api/authors/email` - Get an author by email
- `GET api/authors/:id` - Get an author by id
- `PUT api/authors/:id` - Update an author by id
- `DELETE api/authors/:id` - Delete an author by id
- `DELETE api/authors` - Delete all authors

Teachers
- `POST api/teachers` - Create a new teacher
- `GET api/teachers` - Get all teachers
- `GET api/teachers/email` - Get a teacher by email
- `GET api/teachers/:id` - Get a teacher by id
- `PUT api/teachers/:id` - Update a teacher by id
- `DELETE api/teachers/:id` - Delete a teacher by id
- `DELETE api/teachers` - Delete all teachers

Students
- `POST api/students` - Create a new student
- `GET api/students` - Get all students
- `GET api/students/email` - Get a student by email
- `GET api/students/:id` - Get a student by id
- `PUT api/students/:id` - Update a student by id
- `DELETE api/students/:id` - Delete a student by id
- `DELETE api/students` - Delete all students

Tutorials
- `POST api/tutorials` - Create a new tutorial
- `GET api/tutorials` - Get all tutorials
- `GET api/tutorials/published` - Get all published tutorials
- `GET api/tutorials/filter` - Get all tutorials by filter
- `GET api/tutorials/:id` - Get a tutorial by id
- `PUT api/tutorials/:id` - Update a tutorial by id
- `DELETE api/tutorials/:id` - Delete a tutorial by id
- `DELETE api/tutorials` - Delete all tutorials

Classes
- `POST api/classes` - Create a new class
- `POST api/classes/students` - Add students to a class
- `POST api/classes/tutorials` - Add tutorials to a class
- `GET api/classes` - Get all classes
- `GET api/classes/count/:id` - Get the number of students and tutorials in a class
- `GET api/classes/:id` - Get a class by id
- `PUT api/classes/teachers` - Update the teacher of a class
- `PUT api/classes/:id` - Update a class by id
- `DELETE api/classes/:id` - Delete a class by id
- `DELETE api/classes/students` - Delete all students from a class
- `DELETE api/classes/tutorials` - Delete all tutorials from a class

## Database
Local MySQL database was used to develop this API. For CI/CD, hosted MySQL database was used. The database script can be found in the `db.sql` file in the root directory.
