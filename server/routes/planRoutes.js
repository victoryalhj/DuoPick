'use strict'

const Router = require('@koa/router');
const router = new Router({prefix: '/api/groups'});
const planController = require('../controllers/planController');

router.post('/:code/plan', planController.createPlan);
router.get('/:code/plan', planController.getPlan);

module.exports = router;