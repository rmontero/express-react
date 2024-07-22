import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, []);

  const handleAddItem = () => {
    axios.post('http://localhost:5001/api/items', { name: newItem })
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
