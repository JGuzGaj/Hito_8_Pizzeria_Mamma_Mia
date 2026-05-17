const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "secreto_super_seguro";

let users = [];


app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Usuario ya existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { email, password: hashedPassword };
  users.push(newUser);

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

  res.json({ token, email });
});


app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Usuario no existe" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

  res.json({ token, email });
});


const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "No autorizado" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido" });
  }
};


app.get("/api/auth/me", verifyToken, (req, res) => {
  res.json({ email: req.user.email });
});


app.post("/api/checkouts", verifyToken, (req, res) => {
  const { cart } = req.body;

  console.log("Compra:", cart);

  res.json({ message: "Compra exitosa" });
});

// SERVER
app.listen(5000, () => {
  console.log("🔥 Backend corriendo en http://localhost:5000");
});