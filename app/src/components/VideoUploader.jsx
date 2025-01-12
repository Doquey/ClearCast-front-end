import React, {useState} from 'react'
import { FileUploader } from "react-drag-drop-files";

import { uploadFile } from "../services/s3Services";

const VideoUploader = () => {
  const fileTypes = ["MP4", "AVI", "MKV"];
  const [file, setFile] = useState(null);
  
  const apiEndPoint = process.env.REACT_APP_BACKEND_URL;
  console.log("end point : ", apiEndPoint)

  async function postUrlLink(url) {
    try {
      const response = await fetch(apiEndPoint +'/video/upload_video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: url }), // Ensure this object is properly structured
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Response:', result);
    } catch (error) {
      console.error('Error sending file URL to backend:', error);
    }
  }

  const handleSubmit = async () =>{
    if (file){
      try {
        console.log("Uploading file ...")
        const fileUrl = await uploadFile("clearcast",file);
        postUrlLink(fileUrl);
      } catch(err){
        console.log("Upload failed : ", err);
      }  
    }

  }

  const handleChange = (file) =>{
    setFile(file);
  }
  return (
    <div className="container">
      <div className="uploader-container">
        <FileUploader handleChange ={handleChange} name="file" types={fileTypes}></FileUploader>
      </div>
      <button onClick={handleSubmit}>Submit Video</button>
    </div>
  )
}

export default VideoUploader