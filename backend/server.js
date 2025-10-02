const express = require("express");
const app = express();
const cors = require("cors");
const Datastore = require("nedb");
const bcrypt = require("bcrypt");

const productListing = require('./products');

// Datastores
const cartDB = new Datastore({ filename: 'cart.db', autoload: true });
const userDB = new Datastore({ filename: 'users.db', autoload: true });

app.use(cors());
app.use(express.json());

// ----- USER FUNCTIONS -----
const createUser = (user) => new Promise((resolve, reject) => {
  userDB.insert(user, (err, doc) => err ? reject(err) : resolve(doc));
});
const findUser = (email) => new Promise((resolve, reject) => {
  userDB.findOne({ email }, (err, doc) => err ? reject(err) : resolve(doc));
});

// ----- CART FUNCTIONS -----
const findCart = (userId) => new Promise((resolve, reject) => {
  cartDB.find({ userId }, (err, docs) => err ? reject(err) : resolve(docs));
});
const findOneCart = (productId, userId) => new Promise((resolve, reject) => {
  cartDB.findOne({ id: productId, userId }, (err, doc) => err ? reject(err) : resolve(doc));
});
const insertCart = (product) => new Promise((resolve, reject) => {
  cartDB.insert(product, (err, doc) => err ? reject(err) : resolve(doc));
});
const updateCart = (productId, update, userId) => new Promise((resolve, reject) => {
  cartDB.update({ id: productId, userId }, update, {}, (err) => err ? reject(err) : resolve());
});
const removeCart = (productId, userId) => new Promise((resolve, reject) => {
  cartDB.remove({ id: productId, userId }, {}, (err, numRemoved) => err ? reject(err) : resolve(numRemoved));
});

// ----- AUTH ROUTES -----
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await findUser(email);
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashedPassword });
    res.json({ message: "Signup successful", user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUser(email);
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    res.json({ message: "Login successful", user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----- PRODUCT ROUTE -----
app.get('/api/products', (req, res) => {
  res.json(productListing);
});

// ----- CART ROUTES -----
app.get('/api/cart/:userId', async (req, res) => {
  const userId = req.params.userId;
  const cart = await findCart(userId);
  res.json(cart);
});

app.post('/api/cart', async (req, res) => {
  try {
    const { userId, ...product } = req.body;
    const existing = await findOneCart(product.id, userId);

    if (existing) {
      await updateCart(product.id, { $inc: { quantity: 1 } }, userId);
    } else {
      await insertCart({ ...product, quantity: 1, userId });
    }

    const updatedCart = await findCart(userId);
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/cart/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const removed = await removeCart(parseInt(productId), userId);
    res.json({ removed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
