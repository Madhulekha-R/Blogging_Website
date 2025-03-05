// import axios from "axios";

// export const uploadImage = async (img) => {

//     let imgUrl = null;

//     await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
//     .then( async ({ data: { uploadURL }}) => {
    
//         await axios({
//             methos: 'PUT',
//             url: uploadURL,
//             headers: { 'Content-Type': 'multipart/form-data' },
//             data: img
//         })

//         .then(() => {
//             imgUrl = uploadURL.split("?")[0]
//         })
//     })

//     return imgUrl;

// }

import axios from "axios";

export const uploadImage = async (img) => {
    let imgUrl = null;

    await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
    .then(async ({ data: { uploadURL } }) => {
        await axios({
            method: 'PUT',  // ✅ Fixed typo
            url: uploadURL,
            headers: { 
                'Content-Type': img.type  // ✅ Use correct image type
            },
            data: img
        })
        .then(() => {
            imgUrl = uploadURL.split("?")[0];
        })
        .catch(error => console.error("Upload failed:", error));
    })
    .catch(error => console.error("Error fetching signed URL:", error));

    return imgUrl;
};
