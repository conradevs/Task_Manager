import Express from 'express'
import {
    getProyects,
    newProyect,
    getProyect,
    editProyect,
    deleteProyect,
    addCollaborator,
    deleteCollaborator,
    getTasks 
} from '../controllers/proyController.js'

import checkAuth from '../middleware/checkAuth.js'

const router = express.Router();

router
    .route("/")
    .get(checkAuth, getProyects)
    .post(checkAuth, newProyect);

router
    .route('/:id')
    .get(checkAuth, getProyect)
    .put(checkAuth, editProyect)
    .put(editProyect, deleteProyect);

router.get('/tasks/:id', checkAuth, getTasks)
router.post('/add-collaborator/:id',checkAuth,addCollaborator)
router.post('/delete-collaborator/:id',checkAuth,deleteCollaborator)

export default router;
