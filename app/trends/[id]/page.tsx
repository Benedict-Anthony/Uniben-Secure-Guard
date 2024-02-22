"use client";
import Spinner from "@/components/shared/Spinner";
import { database } from "@/firebase";
import { formatDate } from "@/utils/formatDate";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

type Params = {
  params: {
    id: string;
  };
};
const DetailsPage = ({ params }: Params) => {
  const [article, setArticle] = useState<Trends | null>();
  const router = useRouter();
  useEffect(() => {
    const getAllArticle = async () => {
      try {
        const docRef = doc(database, "articles", params.id);
        const snapShots = await getDoc(docRef);
        if (!snapShots.exists()) {
          router.push("/not-found");
          return;
        }

        setArticle({
          ...snapShots.data(),
          id: snapShots.id,
        } as unknown as Trends);
      } catch (error) {}
    };

    getAllArticle();
  }, [params.id, router]);
  return (
    <section className="container mx-auto px-2">
      {!article ? (
        <div className="flex flex-col justify-center items-center mt-5 w-full h-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row-reverse">
          <div className="mt-5 flex-1">
            <Image
              src={article.photoUrl[0]}
              height={300}
              width={300}
              alt={article.title}
              className="w-full"
            />
          </div>
          <div className="flex-1 mt-5">
            <h3 className="text-xl font-bold">{article.title}</h3>
            <div className="badge badge-primary py-3 px-1 mt-4">
              {article.tag}
            </div>

            <p className="text-md mt-2 w-full">{article.description}</p>
            <div className="flex flex-row justify-start items-center mt-4 space-x-5">
              <h3 className="text-md">
                Author: <span className="font-bold">{article.author.name}</span>
              </h3>
              <div className="avatar">
                <div className="w-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <Image
                    src={article.author.avatar}
                    height={30}
                    width={30}
                    alt={article.author.name}
                  />
                </div>
              </div>
            </div>
            <span className="mt-10 inline-block font-semibold text-secondary text-sm">
              {formatDate(article.createdAt.seconds)}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailsPage;
