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

## Algorithms used:

### 1. max length unique substring:

1. Used sliding window technique, while maintaining a set of visited characters
2. Space complexity - O(N) and Time Complexity - O(N), where N is length of string

### 2. max sum path between any two nodes:

1. Uses recursive depth-first search (DFS) to compute maximum branch sums and paths at each node
2. Updates the global maximum path sum and corresponding node path when a higher sum is found, considering both straight and split paths
3. Space complexity O(N) and time complexity O(N), where N is the number of nodes in the tree

### 3. max sum path between a leaf node and any other node:

NOTE: Taking the other node as - any node **down** from which is the leaf node

1. Performs a recursive post-order traversal to compute maximum sum paths from any node down to a leaf node.
2. Updates the global maximum sum and path when a higher sum path ending at a leaf node is found from any starting node.
3. Space complexity O(N) and time complexity O(N), where N is the number of nodes in the tree

## TESTING:

### Backend Unit test

1. Covered calculation of length of longest unique substring
2. Covered calculation of max path from any node to any node
3. Covered calculation of max path from leaf node to any node

### Backend Integration test

1. Added integration test for complete User controller

- getting all users
- changing user permissions

### Frontend Unit test

1. Added unit test for substring length calculation form

### Cypress e2e test and Visual Regression test

1. Added for Registration Screen
2. Added for Signin Screen

### Cypress e2e test

## DESIGN CHOICES:

1. Using React Query for server state management:

- Instead of using Redux toolkit for api calling and state management, I am using React Query which.
- It is more optimised for api calling with out of the box caching and optimised querying

2. Using d3 js tree builder:

- For binary tree I am using d3.js tree builder, which gives out of the box tree skeleton for further customisation

3. Using Auth as Guard instead of Middleware

- Nest js recommends using guard instead of middleware for authentication and authorisation

4. Using Redux to handle load in tree

- this was done just to demonstrate the understanding of redux and could be also handled by context

5. Using swagger for api documentation

## BONUS SECTION ATTEMPTED:

1. The tree builder is interactive, zoomable and has advanced visualisations

2. Created a simple admin to see all the project users and change the permissions - right now open for all

3. Added simple keyboard shortcuts for faster tree building

4. Added a toggle for light and dark theme switch
