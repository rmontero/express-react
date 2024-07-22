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
