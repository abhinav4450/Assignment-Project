import { Router } from 'express';
import userRoute from '../Routes/userRoute.js';
import adminRoute from '../Routes/adminRoute.js';

const router = Router();

router.use("/user",userRoute);
router.use("/admin",adminRoute);

export default router;