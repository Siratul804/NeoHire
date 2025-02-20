"use client";

import { useUser } from "@clerk/nextjs";

export default function UserInfo() {
  const { user } = useUser();

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.fullName || user.firstName}!</h2>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <p>User ID: {user.id}</p>
      <img src={user.imageUrl} alt="User Profile" width={50} height={50} />
    </div>
  );
}
