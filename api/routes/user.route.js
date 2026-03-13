import { Router } from "express";
import { getUser,updateUser,getContactInfo,updateContactInfo,deleteUser,getUsers,savePost,profilePosts, getNotificationNumber } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();

router.get("/", getUsers);
router.get('/profilePosts', verifyToken, profilePosts);
router.get("/notification",verifyToken, getNotificationNumber);//Un detalle es que si se pone primero los get con :id
// Pasa que literalmente cree que el id es la direccion ejemplo profilePosts.
router.get("/:id",verifyToken, getUser);
router.put("/:id",verifyToken, updateUser);
router.delete("/:id",verifyToken, deleteUser);
router.post('/save', verifyToken, savePost);



export default router;