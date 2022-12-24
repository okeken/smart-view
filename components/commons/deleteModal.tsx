import { Modal , Button, } from "flowbite-react";


interface IDeleteModalProps {
    show: boolean;
    onHide: () => void;
   onClick: () => void;
    message: string;
}


const DeleteModal = ({ show, onHide, onClick, message }:IDeleteModalProps) => {

    return (    
        <>
        <Modal
    show={show}
    size="md"
    popup={true}
    onClose={onHide}
  >
    <Modal.Header />
    <Modal.Body>
      <div className="text-center">
      <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
       {message}
        </h3>
        <div className="flex justify-center gap-4">
          <Button
            color="failure"
            onClick={onClick}
          >
            Yes, I'm sure
          </Button>
          <Button
            color="gray"
            onClick={onHide}
          >
            No, cancel
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
        
        </>
      

    )
}

export default DeleteModal