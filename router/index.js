const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const templateController = require('../controllers/templateController');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddlewere');
// const path = require('path')
// post запросы
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 20 }),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/template/create', templateController.create);
// delete запросы
router.delete('/template/delete/:id', templateController.deleteTemplate);
// put запросы
router.put('/template/edit/:id', templateController.editTemplate);
// get запросы
router.get('/', (req, res) => { res.json('hello') });
router.get('/template/all', templateController.getTemplate);
router.get('/template/build/:path', templateController.viewTemplate);
router.get('/template/:id', templateController.getByIdTemplate);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;