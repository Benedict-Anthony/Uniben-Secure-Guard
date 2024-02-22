"use client";
import Table from "@/components/Admin/Table";
import { auth, database } from "@/firebase";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [reports, setReports] = useState<ReportTypes[]>([]);
  const [isFetcthing, setIsFetcthing] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const signOutUser = async () => {
    if (confirm("Are yous sure you want to logout")) {
      await signOut(auth);
      router.replace("/auth");
    }
  };
  useEffect(() => {
    async function getReports() {
      try {
        setIsFetcthing(true);
        const collectionRef = collection(database, "reports");
        const queryRef = query(collectionRef);
        const unSubscribe = onSnapshot(queryRef, (snapshots) => {
          const data = snapshots.docs.map((docs) => ({
            ...docs.data(),
            id: docs.id,
          }));
          setReports(data as unknown as ReportTypes[]);
        });
        setIsFetcthing(false);
        return unSubscribe;
      } catch (error) {}
    }
    getReports();
  }, []);

  useEffect(() => {
    if (!user) {
      //   toast("You're not allowed to make these actions");
      router.replace("/auth");
    }
  }, [router, user]);

  return (
    <section className="container mx-auto w-full">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold py-3">Welcome, Admin</h1>
        <button className="btn btn-primary" onClick={signOutUser}>
          Logout
        </button>
      </div>
      <Table reports={reports} isFetcthing={isFetcthing} />
    </section>
  );
};

export default AdminDashboard;
