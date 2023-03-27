const KoaRouter = require("@koa/router");
const { create ,showAvatarImage } = require("../controller/user.controller");
const { verifyUser, md5PassWord } = require("../middleware/user.middleware");

const userRouter = new KoaRouter({ prefix: "/users" });

userRouter.post("/", verifyUser, md5PassWord, create);

// 头像展示
userRouter.get('/avatar/:userId',showAvatarImage)
module.exports = userRouter;
