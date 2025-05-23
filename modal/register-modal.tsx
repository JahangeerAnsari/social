import Input from "@/components/input";
import Modal from "@/components/Modal";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback( async() => {
    try {
      console.log("calling-----");
      
      setIsLoading(true);
      await axios.post('/api/register', {
        email,
        name,
        username,
        password
      })
      toast.success('Account Created!')
      signIn('credentials', {
        email,
        password
      })
      registerModal.onClose();
    } catch (error) {
      console.log("[loginform]", error);
      toast.error('Failed to account create')
    } finally {
      setIsLoading(false)
    }
  }, [registerModal, email, name, username, password]);
  const handleOpenLoginModal = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen()

  },[registerModal,loginModal])
    
    // body content
  const bodyContent = (
    <div className="flex flex-col gap-6">
      <Input
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter your email"
      />
      <Input
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Enter your name"
      />
      <Input
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Enter your username"
      />

      <Input
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter your Password"
      />
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have an account</p>
      <span onClick={handleOpenLoginModal} className="text-white cursor-pointer hover:underline">Sign in ?</span>
    </div>
  )
    return (
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Create an account"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    );
}
 
export default RegisterModal;