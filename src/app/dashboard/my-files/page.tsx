/* eslint-disable react-hooks/exhaustive-deps */
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
import ShareIcon from "@/components/ShareIcon";
import DownloadIcon from "@/components/DownloadIcon";
import DeleteIcon from "@/components/DeleteIcon";
import ListButton from "@/components/ListButton";

function MyFiles() {

  const [files, setFiles] = useState<[]>();
  const [userShare, setUserShare] = useState<[]>();
  const [email, setEmail] = useState("");
  const [emailShare, setEmailShare] = useState("");
  const [urlShare, setUrlShare] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const CLOUDINARY_URL = "https://res.cloudinary.com/dqcz2mhzo/image/upload/";
  const DOWNLOAD = "fl_attachment/";
  const formData = new FormData();

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
    return <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center text-4xl">Cargando....</div>;
  }

  const onShareFile = async () => {
    try {
      formData.append("url", urlShare);
      formData.append("email", emailShare);
      await fetch("/api/share", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDownloadFile = async (url: string) => {
    try {
      const newUrl = CLOUDINARY_URL + DOWNLOAD;
      const file = url.slice(CLOUDINARY_URL.length);
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

  const onDeleteFile = async (url: string) => {
    try {
      formData.append("url", url);
      formData.append("email", email);
      await fetch("/api/delete", {
        method: "POST",
        body: formData,
      });
      location.reload();
    } catch (error) {}
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center">
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
                  }}
                >
                  Share
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <h1 className="mr-4 ml-4 mt-5 mb-6 text-3xl">Imagenes Propias</h1>
      <div className="flex-1 w-screen h-screen">
        <div className="justify-center items-center grid grid-cols-5 gap-4 mr-4 ml-4">
          {files.length > 0 ? (
            files.map((image, idx) => (
              <div key={idx} className="bg-transparent rounded-xl flex flex-1 flex-col relative">
                <Image
                  key={idx}
                  src={image}
                  alt="Uploaded file"
                  className="w-52 h-52 object-contain mx-auto"
                  width={150}
                  height={150}
                />
                <ListButton
                  image={image}
                  setUrlShare={setUrlShare}
                  onDeleteFile={onDeleteFile}
                  onDownloadFile={onDownloadFile}
                  onOpenShare={onOpen}
                />
              </div>
            ))
          ) : (
            <h2 className="flex justify-center items-center  w-screen h-unit-14 text-3xl">No hay imagenes cargadas</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyFiles;
