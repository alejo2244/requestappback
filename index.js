require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

// 📝 Registro
app.post('/register', async (req, res) => {
  const { names, lastNames, document, companyId, rolId, email, password, registrationKey } = req.body;

  // Verifica la clave secreta
  if (registrationKey !== process.env.REGISTRATION_SECRET) {
    return res.status(403).json({ error: 'Clave de registro inválida' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { names, lastNames, document, companyId, rolId, email, password: hashedPassword },
    });

    res.status(201).json({ message: 'Usuario creado', user: { id: newUser.id, email: newUser.email } });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 🔐 Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login exitoso', username: user.names + ' ' + user.lastNames, userId: user.id, token });
    
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/deleteUser', async (req, res) => {
  
  try {
    await prisma.user.delete({ where: { id: 4 } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente.');
});

// Rutas
const companyRoutes = require('./routes/companies.routes');
app.use('/api/companies', companyRoutes);
const advanceRequestRoutes = require('./routes/advancedRequest.routes');
app.use('/api/advanceRequest', advanceRequestRoutes);

// 🏁 Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
