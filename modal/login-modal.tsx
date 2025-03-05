import Input from "@/components/input";
import Modal from "@/components/Modal";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(() => {
      console.log("submit");
      
        try {
            setIsLoading(true);

            loginModal.onClose()
        } catch (error) {
           console.log("[loginform]", error);
            
        } finally {
           setIsLoading(false) 
        } 
    }, [])
    const handleOpenRegisterModal= useCallback(() => {
      if (isLoading) {
        return;
        }
        loginModal.onClose();
      registerModal.onOpen();
      
    }, [registerModal, loginModal]);
    
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your Password"
        />
      </div>
    );
    const footerContent = (
      <div className="text-neutral-400 text-center mt-4">
        <p>Create new Account?</p>
        <span
          onClick={handleOpenRegisterModal}
          className="text-white cursor-pointer hover:underline"
        >
          Register ?
        </span>
      </div>
    );
    return (
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Sign in"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    );
}
 
export default LoginModal;