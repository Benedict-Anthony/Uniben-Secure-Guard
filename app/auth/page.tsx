"use client";
import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthButton = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast("Sign in sucessful..");
      router.replace("/admin");
    } catch (error) {
      throw new Error("Something went Wrong...");
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/admin");
    }
  }, [router, user]);
  return (
    <section className="container mx-auto flex flex-col justify-center items-center h-[50vh]">
      <button
        className="btn btn-outline mt-5 flex justify-between items-center gap-x-5"
        onClick={googleLogin}
      >
        <span className="md:text-[15px]">Login with your staff Email</span>
        <FcGoogle size={30} />
      </button>
    </section>
  );
};

export default AuthButton;
