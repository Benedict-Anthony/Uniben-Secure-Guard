"use client";
import { blogPostTags } from "@/data/articleCategory";
import { auth, database, storage } from "@/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Spinner from "@/components/shared/Spinner";
import { toast } from "react-toastify";

const schema = yup.object({
  title: yup.string().required("please this field is required"),
  description: yup.string().required("please this field is required"),
  tag: yup.string().required("this field is required"),
});

type FormtTypes = {
  title: string;
  description: string;
  tag: string;
};

const NewArticles = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormtTypes>({
    resolver: yupResolver(schema),
  });

  const [user] = useAuthState(auth);
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const onSubmit = async (data: FormtTypes) => {
    try {
      const { title, description, tag } = data;

      let excert: string[] | string = description.split(" ");
      if (excert.length >= 30) {
        excert = excert.slice(0, 30).join(" ");
      } else {
        excert = excert.join(" ");
      }

      const createdAt = new Date();
      const author = { name: user?.displayName, avatar: user?.photoURL };

      const photoUrl: string[] = [];
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const storageRef = ref(storage, `articles/${uuidv4()}`);
          await uploadBytes(storageRef, images[i]);
          const url = await getDownloadURL(storageRef);
          photoUrl.push(url);
        }
      }
      const value = {
        title,
        description,
        tag,
        createdAt,
        author,
        photoUrl,
        excert,
        timeStamp: serverTimestamp(),
      };

      const collectionRef = collection(database, "articles");

      await addDoc(collectionRef, value);
      reset();
      toast("Post was succefull...");
      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      return router.back();
    }
  }, []); // eslint-disable-line

  return (
    <section className="container mx-auto px-3 flex flex-col justify-center items-center mt-4">
      <h2 className="text-3xl font-bold py-3">Make A New Post</h2>
      <form className="w-full md:w-[550px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mt-3 ">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          {errors.title?.message && (
            <span className="text-error">{errors.title.message}</span>
          )}
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...register("title")}
          />
        </div>
        <div className="form-control w-full mt-5">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          {errors.tag?.message && (
            <span className="text-error">{errors.tag?.message}</span>
          )}
          <select className="select input-bordered w-full" {...register("tag")}>
            {blogPostTags.map((tag) => (
              <option value={tag.name} key={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <label className="form-control mt-4">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          {errors.description?.message && (
            <span className="text-error">{errors.description.message}</span>
          )}
          <textarea
            className="textarea textarea-bordered h-24 resize-none"
            placeholder="Body of your article"
            {...register("description")}
          ></textarea>
        </label>

        <div className="file bg-gray-300 rounded-md cursor-pointer  mt-3 py-5 px-3">
          <Dropzone onDrop={(acceptedFiles) => setImages(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div className="bg-blue">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag drop some files here, or click to select files</p>
                </div>
              </div>
            )}
          </Dropzone>
        </div>
        {isSubmitting ? (
          <div className="flex flex-col justify-center items-center mt-4">
            <Spinner />
          </div>
        ) : (
          <button className="btn btn-neutral block w-full mt-3 text-md">
            Publish
          </button>
        )}
      </form>
    </section>
  );
};

export default NewArticles;
