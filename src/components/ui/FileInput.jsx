import { useRef, useState } from "react";

const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

export default function FileInput(props) {
  const { image, setImage, fileName, setFileName } = props;
  // const [image, setImage] = useState(null);
  // const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!image) {
      if (file.size < 3 * 1024 * 1024) {
        setFileName(file);
        setImage(URL.createObjectURL(file));
      } else {
        alert("File size must be less than 3MB");
      }
    } else {
      alert(
        "Only one image allowed at a time. Please remove the current image to upload a new one."
      );
    }
  }

  function handleClick(e) {
    inputRef.current.click();
  }

  function handleRemove() {
    setFileName(null);
    setImage(null);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!image) {
      if (file.size < 3 * 1024 * 1024 && imageRegex.test(file.name)) {
        setFileName(file);
        setImage(URL.createObjectURL(file));
      } else {
        alert("File size must be less than 3MB");
      }
    } else {
      alert(
        "Only one image allowed at a time. Please remove the current image to upload a new one."
      );
    }
  }

  return (
    <main className="w-96 mx-auto">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex items-center border-2 border-dashed h-36 justify-center"
      >
        <input ref={inputRef} type="file" onChange={handleFileChange} hidden />
        {!image ? (
          <button
            type="button"
            onClick={handleClick}
            className="flex flex-col items-center "
          >
            <img src="/images/upload-icon.svg" alt="" className="w-10" />
            <span className="text-white text-sm font-normal mt-1">
              Upload Image
            </span>
          </button>
        ) : (
          <div className="h-20 relative">
            <img src={image} alt={fileName} className="w-full h-full" />
            <button onClick={handleRemove}>
              <img
                src="/images/close-icon.svg"
                alt=""
                className="w-8 absolute top-[-16px] right-[-16px]"
              />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
