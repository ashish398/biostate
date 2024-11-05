# BiostateAI

Document on how to set up and run this NestJS and React project.

## Prerequisites

Ensure that you have the following installed on your local machine:

- **Node.js** (version >= 18.x.x)
- **npm** (Node Package Manager, comes with Node.js)
- **Git** (for version control)
- **PostgreSQL**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup (NestJS)

Navigate to the backend folder:

```bash
cd <backend-directory>
```

Install Dependencies:

```bash
npm install
```

Configure Environment Variables:

PORT=3001
DATABASE_URL=<your-database-url>
Replace <your-database-url> and <your-jwt-secret> with your specific values.

Running the Server:

Development Mode:

```bash
npm run start --watch
```

### 2. Frontend Setup (React)

Navigate to the frontend folder:

```bash
cd <frontend-directory>
```

Install Dependencies:

```bash
npm install
```

Configure Environment Variables:
REACT_APP_API_URL=http://localhost:3000

Running the Client:

```bash
npm start
```

The React app will start on http://localhost:3000 by default.

Running the Full Stack Application
Ensure both the NestJS server and React client are running.
Open your browser and go to http://localhost:3000 to view the application.
