import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

// Convert crop area into an actual cropped image blob
const getCroppedImg = (imageSrc, cropAreaPixels) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = cropAreaPixels.width;
      canvas.height = cropAreaPixels.height;

      ctx.drawImage(
        image,
        cropAreaPixels.x,
        cropAreaPixels.y,
        cropAreaPixels.width,
        cropAreaPixels.height,
        0,
        0,
        cropAreaPixels.width,
        cropAreaPixels.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = "cropped.jpeg";
        resolve(blob);
      }, "image/jpeg");
    };
    image.onerror = (err) => reject(err);
  });
};

const ImageCropper = ({ image, onCancel, onComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const finishCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onComplete(croppedImage); // return cropped blob
    } catch (err) {
      console.error("Crop error:", err);
    }
  };

  return (
    <div className="cropper-container">
      <div className="cropper-wrapper">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1} // square crop for profile pics
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="cropper-controls">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, z) => setZoom(z)}
        />
        <div className="cropper-buttons">
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={finishCrop}>Crop</Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
