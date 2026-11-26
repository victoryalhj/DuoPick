'use strict';

const Router = require('@koa/router');
const router = new Router({ prefix: '/api/groups' });
const groupController = require('../controllers/groupController');

// Create a group
router.post('/', groupController.createGroup);

// Get a group using its invitation code
router.get('/:code', groupController.getGroup);

// Join an existing group
router.post('/join', groupController.joinGroup);

module.exports = router;