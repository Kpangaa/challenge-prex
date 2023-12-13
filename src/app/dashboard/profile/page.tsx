/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh()
  };
  useEffect(() => {
    handleRefresh()
  
    return () => {
      handleRefresh()
    }
  }, [])

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center">
      <h1 className="font-bold text-3xl">Profile</h1>

      <pre className="bg-zinc-800 p-4">
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
          2
        )}
      </pre>

      <button
        className="bg-zinc-800 px-4 py-2 block mb-2"
        onClick={() => {
          signOut();
        }}
      >
        Signout
      </button>
    </div>
  );
}

export default ProfilePage;