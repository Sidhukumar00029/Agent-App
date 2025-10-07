MERN Stack Agent & List Management App

A full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. This application allows an admin user to manage a team of agents by creating agent accounts and distributing tasks to them by uploading a CSV file.



---

## ## Tech Stack

- **Frontend:** React.js, Vite, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **File Handling:** Multer, csv-parser

---

## ## Features

- ✅ Secure Admin login with JWT authentication.
- ✅ Admin dashboard for managing application features.
- ✅ Functionality for an Admin to create new Agent accounts.
- ✅ CSV file upload to create a list of tasks.
- ✅ Automatic and equal distribution of uploaded tasks among available agents.
- ✅ Real-time display of agents and their assigned tasks on the dashboard.

---

## ## Setup and Installation

To get a local copy up and running, follow these simple steps.

### ### Prerequisites

You must have the following installed on your machine:
- Node.js (v18 or later)
- npm (Node Package Manager)
- MongoDB (a local installation or a cloud instance from MongoDB Atlas)

### ### Installation Steps

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/Sidhukumar00029/Agent-App]
    cd Agent-App
    ```

2.  **Set up Backend**
    ```sh
    # Navigate to the backend folder
    cd backend

    # Install dependencies
    npm install

    # Create a .env file and add your variables
    ```
    Create a file named `.env` in the `backend` folder and add the following configuration:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_and_long_key
    ```

3.  **Set up Frontend**
    ```sh
    # Navigate to the frontend folder from the root
    cd frontend

    # Install dependencies
    npm install
    ```

### ### Running the Application

You can run both servers with a single command from the **root** directory.
```sh
npm run dev
