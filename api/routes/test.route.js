import {Router} from "express";
import { shouldBeLoggedIn, shouldBeAdmin } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();

router.get("/should-be-logged-in",verifyToken,shouldBeLoggedIn);
router.get("/should-be-admin",shouldBeAdmin);

export default router;