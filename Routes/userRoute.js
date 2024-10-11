import { Router } from 'express';
import{createNewUser,userLogin,fetchAllAdmin,uploadAssignment} from '../Controller/userController.js';

const router = Router();

router.post("/register",createNewUser);
router.post("/login",userLogin);
router.post("/upload",uploadAssignment);
router.get("/all-admins",fetchAllAdmin);
export default router;