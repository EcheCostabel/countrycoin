import { UserController } from "controllers/user.controller";
import { Router } from "express";
import {
  createUserValidator,
  idValidator,
  updateUserValidator,
} from "validators/user.validator";

const router = Router();

router.get("/", UserController.findAll);
router.get("/:id", idValidator, UserController.findOne);
router.post("/", createUserValidator, UserController.create);
router.put(
  "/resetpassword",
  updateUserValidator,
  UserController.changePassword
);

export { router as userRouter };
