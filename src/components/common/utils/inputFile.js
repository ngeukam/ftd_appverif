import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const InputFileUpload = ({
  input_name,
  placeholder,
  fileTitle,
  fileLoading,
  handleFile,
  files,
  requiredOption = false,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is an image and if it's under the 50KB size limit
      const isImage = file.type.startsWith('image/');
      const isSizeValid = file.size <= 50000; // 50 KB

      if (isImage && isSizeValid) {
        // Show image preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        handleFile(e, input_name); // Call the provided handleFile function
      } else {
        alert('Please upload a valid image under 50 KB.');
        setImagePreview(null); // Reset preview if file is invalid
      }
    }
  };

  const fileUrl = files?.find((file) => file[input_name])?.url;

  return (
    <div>
      <span className="text-gray-600 inline-block mb-2 relative">
        {fileTitle}
        <Tooltip title="Maximum size is 50 KB! Valid files are images" color="blue">
          <span className="absolute top-1 left-[110%] text-purple-500 hover:text-purple-600 hover:shadow-sm cursor-pointer">
            <BsFillQuestionCircleFill />
          </span>
        </Tooltip>
      </span>

      <input
        id={input_name}
        type="file"
        onChange={handleFileChange}
        required={requiredOption}
        accept="image/*" // Limit file selection to images
        placeholder={placeholder}
      />

      {/* Show preview of the uploaded image */}
      {imagePreview && (
        <div className="mt-2">
          <img src={imagePreview} alt="Image preview"className="max-w-[40px] h-auto rounded-md" />
        </div>
      )}

      {/* Show uploaded file URL if available */}
      {fileUrl && !imagePreview && (
        <div className="mt-2 text-gray-600">
          <Link to={fileUrl} target="_blank" rel="noopener noreferrer">
            View uploaded file
          </Link>
        </div>
      )}
    </div>
  );
};

export default InputFileUpload;
