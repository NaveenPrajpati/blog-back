const express = require("express");
const { getAllcont, addPost } = require("../controller/postController");
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
// router.get("/post", getAllcont);
// router.get("/post/:id",getpostId);
// router.get("/post/title/:name",getpostName);
// router.get("/post/author/:name",getpostAuthor);
// Add a new document to the collection

//private routes
router.post("/post", addPost);
// router.delete("/post/:id",deletepost);
// router.put("/post/:id", updatepost);


module.exports = router;