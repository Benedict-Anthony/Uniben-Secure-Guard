import { caseReports } from "@/data/caseReports";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="container mx-auto mt-10 px-4">
      <h1 className="text-xl mt-3 mb-5 w-full md:w-[550px] md:text-3xl md:text-left text-center font-semibold">
        Please select an appropriate category of your report
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {caseReports.map((item) => (
          <div
            className="card w-full bg-neutral text-neutral-content"
            key={item.id}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                {item.category} {item.icon}
              </h2>
              <p>{item.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary">
                  <Link href={`/category/${item.category}`}>Report Now</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
