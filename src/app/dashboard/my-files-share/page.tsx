"use client";

import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function MyFiles() {
  const [files, setFiles] = useState<[]>();

  useEffect(() => {
    const fetchData = async () => {
      const dataSession = await getSession();
      if (dataSession?.user) {
        const signupResponse = await axios.get("/api/auth/signup", {
          params: {
            email: dataSession.user?.email,
          },
        });
        setFiles(signupResponse.data.userFound.shareFileUrl);
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  if (!files) {
    return <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center text-4xl">Cargando....</div>;
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center">
      <h1 className="mr-4 ml-4 mt-5 mb-6 text-3xl">Imagenes que me compartieron</h1>
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
                  width={100}
                  height={100}
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