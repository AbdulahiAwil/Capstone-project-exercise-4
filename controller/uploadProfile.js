import User from "../model/User.js"
import cloudinary from "../utility/cloudinary.js"


export const uploadProfile = (req, res, next) =>{
    if(!req.file){
        return res.status(400).json({message: 'No file Uploaded'})
    }

    const stream = cloudinary.uploader.upload_stream(
        {folder: "capstone_profile_images_folder", resource_type: "auto"},
        async (error, result) => {
            if (error) return next(error)

            await User.findByIdAndUpdate(req.user._id, {profilePicture: result.secure_url})
            return res.status(201).json({
                success: true,
                fileUrl: result.secure_url
        })
        }
    )
        stream.end(req.file.buffer)
}