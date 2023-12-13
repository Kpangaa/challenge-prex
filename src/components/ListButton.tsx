import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ShareIcon from "./ShareIcon";
import DownloadIcon from "./DownloadIcon";
import DeleteIcon from "./DeleteIcon";

interface ListButtonProps {
  setUrlShare: (value: React.SetStateAction<string>) => void;
  image: string;
  onOpenShare: () => void;
  onDownloadFile: (url: string) => Promise<void>;
  onDeleteFile: (url: string) => Promise<void>;
}

function ListButton({
  setUrlShare,
  image,
  onOpenShare,
  onDownloadFile,
  onDeleteFile,
}: ListButtonProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <div className="bg-transparent absolute w-full flex justify-around bottom-0">
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-900">
                Delete
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 text-black">
                  <h1>Are you sure you want to Delete?</h1>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onDeleteFile(image);
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        isIconOnly
        variant="faded"
        aria-label="share file"
        className="w-9 h-9 hover:bg-slate-200"
        onPress={() => {
          setUrlShare(image);
          onOpenShare();
        }}
      >
        <ShareIcon />
      </Button>
      <Button
        isIconOnly
        aria-label="Download file"
        variant="faded"
        className="w-9 h-9 hover:bg-slate-200"
        onPress={() => {
          onDownloadFile(image);
        }}
      >
        <DownloadIcon />
      </Button>
      <Button
        isIconOnly
        aria-label="Delete file"
        className="w-9 h-9 hover:bg-slate-200"
        variant="faded"
        onPress={() => {
          onOpen();
        }}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
}

export default React.memo(ListButton);
