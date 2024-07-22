# Express + React Code SAMPLE
The project will consist of an Express server that serves a RESTful API and a React front-end that consumes this API.

## Project Structure

```
root/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── App.js
│   │   └── index.js
│   ├── package.json
├── server/
│   ├── routes/
│   │   └── items.js
│   ├── server.js
│   ├── package.json
├── README.md
```

### Step 1: Setting Up the Server

Create a package.json file for the server: `server/package.json`

```
{
  "name": "server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```

Create the main server file: `server/server.js`

```
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Create a router for handling items: `server/routes/items.js`

```
const express = require('express');
const router = express.Router();

let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

router.get('/', (req, res) => {
  res.json(items);
});

router.post('/', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;
```

### Step 2: Setting Up the Client

Create a package.json file for the client: `client/package.json`

```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^0.21.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

Create the entry point for the React application: `client/src/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Create the main component for the React application: `client/src/components/App.js`

```
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, []);

  const handleAddItem = () => {
    axios.post('http://localhost:5000/api/items', { name: newItem })
      .then(response => {
        setItems([...items, response.data]);
        setNewItem('');
      })
      .catch(error => {
        console.error('There was an error adding the item!', error);
      });
  };

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new item"
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default App;
```


### Step 3: Running the Project

Start the Server:

Navigate to the server directory.

Install dependencies: `npm install`.
Start the server: `npm run dev`.

Start the Client:

Navigate to the client directory.

Install dependencies: `npm install`.
Start the client: `npm start`.

## Summary

The Express server provides an API for fetching and adding items.
The React client fetches items from the API and displays them, with the ability to add new items.

This example demonstrates a basic full-stack application using React for the front end and Express for the back end. You can expand this project by adding more features, such as authentication, more complex state management, and deployment.