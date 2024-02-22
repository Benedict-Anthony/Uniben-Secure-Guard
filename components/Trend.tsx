import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  article: Trends;
};
const Trend = ({ article }: Props) => {
  return (
    <Link
      href={`/trends/${article.id}`}
      className="card w-full md:w-96 bg-base-100 my-2 shadow-xl"
    >
      <div>
        <figure>
          {/* <div className=" border bg-gray-300 p-2 mb-3 flex-1 w-full"> */}
          <Image
            src={article.photoUrl[0]}
            height={200}
            width={200}
            alt={article.title}
            className="w-full object-cover"
          />
          {/* </div> */}
        </figure>
        <div className=" px-1 py-2">
          <h2 className="card-title">{article.title}</h2>
          <p>{article.excert}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-neutral py-4 rounded-md">
              {article.tag}
            </div>
          </div>
          {/* <p className="mt-34">{article.author.name}</p> */}
        </div>
      </div>
    </Link>
  );
};

export default Trend;
