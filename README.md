# PostIT
Post-It App
This is a web application for creating and managing posts, designed to showcase the use of Node.js, Express, MongoDB, and various other libraries and tools.

Getting Started
To get started with the project, you'll need to do the following:

Clone the repository: git clone https://github.com/Pinocchio009/PostIT.git
Install the dependencies: npm install
Set up the environment variables by creating a .env file and adding the following:
HOST = "localhost" 
MONGO_DB_LOCAL = "mongodb://localhost/27017"
SECRET = "secret"

Start the server: npm start

Authentication
POST /logout - log out from an existing user account
POST /login - log in to an existing user account
Posts
POST /posts - create a new post-it
GET /posts - retrieve all posts
GET /posts/:id - retrieve a single post-it by ID
PUT /posts/:id - update a post-it by ID
DELETE /posts/:id - delete a post-it by ID
comments
POST /posts/:id/comments - create a new reply for a post-it
GET /posts/:id/comments - retrieve all comments
GET /posts/:id/comments/:id - retrieve a single reply by ID
PUT /posts/:id/comments/:id - update a reply by ID
DELETE /comments/:id - delete a reply by ID
Users
Get /users - get all users
Get /users/:id - get single user
Post /users - register new user
Put- /users/:id - update already created user
Delete - /users/:id - delete user
GET /users/@<user-postit-handle> - retrieve a user by handle
GET /users/@<user-postit-handle>/posts - retrieve all posts by user handle
Authentication
The authentication system is based on JSON Web Tokens (JWTs). When a user signs up or logs in, the server generates a JWT that is returned to the client. The client must include this JWT in the Authorization header of all subsequent requests that require authentication.

Validation
The API routes use the Joi library to validate user input. If the input is invalid, the server will return a 400 Bad Request response with an error message describing the validation error.

Authorization
To ensure that users can only modify their own posts and comments, the server checks the JWT included in the Authorization header to determine the user ID of the current user. When creating a new post-it or reply, the user ID is included in the object being saved to the database. When updating or deleting a post-it or reply, the server checks the user ID of the object being modified against the user ID in the JWT, and only allows the modification if they match.

Sorting
When retrieving posts, they are sorted by newest first. That is, newly created posts come first and the old ones last.

Deletion
When a post-it or reply is deleted, it is marked as deleted in the database rather than actually being removed. This allows deleted objects to be filtered out of query results, but still allows the server to maintain a complete history of all objects that were created.

Future Improvements
Some potential improvements that could be made to the application include:

Implementing pagination for retrieving large numbers of posts and comments
Adding more advanced filtering options for posts and comments (e.g. by date range or user)
Allowing users to follow other users and receive notifications when they


