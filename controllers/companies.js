const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ Create company
exports.createCompany = async (req, res) => {
  try {
    const consecutivo = await prisma.consecutive.create({
        data: {
          name: 'CONS_001',
          description: 'Consecutivo para empresa ' + req.body.name,
        }
      });

    var companyCreate = req.body;
    companyCreate.consecutiveId = consecutivo.id;

    const company = await prisma.company.create({
      data: companyCreate,
    });
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 📄 Get all companies
exports.getAllCompanies = async (req, res) => {
  const companies = await prisma.company.findMany();
  res.json(companies);
};

// 🔍 Get company by ID
exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  const company = await prisma.company.findUnique({
    where: { id: Number(id) },
  });
  if (!company) return res.status(404).json({ error: 'Company not found' });
  res.json(company);
};

// ✏️ Update company
exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await prisma.company.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ❌ Delete company
exports.deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.company.delete({ where: { id: Number(id) } });
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};