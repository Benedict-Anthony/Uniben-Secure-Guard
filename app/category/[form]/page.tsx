"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import Spinner from "@/components/shared/Spinner";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { database, storage } from "@/firebase";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

type Typesparams = {
  params: {
    form: string;
  };
};

type FormProps = {
  title: string;
  location: string;
  description: string;
  // images: [string];
};

const schema = yup.object({
  title: yup
    .string()
    .required("Please enter a short title")
    .max(50, "title should not be more than 50 characters"),
  location: yup.string().required("Please location is required"),
  description: yup
    .string()
    .required("Please give a short description of the situation"),
});

const ReportPage = ({ params: { form } }: Typesparams) => {
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormProps) => {
    try {
      const photoUrl: string[] = [];
      const collectionRef = collection(database, "reports");

      for (let i = 0; i < images.length; i++) {
        const storageRef = ref(storage, `reports/${uuidv4()}`);
        await uploadBytes(storageRef, images[i]);
        const url = await getDownloadURL(storageRef);
        photoUrl.push(url);
      }

      const reports = {
        ...data,
        date: new Date(),
        photoUrl,
        category: form.replace("%20", " "),
      };
      await addDoc(collectionRef, reports);
      reset();
      setImages([]);

      toast("Thanks for the report. The management will attend to it shortly");
      router.push("/trends");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container mx-auto mt-10 px-3">
      <form
        action=""
        className="w-full md:w-[700px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl md:text-3xl text-center font-bold">
          Report{" "}
          <span className="text-darkRed">{form.replace("%20", " ")}</span>
        </h1>
        <div className="form-control w-full">
          <label className="label label-text">What is happening?</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...register("title")}
          />
          <span className="text-error m-1">{errors.title?.message}</span>
        </div>
        <div className="form-control w-full">
          <label className="label label-text">Location</label>

          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...register("location")}
          />
          <span className="text-error m-1">{errors.location?.message}</span>
        </div>
        <div className="form-control">
          <div className="label label-text">please give a description</div>

          <textarea
            className="textarea textarea-bordered h-24 resize-none"
            placeholder="Type here"
            {...register("description")}
          ></textarea>
          <span className="text-error m-1">{errors.description?.message}</span>
        </div>
        <div className="file bg-gray-300 rounded-md cursor-pointer py-5 px-3">
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
          <div className="flex flex-col justify-center items-center mt-5">
            <Spinner />
          </div>
        ) : (
          <button className="btn btn-primary btn-outlined block w-full mt-6">
            Report
          </button>
        )}
      </form>
    </section>
  );
};

export default ReportPage;
