"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import axios from "axios";
import { getSession } from "next-auth/react";

function FilePage() {
  const [file, setFile] = useState<File | undefined>();
  const [imagen, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dataSession = await getSession();
      if (dataSession?.user) {
        const signupResponse = await axios.get("/api/auth/signup", {
          params: {
            email: dataSession.user?.email,
          },
        });
        console.log(
          "🚀 ~ file: page.tsx:22 ~ fetchData ~ signupResponse:",
          signupResponse
        );
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataSession = await getSession();
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", dataSession?.user?.email!);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImage(data.url);
        console.log("File uploaded successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  };

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <div className="bg-zinc-950 p-5">
        <h1 className="text-4xl text-center my-4">Upload a file</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
            onChange={handleFileChange}
          />

          <button
            className="bg-green-900 text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
            disabled={!file}
          >
            Upload
          </button>
        </form>
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt="Uploaded file"
            className="w-64 h-64 object-contain mx-auto"
            width={256}
            height={256}
          />
        )}
      </div>
      <div>MUCHOS IMAGENES SUBIDAS POR MI</div>
      <div>MUCHOS IMAGENES QUE ME COMPARTIERON</div>
    </div>
  );
}

export default FilePage;
