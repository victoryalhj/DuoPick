'use strict';

const Router = require('@koa/router');
const router = new Router({prefix:'/api/groups'});
const groupController = require('../controllers/groupController');

router.post('/', groupController.createGroup);
// router.get('/:code', groupController.getGroup);

module.exports = router;