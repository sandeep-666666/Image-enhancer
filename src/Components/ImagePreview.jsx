import React from "react";
import Loader from "./Loader";
const ImagePreview = ({ uploadImage, enhancedImage, loading }) => {
  return (
    <div className="grid mt-8 grdi-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
          Original image
        </h2>
        {uploadImage ? (
          <img
            src={uploadImage}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-200">
            No image Selected
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2">
          Enhanced image
        </h2>
        {enhancedImage && !loading && (
          <img
            src={enhancedImage}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        {loading ? (
          <Loader />
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-200">
            No Enhanced image
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
