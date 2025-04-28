'use client'
import { Template } from "@/components";
import { ImageCard } from "@/components/ImageCard";
import { Image } from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";


const Page = () =>{
    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState('');
    const [extension, setExtension] = useState('');
    const [loading, setLoading] = useState(true);

    const searchImage = async () => {
        setLoading(true)
        const result = await useService.buscar(query, extension);
        setImages(result);
        setLoading(false);
    }

    useEffect(()=>{
        searchImage();
        setLoading(false);
    },[])

    return (
        <Template loading={loading}>
            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex-row md:flex space-x-4 w-full max-w-4xl items-center justify-center">
                    <InputText 
                        type="text"
                        onChange={e => setQuery(e.target.value)}
                        style="md:flex-1 w-[50%]"
                        placeholder="Digite o nome ou tags para buscar"
                    />

                    <select 
                        onChange={e => setExtension(e.target.value)} className="border border-gray-300 px-5 py-2 rounded-lg text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    >
                        <option value="">TODOS</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="GIF">GIF</option>
                    </select>
                    <div className="flex items-center justify-center space-x-4 mt-2 md:mt-0">
                        <Button label="Pesquisar" onClick={searchImage} color="bg-blue-500 hover:bg-blue-400"></Button>
                        <Link href="/formulario">
                            <Button label="Add foto" color="bg-yellow-500 hover:bg-yellow-400" ></Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {
                    images.map((img, index) =>(
                       <ImageCard 
                            key={index}
                            src={img.url}
                            nome={img.name}
                            tamanho={img.size}
                            dataUpload={img.uploadDate}
                            extension={img.extension}
                       />
                    ))
                }
            </section>
        </Template>
    )
}
export default Page;
