const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles');
const verifyToken = require('../middlewares/auth.middleware');

// ✅ Rutas protegidas por JWT
router.post('/', verifyToken, rolesController.createRole);
router.get('/', verifyToken, rolesController.getAllRoles);
router.get('/:id', verifyToken, rolesController.getRoleById);
router.put('/:id', verifyToken, rolesController.updateRole);
router.delete('/:id', verifyToken, rolesController.deleteRole);

module.exports = router;