const express = require('express');
const router = express.Router();
const { sendContactEmail, subscribeNewsletter } = require('../controllers/contactController');

router.post('/', sendContactEmail);
router.post('/newsletter', subscribeNewsletter);

module.exports = router;
