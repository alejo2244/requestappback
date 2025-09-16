const express = require('express');
const router = express.Router();
const advanceRequestController = require('../controllers/advanceRequest');
const verifyToken = require('../middlewares/auth.middleware');

// ✅ Rutas protegidas por JWT
router.post('/', verifyToken, advanceRequestController.createAdvanceRequest);
router.get('/:userId', verifyToken, advanceRequestController.getAllAdvanceRequests);
router.get('/:id', verifyToken, advanceRequestController.getAdvanceRequestById);
router.put('/:id', verifyToken, advanceRequestController.updateAdvanceRequest);
router.put('/status/:id', verifyToken, advanceRequestController.updateAdvanceRequestStatus);
router.delete('/:id', verifyToken, advanceRequestController.deleteAdvanceRequest);
router.get('/documento/:id', verifyToken, advanceRequestController.descargarPDF);

module.exports = router;