const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companies');
const verifyToken = require('../middlewares/auth.middleware');

// ✅ Rutas protegidas por JWT
router.post('/', verifyToken, companyController.createCompany);
router.get('/', verifyToken, companyController.getAllCompanies);
router.get('/:id', verifyToken, companyController.getCompanyById);
router.put('/:id', verifyToken, companyController.updateCompany);
router.delete('/:id', verifyToken, companyController.deleteCompany);

module.exports = router;