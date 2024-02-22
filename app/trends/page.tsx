"use client";
import Trend from "@/components/Trend";
import Spinner from "@/components/shared/Spinner";
import { database } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

const Trends = () => {
  const [articles, setArticles] = useState<Trends[] | null>(null);

  useEffect(() => {
    const getAllArticles = async () => {
      try {
        const collectionRef = collection(database, "articles");
        const queryRef = query(collectionRef, orderBy("timeStamp", "desc"));
        const unSubscribe = onSnapshot(queryRef, (snapShots) => {
          const data = snapShots.docs.map((docs) => ({
            ...docs.data(),
            id: docs.id,
          }));
          setArticles(data as Trends[]);
        });

        return unSubscribe;
      } catch (error) {
        console.log(error);
      }
    };

    getAllArticles();
  }, []);
  return (
    <section className="container mx-auto mt-10">
      {!articles ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <h2 className="text-xl md:text-3xl font-bold my-3">
            SafeGuard Latest News{" "}
          </h2>
          <div className="flex flex-row justify-between items-start gap-5">
            {/* <div className="border border-primary p-2 w-2/3 flex-1">
              <Image
                src={articles[0].photoUrl[0]}
                width={200}
                height={200}
                alt={articles[0].title}
                className="w-full "
              />

              <div className="">
                <h2 className="py-3 text-xl font-semibold">
                  {articles[0].title}
                </h2>
                <div className="px-1 py-2 text-sm inline rounded-md bg-primary text-white ">
                  {articles[0].tag}
                </div>
                <p className="text-md py-2">{articles[0].excert}</p>
                <button className="btn btn-neutral inline-block w-1/2">
                  <Link href={`/trends/${articles[0].id}`}>Details</Link>
                </button>
              </div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {articles.map((article) => (
                <Link href={`/trends/${article.id}`} key={article.id}>
                  <div className=" border bg-gray-300 p-2 mb-3 h-[30rem] overflow-y-hidden">
                    <Image
                      src={article.photoUrl[0]}
                      height={200}
                      width={200}
                      alt={article.title}
                      className="w-full object-cover"
                    />
                    <div className="">
                      <h2 className="py-3 text-xl font-semibold">
                        {article.title}
                      </h2>
                      <div className="px-1 py-2 text-sm inline rounded-md bg-primary text-white">
                        {article.tag}
                      </div>
                      <p className="text-md py-2">{article.excert}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* {
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {articles.map((article) => (
                <Trend article={article} key={article.id} />
              ))}
            </div>
          } */}
        </Fragment>
      )}
    </section>
  );
};

export default Trends;
