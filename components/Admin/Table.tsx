"use cleint";
import { formatDate } from "@/utils/formatDate";
import React from "react";
import Spinner from "../shared/Spinner";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "@/firebase";
import { toast } from "react-toastify";

import { FaCheckCircle } from "react-icons/fa";

type TableProps = {
  reports: ReportTypes[];
  isFetcthing: boolean;
};
const Table = ({ reports, isFetcthing }: TableProps) => {
  const deleteReport = async (id: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      try {
        const docRef = doc(database, "reports", id);
        await deleteDoc(docRef);
        toast("Report deleted...");
      } catch (error) {}
    }
  };
  return (
    <div className="w-full">
      {isFetcthing ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Spinner />
        </div>
      ) : reports.length === 0 && !isFetcthing ? (
        <h1 className="font-bold mt-4 text-xl">No report </h1>
      ) : (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Date</th>
              <th>Addressed</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {reports.map((item, index) => (
              <tr
                className={`my-2 ${
                  index % 2 == 0 ? "bg-base-200" : "bg-base-100"
                }`}
                key={item.id}
              >
                <th>{item.title}</th>
                <td>{item.category}</td>
                <td>{item.location}</td>
                <td>{formatDate(item.date.seconds)}</td>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                    readOnly={true}
                    checked={item.addressed}
                  />
                </td>
                <td>
                  <button className="btn btn-neutral">
                    <Link href={`/admin/${item.id}`}>Details</Link>
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-error"
                    onClick={() => deleteReport(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
