'use client'
import { Template } from "@/components";
import { ImageCard } from "@/components/ImageCard";
import { Image } from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";
import { useState } from "react";

const Page = () =>{


    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);

    const searchImage = async () => {
        const result = await useService.buscar();
        setImages(result);
        console.table(images);
    }

    return (
        <Template>
            <button onClick={searchImage} className="bg-gray-500">Buscar images</button>
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
