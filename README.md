
# Project Title

Assignment Submission Portal
The Assignment Submission Portal is a backend project built using Node.js, Express.js, and MongoDB, designed to facilitate the submission and review of user assignments. This system allows users to upload their assignments to a specific admin, and the admin can then review and either accept or reject the submitted tasks. The portal efficiently tracks the submission status, keeping it updated as 'pending', 'accepted', or 'rejected'.

Key Features:
User Assignment Submission: Users can submit tasks to specific admins.
Admin Review Process: Admins can accept or reject submitted assignments.
Status Tracking: Assignments have a status (pending, accepted, or rejected) that helps monitor the review process.
Data Persistence: All data (users, admins, and assignments) are stored in MongoDB for easy retrieval and management.
Tech Stack:
Node.js: Server-side JavaScript runtime.
Express.js: Fast and minimalist web framework for Node.js.
MongoDB: NoSQL database used to store assignments, users, and admin data.
This system is ideal for educational platforms, training institutions, or workplaces that need to track and manage assignment submissions and reviews.
## Key features
 • User Assignment Submission: Users can submit tasks to specific admins.

 • Admin Review Process: Admins can accept or reject submitted assignments.

 • Status Tracking: Assignments have a status (pending, accepted, or rejected) that helps monitor the review process.

 • Data Persistence: All data (users, admins, and      assignments) are stored in MongoDB for easy retrieval  and management.
## Tech Stack
• Node.js: Server-side JavaScript runtime.

• Express.js: Fast and minimalist web framework for Node.js.

• MongoDB: NoSQL database used to store assignments, users, and admin data.


## Installation

### Prerequisites


Before you begin, ensure you have the following installed on your machine:

• Node.js (v14 or later)
• MongoDB (local installation or MongoDB Atlas for cloud)
• NPM (comes with Node.js) or Yarn (optional)

### Installation Steps
Clone the Repository Start by cloning the project repository from GitHub to your local machine:

```bash
Copy code
git clone https://github.com/abhinav4450/Assignment-Project.git
cd assignment-Project
```
Install Dependencies Navigate to the project directory and install the required Node.js packages using NPM:

```bash
npm install
```
Set Up Environment Variables Create a .env file in the root of the project to configure your environment variables. Here’s an example of the variables you might include:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=8080
```
Replace your_mongodb_connection_string with the connection string for your MongoDB database.

Start MongoDB If you're running MongoDB locally, ensure the MongoDB server is running. You can start it with:

```bash
mongod
```
If using MongoDB Atlas, make sure your cluster is up and accessible.

Run the Application With everything set up, you can now run the server:

```bash
npm start
```
By default, the server will be running at http://localhost:8080.

Testing the APIs You can use tools like Postman.

    
## API Reference
### User
• Create a New User:
  POST /user/register
  ```bash
  {
  "data":{
  "email": "testuser@example.com",
  "name": "Test User",
  "password": "Abhinav@1"
  }
  }
  ```
  • User Login:
  POST /user/login
  ```bash
  {
  "email": "testuser@example.com",
  "password": "Abhinav@1"
  }
  ```
  • Upload Assignment:
  POST /user/upload
  ```bash
  {
  "user_name": "Test User",
  "task": "project submission",
  "admin_name":"Abhinav"
  }
  ```
• Get all Admins:
  POST /user/all-admins
  ```bash
  ```

### Admin
• Create a New Admin:
  POST /admin/register
  ```bash
  {
  "data":{
  "email": "testadmin@example.com",
  "name": "Test",
  "password": "Abhinav@1"
  }
  }
  ```
  • Admin Login:
  POST /admin/login
  ```bash
  {
  "email": "testadmin@example.com",
  "password": "Abhinav@1"
  }
  ```
  • Get all Assignment for admin:
  GET /admin/assignments/:admin_name

  • Accept Assignment:
  PUT/admin/assignments/:id/accept

  • Reject Assignment:
  PUT/admin/assignments/:id/reject


