import { Template } from "@/components";
import { ImageCard } from "@/components/ImageCard";

const Page = () =>{
    return (
        <Template>
            <section className="grid grid-cols-3 gap-8">
                <ImageCard src="https://images.squarespace-cdn.com/content/v1/5b51083c3e2d091347d2e6fe/1638462278514-4YWH839J25OURZLJUI5C/mike-benna-SBiVq9eWEtQ-unsplash.jpg" nome="Natureza" dataUpload="101010" tamanho="10"/>
            </section>
        </Template>
    )
}
export default Page;
