// import { v2 as cloudinary } from 'cloudinary'
// import fs from 'fs'
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })


// const uploadoncloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) {
//             console.log(" File path not provided")
//             return null
//         }

//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: 'auto',
//             folder: 'uploads'
//         })

//         console.log("file is uploaded on clodinary", response.secure_url)
//         if (fs.existsSync(localFilePath)) {
//             fs.unlinkSync(localFilePath);
//         }
//         return response

//     } catch (error) {
//         console.error(" Error:", error);
//         if (fs.existsSync(localFilePath)) {
//             fs.unlinkSync(localFilePath);
//         }
//         return null
//     }
// }


// export default uploadoncloudinary
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadoncloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    if (!buffer) return reject(new Error("File buffer not provided"));

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default uploadoncloudinary;
