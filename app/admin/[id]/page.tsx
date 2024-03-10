"use client";
import Spinner from "@/components/shared/Spinner";
import { auth, database } from "@/firebase";
import { formatDate } from "@/utils/formatDate";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

type Params = {
  params: {
    id: string;
  };
};

const schema = yup.object({
  comment: yup
    .string()
    .min(10, "Comments should not be less that 10 charaters")
    .max(300, "Comments should not be less than 300 charaters")
    .required("Please this field is required"),
});

type Comments = {
  comment: string;
};

const Details = ({ params: { id } }: Params) => {
  const [report, setReport] = useState<ReportTypes | null>(null);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Comments>({
    resolver: yupResolver(schema),
  });

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

  async function onSubmit(data: Comments) {
    console.log(data);
    const { comment } = data;
    const docRef = doc(database, "reports", id);
    await updateDoc(docRef, {
      addressed: true,
      comment,
      commentedBy: user?.displayName,
    });
    reset();
    router.back();

    try {
    } catch (error) {
      throw new Error("Something went wrong...");
    }
  }
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
      {report && (
        <Fragment>
          {/* The button to open modal */}
          <label htmlFor="my_modal_6" className="btn">
            Leave a comment
          </label>

          {/* Put this part before </body> tag */}

          <input type="checkbox" id="my_modal_6" className="modal-toggle" />

          <div className="modal" role="dialog">
            <div className="modal-box">
              <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn btn-warning">
                  Cancel
                </label>
              </div>
              <h3 className="font-bold text-lg my-5">
                Leave a summary of for this report!
              </h3>

              <form action="" onClick={handleSubmit(onSubmit)}>
                <label className="form-control">
                  <span className="text-error">{errors.comment?.message}</span>
                  <textarea
                    {...register("comment")}
                    className="textarea textarea-bordered h-24 resize-none"
                    placeholder="Bio"
                  ></textarea>
                </label>
                <div className="modal-action">
                  <button className="btn btn-primary">Comments</button>
                </div>
              </form>
            </div>
          </div>
          <button
            className="btn btn-error mt-5 inline-block ml-5"
            onClick={deleteReport}
          >
            Delete Report
          </button>
        </Fragment>
      )}
    </section>
  );
};

export default Details;
