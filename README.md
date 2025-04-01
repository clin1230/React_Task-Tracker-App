# React Task Management Application

A modern task management application built with React, featuring a clean UI and comprehensive task tracking capabilities.

## Features

- Task Management (create, delete, complete)
- Priority Levels & Categories
- Responsive Modern UI
- Dashboard with Task Overview

## Technology Stack

- **Frontend**: React.js
- **Routing**: React Router
- **Styling**: CSS3 with modern features
- **Backend**: JSON Server (REST API)
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
```

3. Start the JSON Server (API):

```bash
npm run server
```

4. Start the React application:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── Tasks.js
│   ├── Task.js
│   ├── AddTask.js
│   └── About.js
├── App.js
└── index.css
```

## API Endpoints

The application uses the following REST API endpoints:

- `GET /tasks` - Retrieve all tasks
- `GET /tasks/:id` - Retrieve a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
