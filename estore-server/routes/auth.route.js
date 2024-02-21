import express from 'express'
import { signup,signin, signOut,allUsers, blockUser, unblockUser } from '../controllers/auth.controller.js'
import { isAdmin } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', signOut)
router.get('/all-uesers', isAdmin,allUsers)
router.post('/block-user', isAdmin,blockUser)
router.post('/unblock-user', isAdmin,unblockUser)




export default router