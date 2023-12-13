/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function FilePage() {
  const [file, setFile] = useState<File | undefined>();
  const [message, setMessage] = useState<string>();
  const router = useRouter();

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
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
        setMessage(data.message);
        setTimeout(() => {
          router.push("/dashboard/my-files");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  },[file, router]);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  },[]);

  const handleMyFiles = useCallback(() => {
    router.push("/dashboard/my-files");
  },[]);

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
            className="w-52 h-52 object-contain mx-auto"
            width={205}
            height={205}
          />
        )}

        <button
          className="bg-green-900 text-zinc-100 p-2 rounded block w-full disabled:opacity-50 mt-3 mb-2"
          onClick={handleMyFiles}
        >
          My Files
        </button>
      </div>
      {message && <h2 className="text-gray-300 mt-3 mb-3 justify-center items-center">{message}</h2>}
    </div>
  );
}

export default FilePage;
