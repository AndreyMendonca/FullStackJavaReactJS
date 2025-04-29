'use client'
import { Template } from "@/components";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import { useImageService } from "@/resources/image/image.service";

type FormProps = {
    name: string;
    tags: string;
    file: any;
}

const formScheme: FormProps = {name: '', tags:'',file:''}

const Page = () =>{
    const [imagePreview, setImagePreview] = useState<string>();
    const service = useImageService();

    const formik = useFormik<FormProps>({
        initialValues: formScheme,
        onSubmit: handleSubmit
    })

    async function handleSubmit(dados:FormProps){
        const formData = new FormData;
        formData.append("file", dados.file);
        formData.append("name", dados.name);
        formData.append("tags", dados.tags);

        await service.salvar(formData);
        formik.resetForm();
        setImagePreview('');
    }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>){
        if(event.target.files){
            const file = event.target.files[0]
            formik.setFieldValue("file", file);
            const imageURL = URL.createObjectURL(file)
            setImagePreview(imageURL);
        }
    }



    return (
        <Template>
            <section className="flex flex-col items-center justify-center my-5">
                <h2 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">Nova imagem</h2>
                <form onSubmit={formik.handleSubmit} className="w-full max-w-2xl">
                    <div className="grid grid-cols-1">
                        <label className="block text-lg font-medium leading-6 text-gray-600">Nome: *</label>
                        <InputText id="name" onChange={formik.handleChange} type="text" style="" placeholder="Nome da imagem"/>
                    </div>
                    <div className="mt-5 grid grid-cols-1">
                        <label className="block text-lg font-medium leading-6 text-gray-600">Tags: *</label>
                        <InputText id="tags" onChange={formik.handleChange} type="text" style="" placeholder="Digite separado por virgulas"/>
                    </div>
                    <div className="mt-5 grid grid-cols-1">
                        <label className="block text-lg font-medium leading-6 text-gray-600">Image: *</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4 items-center w-full ">
                            <div className="text-center">
                                {!imagePreview && 
                                    <svg xmlns="http://www.w3.org/2000/ svg" viewBox="0 0 24 24" fill="currentColor" className="size-14 text-gray-500 mx-auto">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                                    </svg>
                                }
                                
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-500">
                                        {!imagePreview && 
                                            <span>click para upload</span>
                                        }
                                        {
                                            !!imagePreview && 
                                            <img src={imagePreview} alt="" className="w-full h-full rounded-md" />
                                        }
                                        
                                        <input onChange={onFileUpload} type="file" className="sr-only" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6 md:justify-start">
                        <Button label="Salvar" color="bg-blue-500 hover:bg-blue-400" type="submit"/>
                        <Link href="/galeria">
                            <Button label="Cancelar" color="bg-red-500 hover:bg-red-400"/>
                        </Link>

                    </div>
                </form>
            </section>
        </Template>
    )
}

export default Page;