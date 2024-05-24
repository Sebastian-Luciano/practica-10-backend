import { Router } from 'express'
import { index, remove, store, update } from '../controllers/usuarios.controller.js'
import { uploadImage } from '../config/multer.js'

const router = Router()

router.get('/', index)
router.delete('/:id', remove)
router.post('/', uploadImage.single('imagen'), store)
router.put('/:id', uploadImage.single('imagen'), update)

export default router
