# Auth_Backend_API
This is a backend API built with Express.js that provides authentication functionality for your application. It allows users to register, login, and access protected routes.

# Features
• User Registration: Users can create an account by providing their email and password. Passwords are securely hashed before being stored in the database.

• User Login: Registered users can log in using their email and password. The API generates a JSON Web Token (JWT) upon successful authentication, which can be used for subsequent authorized requests.

• Protected Routes: Certain routes require authentication. Users must include the JWT token in the request headers to access these protected routes.

• Authorization Middleware: The API includes middleware that verifies the JWT token and grants access to protected routes only for authenticated users.

• Error Handling: The API handles various error scenarios and returns appropriate error messages and status codes.

• MongoDB Integration: The API uses MongoDB as the database to store user information.

# Getting Started
To run the backend API locally, follow these steps:

1. Clone the repository: `git clone [repository URL]`
2. Install dependencies: `npm install`
3. Configure the MongoDB connection & PORT in the `.env` file.
4. Start the server: `npm start` \
&emsp; &emsp;&emsp; OR
4. Start the nodemon server: `npm run dev`

# Technologies Used
• Express.js: Fast, unopinionated web framework for Node.js \
• MongoDB: NoSQL database for storing user information \
• JSON Web Tokens (JWT): Used for authentication and authorization \
• bcrypt.js: Library for hashing and salting passwords securely \
