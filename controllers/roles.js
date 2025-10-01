const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ Create role
exports.createRole = async (req, res) => {
 try {
    const { id, ...roleData } = req.body; 

    const role = await prisma.rol.create({
      data: roleData,
    });

    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 📄 Get all roles
exports.getAllRoles = async (req, res) => {
  const roles = await prisma.rol.findMany();
  res.json(roles);
};

// 🔍 Get role by ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  const role = await prisma.rol.findUnique({
    where: { id: Number(id) },
  });
  if (!role) return res.status(404).json({ error: 'rol not found' });
  res.json(role);
};

// ✏️ Update role
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await prisma.rol.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ❌ Delete role
exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.rol.delete({ where: { id: Number(id) } });
    res.json({ message: 'rol deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};