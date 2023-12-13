import Link from "next/link";
import { getServerSession } from "next-auth";
import { memo } from "react";

async function Navbar() {
  const session = await getServerSession();

  return (
    <nav className="bg-zinc-900 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl">Prex Challenge</h1>
        </Link>

        <ul className="flex gap-x-2">
          {session ? (
            <>
              <li className="px-3 py-1">
                <Link href="/dashboard/profile">Perfil</Link>
              </li>
              <li className="px-3 py-1">
                <Link
                  href="/dashboard/upload-files"
                  as={`/dashboard/upload-files`}
                >
                  Upload File
                </Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/dashboard/my-files" as={`/dashboard/my-files`}>
                  My Files
                </Link>
              </li>
              <li className="px-3 py-1">
                <Link
                  href="/dashboard/my-files-share"
                  as={`/dashboard/my-files-share`}
                >
                  My shared files
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-3 py-1">
                <Link href="/about">About</Link>
              </li>
              <li className="bg-indigo-500 px-3 py-1">
                <Link href="/">Login</Link>
              </li>
              <li className="bg-indigo-700 px-3 py-1">
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default memo(Navbar);
