import React from 'react';
import { default as Upload, ImageListType } from 'react-images-uploading';

interface UploaderProps {
    image: ImageListType;
    onChange: (image: ImageListType) => void;
}
const Uploader: React.FC<UploaderProps> = (props) => {
    const { image, onChange } = props;
    
    return (
        <Upload
        value={image}
        onChange={onChange}
        maxNumber={1}
      >
        {({
          onImageUpload,
          dragProps
        }) => (
          // write your building UI
          <div className='h-full border-2 mt-4 border-dotted rounded-xl border-pink-700'>
            <button
                className='w-full h-[400px]'
                onClick={onImageUpload}
                {...dragProps}
            >
                Click or Drop here
            </button>
          </div>
        )}
      </Upload>
    )
}

export default Uploader;