"use client";

import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

function MyFiles() {
  const [files, setFiles] = useState<[]>();
  const [userShare, setUserShare] = useState<[]>();
  const [email, setEmail] = useState("");
  const [emailShare, setEmailShare] = useState("");
  const [urlShare, setUrlShare] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const CLOUDINARY_URL = "https://res.cloudinary.com/dqcz2mhzo/image/upload/";

  useEffect(() => {
    const fetchData = async () => {
      const dataSession = await getSession();
      setEmail(dataSession?.user?.email!);
      if (dataSession?.user) {
        const signupResponse = await axios.get("/api/auth/signup", {
          params: {
            email: dataSession.user?.email,
          },
        });
        setFiles(signupResponse.data.userFound.myFilesUrl);
        setUserShare(signupResponse.data.userFounds);
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  const userShareEmail = userShare?.filter(
    (user) => (user as any).email !== email
  );

  if (!files) {
    return <div>Cargando....</div>;
  }

  const onShareFile = async () => {
    try {
      const formData = new FormData();
      formData.append("url", urlShare);
      formData.append("email", emailShare);
      const resp = await fetch("/api/share", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDownloadFile = async () => {
    try {
      const newUrl = CLOUDINARY_URL + "fl_attachment/";
      const file = urlShare.slice(CLOUDINARY_URL.length);
      const fileName = file.split("/").pop();
      if (fileName) {
        const aTag = document.createElement("a");
        aTag.href = newUrl + file;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteFile = async () => {
    try {
      
    } catch (error) {
    
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
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
                        style={{ color: "black" }}
                        key={(userShare as any)._id}
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
                  }}
                >
                  Share
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div>
        <h1>Imagenes Propias</h1>
        <div className="justify-center grid grid-cols-5 flex-col gap-5">
          {files.length > 0 ? (
            files.map((image, idx) => (
              <div key={idx} className="bg-gray-600 rounded-xl">
                <Image
                  key={idx}
                  src={image}
                  alt="Uploaded file"
                  className="w-52 h-52 object-contain mx-auto"
                  width={100}
                  height={100}
                />
                <div>
                  <Button
                    onPress={() => {
                      setUrlShare(image);
                      onOpen();
                    }}
                    color="primary"
                  >
                    Share
                  </Button>
                  <Button
                    onPress={() => {
                      setUrlShare(image);
                      onDownloadFile();
                    }}
                    color="default"
                  >
                    DO
                  </Button>
                  <Button
                    onPress={() => {
                      setUrlShare(image);
                      onOpen();
                    }}
                    color="warning"
                  >
                    DE
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <h2>No hay imagenes cargadas</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyFiles;
