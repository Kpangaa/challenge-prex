"use client"

import { Autocomplete, AutocompleteItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react'

interface ModalShareProps {
    isOpen: boolean
    onOpenChange: () => void
    userShareEmail: never[] | undefined
    setEmailShare: (value: React.SetStateAction<string>) => void
    onShareFile: () => Promise<void>
}
function ModalShare({isOpen, onOpenChange, userShareEmail, setEmailShare, onShareFile}: ModalShareProps) {
  return (
    <>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Share file
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Autocomplete label="Select an user" className="max-w-xs">
                    {userShareEmail!.map((userShare) => (
                      <AutocompleteItem
                        key={(userShare as any)._id}
                        style={{ color: "black" }}
                        value={(userShare as any).email as string}
                        onClick={(e) =>
                          setEmailShare((e.target as any).outerText as string)
                        }
                      >
                        {(userShare as any).email}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    onShareFile();
                    onClose();
                    setTimeout(() => {
                      window.alert('The file was shared successfully');
                    }, 1000);
                  }}
                >
                  Share
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalShare