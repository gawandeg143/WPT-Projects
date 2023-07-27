const express = require('express');
const router = express.Router();
const emp_controller = require('../controllers/employee_controller');

router.get('/',emp_controller.findAll);

router.post('/',emp_controller.create);

router.get('/:id',emp_controller.findById);

router.put('/:id',emp_controller.update);

router.delete('/:id',emp_controller.delete);

module.exports = router;