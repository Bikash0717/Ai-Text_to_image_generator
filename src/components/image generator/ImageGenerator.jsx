
import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../assets/images.jpeg';

const ImageGenerator = () => {
  const [image_url, setImageUrl] = useState(default_image);
  const inputRef = useRef(null);

  const generateImage = async () => {
    if (inputRef.current.value === "") {
      return;
    }

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer hfxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          "User-Agent": "Microsoft Edge",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    const data = await response.json();
    console.log(data);
   
   if (data && data.data && data.data.length > 0) {
    setImageUrl(data.data[0].url);
  } else {
    console.error("No image URL found in response.");
  }
   
  };

  return (
    <div className='ai-image-generator'>
      <div className='header'>AI Image <span>Generator</span></div>
      <div className="img-loading">
        <div className='image'>
          <img src={image_url} alt="" />
        </div>
      </div>
      <div className="searchbox">
        <input
          type='text'
          ref={inputRef}
          className='search-input'
          placeholder='Describe what you want to generate'
        />
        <div className="input-button" onClick={()=>generateImage()}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;