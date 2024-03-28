import {v2 as cloudinary, v2} from "cloudinary"
import fs from "fs"
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
export async function uploadoncloudinary(localfilepath){
    try{
        if(!localfilepath) return null
        const response=await v2.uploader.upload(localfilepath,{
            resource_type:"auto",
            folder:"Indianyoutube"
        })
        console.log("the response",response);
        fs.unlinkSync(localfilepath)
        return response
    }
    catch(error){
        console.log("there is some error");
    }
}
export async function deleteoncloudinary(cloudinaryurl){
    try{
        const response=await v2.uploader.destroy(cloudinaryurl)
        console.log(response);
        return response;
    }
    catch(error){
        console.log("there is some error while deleting",error);
    }
}