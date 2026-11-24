const Router = require('@koa/router');
const router = new Router({prefix: '/api/groups'});
const archiveController = require('../controllers/archiveController');

router.post('/:code/archive', archiveController.createArchive);
router.get('/:code/archive', archiveController.getArchive);

module.exports = router;