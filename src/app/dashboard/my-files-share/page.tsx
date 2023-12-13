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
    return <div>Cargando....</div>;
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center">
      <div>
        <h1>Imagenes que me compartieron</h1>
        <div className="justify-center grid grid-cols-5 flex-col">
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