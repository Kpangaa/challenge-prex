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
        setFiles(signupResponse.data.myFilesUrl);
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
    <div>
      <div>
        <h1>Imagenes Propias</h1>
        <div className="justify-center grid grid-cols-5 flex-col">
          {files.length > 0 &&
            files.map((image, idx) => (
              <Image
                key={idx}
                src={image}
                alt="Uploaded file"
                className="w-60 h-60 object-contain mx-auto"
                width={100}
                height={100}
              />
            ))}
        </div>
      </div>
      <div>
        <h1>Imagenes que me compartieron</h1>
        <div className="justify-center grid grid-cols-5 flex-col">
          {files.length > 0 &&
            files.map((image, idx) => (
              <Image
                key={idx}
                src={image}
                alt="Uploaded file"
                className="w-60 h-60 object-contain mx-auto"
                width={100}
                height={100}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyFiles;
