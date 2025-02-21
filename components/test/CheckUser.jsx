"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import UserRegistration from "../UserRegistration"; // Import the registration form
import { useRouter } from "next/navigation"; // Updated import for useRouter

export default function UserProfile() {
  const { user: clerkUser, isLoaded } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const router = useRouter(); // Initialize the router

  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk user to load
    if (!clerkUser?.id) {
      setError("User ID is required.");
      setLoading(false);
      return;
    }

    // if (!showRegistration) {
    //   router.push(`/dashboard`);
    // }

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/getUserById/${clerkUser.id}`);
        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          if (response.status === 404) {
            setShowRegistration(true); // User not found, show registration
          } else {
            throw new Error(data.error || "Failed to fetch user");
          }
        } else {
          setUserData(data.user_data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [clerkUser, isLoaded]);

  if (!isLoaded) return <p>Loading Clerk user...</p>;
  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;

  // Show registration form if user is not found
  if (showRegistration) {
    return <UserRegistration clerkUser={clerkUser} />;
  }

  // Ensure userData is defined before accessing its properties
  if (!userData) {
    return <p>No user data available.</p>;
  }

  return <></>;
}
