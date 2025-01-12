import React from 'react';
import VideoUploader from "../components/VideoUploader"; 

const LandingPage = () => {
  return (
    <div className="">
      <div className="external-uploader-container">
        <h1> Upload a File</h1>
        <VideoUploader></VideoUploader>
      </div>
    </div>
  )
}

export default LandingPage