const express = require("express");
const { getAllPost, addPost,deletePost,updatePost,getPostId ,updateLike} = require("../controller/postController");
const validateToken = require("../middleware/validateTokenHandler");
const {addComment,getComments} = require("../controller/commentController");



// const storage = multer.diskStorage(
//     {destination: function (req, file, cb) {
//         cb(null, './tmp')
//     },
// filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + file.originalname
//         cb(null, uniqueSuffix)
//     }}
// )
//
// const upload = multer({ storage: storage })


const router = express.Router();

//public routes
router.get("/post", getAllPost);
router.get("/post/:id",getPostId);

//private routes
router.post("/post",validateToken, addPost);
router.delete("/post/:id",validateToken,deletePost);
router.put("/post",validateToken, updatePost);
router.patch("/post/:id",validateToken,updateLike);

//comment routes
router.put("/post/comment",validateToken, addComment);
// router.get("/post/comment",validateToken,getComments)
module.exports = router;