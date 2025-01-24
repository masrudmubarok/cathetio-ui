# cathet.io UI

cathet.io UI is the frontend for the cathet.io application. This repository contains all the code to manage the user interface of the application. It interacts with the cathet.io API to provide a smooth and interactive experience for managing your to-do list.

## Features

- User authentication (Login and Registration)
- View, add, update, and delete tasks
- Responsive design for a seamless user experience across devices
- User-friendly interface with intuitive controls

## Technologies

- React.js
- Redux (for state management)
- CSS/SCSS (for styling)
- Axios (for API requests)
- React Router (for routing)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/username/cathetio-ui.git
   cd cathetio-ui
2. Install dependencies:
   ```npm install```
3. Create a `.env` file based on `.env.example` and configure the database and port settings.
4. Run the server:
   ```npm start```

## Directory

- `src/` - Main directory for source code
  - `components/` - Reusable UI components
  - `pages/` - React components for different pages
  - `redux/` - Redux state management files
  - `api/` - Functions to interact with the API
  - `assets/` - Images, icons, and other static files
  - `styles/` - Global CSS/SCSS styles
