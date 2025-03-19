import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  value?: string;
  onChange: (base64: string) => void;
  label: string;
  disabled?:boolean
}
const ImageUpload = ({ disabled, label, onChange, value }: ImageUploadProps) => {
    const [base64, setBase64] = useState(value);
    const handleImageChange = useCallback((base64: string) => {
        onChange(base64)
    }, []);
    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleImageChange(event.target.result)
        }
        reader.readAsDataURL(file)
    }, [handleImageChange]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        maxFiles: 1,
        disabled,
        accept: {
            'image/jpeg':[],
            'image/png':[],
        }
    });
  return <div></div>;
};
 
export default ImageUpload;