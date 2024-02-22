"use client";
import Spinner from "@/components/shared/Spinner";
import { database } from "@/firebase";
import { formatDate } from "@/utils/formatDate";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Params = {
  params: {
    id: string;
  };
};
const Details = ({ params: { id } }: Params) => {
  const [report, setReport] = useState<ReportTypes | null>(null);
  const router = useRouter();

  const deleteReport = async () => {
    if (confirm("Are you sure you want to delete this report?")) {
      try {
        const docRef = doc(database, "reports", id);
        await deleteDoc(docRef);
        toast("Report deleted...");
        router.push("/admin");
      } catch (error) {}
    }
  };
  useEffect(() => {
    async function getReport() {
      try {
        const docRef = doc(database, "reports", id);
        const snapshots = await getDoc(docRef);
        if (!snapshots.exists()) {
          router.push("/not-found");
          return;
        }

        const data = { ...snapshots.data(), id: snapshots.id };
        setReport(data as ReportTypes);
      } catch (error) {}
    }
    getReport();
  }, [id, router]);

  return (
    <section className="container mx-auto px-3">
      {!report ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <Spinner />
          <p className="md;text-xl m-3">Please wait...</p>
        </div>
      ) : (
        <div className="mt-5">
          <h3 className="md:text-2xl font-semibold py-3">{report.title}</h3>
          <h3>Reported on {formatDate(report.date.seconds)}</h3>
          <p className="md:text-xl my-2">{report.description}</p>

          {report.photoUrl.length > 0 && <h3>Evidences</h3>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
            {report.photoUrl.map((item, index) => (
              <div key={index + 1} className="w-full">
                <Image
                  src={item}
                  width={200}
                  height={200}
                  alt=""
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="btn btn-error mt-5" onClick={deleteReport}>
        Delete Report
      </button>
    </section>
  );
};

export default Details;
