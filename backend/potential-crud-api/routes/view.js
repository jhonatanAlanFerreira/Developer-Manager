const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/*', (req, res) => {
    res.sendFile(path.normalize(__dirname + "/../../../frontend/potential-crud/dist/potential-crud/index.html"));
});

module.exports = router;