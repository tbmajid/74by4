import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

export default function User() {
  const route = useRouter();
  const { user, error, isLoading } = useUser();
  if (!user)
    return (
      <div onClick={() => route.push(`/api/auth/login`)}>
        <FaUserCircle className="text-2xl text-gray-800 cursor-pointer relative border-none bg-transparent" />
      </div>
    );
  return (
    <button
      className="cursor-pointer relative border-none bg-transparent"
      onClick={() => route.push(`/profile`)}
    >
      {/* <img src={user.picture} alt={user.name} /> */}
      <div className="text-xs pr-3">
        Hello, {user.name}
        <br />
        <span className="text-sm">Account Dashboard</span>
      </div>
    </button>
  );
}
