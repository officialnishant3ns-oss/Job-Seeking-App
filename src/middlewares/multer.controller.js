// import multer from 'multer'


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp")
//     }, 
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// const upload  = multer({
//     storage:storage,
// })
// export default  upload
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
