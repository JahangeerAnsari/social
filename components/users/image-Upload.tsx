import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  value?: string;
  onChange: (base64: string) => void;
  label: string;
  disabled?: boolean;
}
const ImageUpload = ({
  disabled,
  label,
  onChange,
  value,
}: ImageUploadProps) => {
  const [base64, setBase64] = useState(value);
  const handleImageChange = useCallback((base64: string) => {
    onChange(base64);
  }, []);
  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleImageChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleImageChange]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1,
    maxSize: 5242880, //uo to 5mb
    disabled,

    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  return (
    <div
      {...getRootProps({
        className: "w-full p-4 text-white text-center border-2 border-dotted",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="upload image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
