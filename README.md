# Notable

This project contains a Note taking app, written in typescript and built with the MERN stack.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- a user can sign up
- a user can log in
- a user can create a note
- a user can edit notes
- a user can delete notes

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ankitshukla20/notable.git
   ```
2. Navigate to the project directory:
   ```bash
   cd notable/
   ```
3. Install dependencies for the backend:
   ```bash
   cd backend/
   npm install
   ```
4. Install dependencies for the frontend:
   ```bash
   cd ../frontend/
   npm install
   ```

### Configuration

1.  Set up a MongoDB database.
2.  Configure the backend:

    - Create a `.env` file in the `backend` directory.
    - Add these 3 env variable
      - MONGO_CONNECTION_STRING=mongodb+srv://username:password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority
      - PORT=3000
      - SESSION_SECRET=your-secret

## Usage

1. Start the MongoDB server.
2. Start the backend server.
   ```bash
   cd backend/
   npm run dev
   ```
3. Start the frontend development server
   ```bash
   cd ../frontend/
   npm run dev
   ```

## Technologies Used

- Frontend: React, TypeScript, Bootstrap
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Authentication: Express sessions
