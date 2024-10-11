import { Router } from 'express';
import {createNewAdmin,adminLogin,fetchAllAssignments,acceptAssignment,rejectAssignment} from '../Controller/adminController.js';

const router = Router();

router.post("/register",createNewAdmin);
router.post("/login",adminLogin);
router.get("/assignments/:admin_name",fetchAllAssignments);
router.put("/assignments/:id/accept",acceptAssignment);
router.put("/assignments/:id/reject",rejectAssignment);
export default router;