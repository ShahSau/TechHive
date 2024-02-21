import express from 'express'
import { 
    signup,
    signin,
    signOut,
    allUsers,
    blockUser,
    unblockUser,
    addToFavroute,
    removeFromFavroute,
    getAllFavroute,
    updateUser
} from '../controllers/auth.controller.js'
import { isAdmin, verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', signOut)
router.get('/all-uesers', isAdmin,allUsers)
router.post('/block-user', isAdmin,blockUser)
router.post('/unblock-user', isAdmin,unblockUser)
router.post('/favroute', verifyToken, addToFavroute)
router.post('/unfavroute', verifyToken, removeFromFavroute)
router.get('/favroute', verifyToken, getAllFavroute)
router.post('/update-user', verifyToken, updateUser)




export default router