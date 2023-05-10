const express = require("express");
const { getAllPost, addPost,deletePost,updatePost,getPostId ,updateLike} = require("../controller/postController");
const validateToken = require("../middleware/validateTokenHandler");



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
// router.get("/post/title/:name",getpostName);
// router.get("/post/author/:name",getpostAuthor);
// Add a new document to the collection

//private routes
router.post("/post", addPost);
router.delete("/post/:id",deletePost);
router.put("/post", updatePost);
router.patch("/post/:id",updateLike);


module.exports = router;