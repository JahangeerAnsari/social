import Input from "@/components/input";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/users/image-Upload";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    console.log("details", bio);
    
  // whenever this page load set the value of current user
  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const editSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        coverImage,
        profileImage,
      });
      // it will imidiate refresh
        mutateFetchedUser();
        toast.success('User details updated')
    } catch (error) {
      toast.error("Error on edit modal");
    } finally {
      setIsLoading(false);
    }
    };
    const bodyContent = (
      <div className="flex flex-col gap-4">
        <ImageUpload
          value={profileImage}
          onChange={(image) => setProfileImage(image)}
          label="Profile image Upload"
          disabled={isLoading}
        />
        <ImageUpload
          value={coverImage}
          onChange={(image) => setCoverImage(image)}
          label="Cover image Upload"
          disabled={isLoading}
        />
        <Input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          disabled={isLoading}
        />
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          disabled={isLoading}
        />
        <Input
          placeholder="Bio"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          disabled={isLoading}
        />
      </div>
    );
    return (
      <Modal
        disabled={isLoading}
        isOpen={editModal.isOpen}
        actionLabel="Save"
        title="Edit Profile Modal"
        onClose={editModal.onClose}
        onSubmit={editSubmit}
        body={bodyContent}
      />
    );
};

export default EditModal;
