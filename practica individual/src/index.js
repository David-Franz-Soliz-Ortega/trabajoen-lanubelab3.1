const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://db:27017/crud_db';
mongoose.connect(mongoURI)
  .then(() => console.log(' Conectado a MongoDB'))
  .catch(err => console.error(' Error de conexión:', err));

// Modelo de datos
const Item = mongoose.model('Item', new mongoose.Schema({
  nombre: String,
  descripcion: String
}));

app.get('/', (req, res) => {
  res.json({ status: 'API online', message: 'Servidor CRUD con MongoDB exitoso' });
});


app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items + " Hola mundo");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item no encontrado' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: 'Item no encontrado' });
    res.json({ message: 'Item eliminado correctamente', item: deletedItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3010, () => console.log(' Servidor corriendo en el puerto 3010'));