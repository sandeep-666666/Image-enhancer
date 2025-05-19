import React from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { useState } from "react";
import { enhancedImageAPI } from "../../Utils/enhancedImageAPI";
const Home = () => {
  const [uploadImage, setuploadImage] = useState(null);
  const [enhancedImage, setenhancedImage] = useState(null);
  const [loading, setloading] = useState(false);

  const uploadImageHandler = async (file) => {
    setuploadImage(URL.createObjectURL(file));
    setloading(true);
    //calling api to enhance the image
    try {
      const enhancedURL = await enhancedImageAPI(file);
      setenhancedImage(enhancedURL.image);
      setloading(false);
    } catch (error) {
      console.log(error);
      alert("Error while enhancing the image, please try again Later.");
    }
  };

  return (
    <>
      <ImageUpload uploadImageHandler={uploadImageHandler} />
      <ImagePreview
        loading={loading}
        uploadImage={uploadImage}
        enhancedImage={enhancedImage}
      />
    </>
  );
};

export default Home;
