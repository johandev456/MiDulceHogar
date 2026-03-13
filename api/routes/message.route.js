import { Router } from "express";
import { addMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();

router.post("/:chatId",verifyToken, addMessage)

export default router;