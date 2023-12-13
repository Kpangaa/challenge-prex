/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import ListButton from "@/components/ListButton";
import ModalShare from "@/components/ModalShare";

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
    return <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center text-4xl">Loading file....</div>;
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
      <ModalShare 
        isOpen={isOpen}
        setEmailShare={setEmailShare}
        userShareEmail={userShareEmail}
        onOpenChange={onOpenChange}
        onShareFile={onShareFile}
      />
      <h1 className="mr-4 ml-4 mt-5 mb-6 text-3xl">Own files</h1>
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
            <h2 className="flex justify-center items-center  w-screen h-unit-14 text-3xl">No files uploaded</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyFiles;
