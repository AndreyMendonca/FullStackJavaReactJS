'use client'
import { Template } from "@/components";
import { ImageCard } from "@/components/ImageCard";
import { Image } from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";
import { useState } from "react";

const Page = () =>{
    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState('');
    const [extension, setExtension] = useState('');

    const searchImage = async () => {
        const result = await useService.buscar(query, extension);
        setImages(result);
    }

    return (
        <Template>
            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex space-x-4 w-full max-w-4xl items-center justify-center">
                    <input 
                        type="text" 
                        name={query}
                        onChange={e => setQuery(e.target.value)}
                        className="flex-1 border px-5 py-2 rounded-lg text-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500" 
                    />

                    <select 
                        onChange={e => setExtension(e.target.value)} className="border border-gray-300 px-5 py-2 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    >
                        <option value="">TODOS</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="GIF">GIF</option>
                    </select>
                    <button onClick={searchImage} className="bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer">Pesquisar</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl cursor-pointer">Add foto</button>
                </div>
            </section>

            <section className="grid grid-cols-3 gap-8">
                {
                    images.map((img, index) =>(
                       <ImageCard 
                            key={index}
                            src={img.url}
                            nome={img.name}
                            tamanho={img.size}
                            dataUpload={img.uploadDate}
                       />
                    ))
                }
            </section>
        </Template>
    )
}
export default Page;
