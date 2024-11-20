# Event Management Platform - Backend

## Overview

This is the backend part of the Event Management Platform built using **Node.js** and **Express**. The platform allows users to create, manage, and delete events, authenticate users, and handle the necessary CRUD operations for events. It also provides JWT-based authentication for securing user routes.

### Features

- **User Authentication**: Implemented JWT-based authentication (sign-up, login).
- **Event Management**: Users can create, edit, and delete their events.
- **Event Listing**: Allows users to view a list of their events.
- **Protected Routes**: Secures event management routes by requiring authentication with JWT.
- **Environment Configuration**: Configured environment variables for easy setup and management.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **API Client**: None (Backend API consumed by Frontend)

---

## Installation

1. **Clone the repository**:
```
   git clone https://github.com/PeerMohammad07/Eventify-Backend.git
```
```
   cd Eventify-Backend
```
2. Install dependicies
   ```
    npm install
   ```

3. Environment Variables:
```
  MONGO_DB_URL=mongodb+srv://peeru548:tjbYunXhXIF6FcPM@cluster0.al7oq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  PORT=3000
  NODE_ENV="development"
  JWT_SECRET_KEY="eventifysecretkey"
  JWT_REFRESH_SECRET_KEY="eventifyrefreshsecretkey"
```
4.Run the server:
```
npm run dev
```
