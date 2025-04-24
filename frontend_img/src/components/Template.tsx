type Props = {
    children: React.ReactNode;
}

export const Template = ({children}: Props) =>{
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Header/>
                <div className="flex-grow container mx-auto mt-8 px-4">
                    {children}
                </div>

                <Footer/>
            </div>

        </>
    )
}

const Header = () =>{
    return (
        <header className="bg-indigo-950 text-white py-3">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-3xl font-bold"> ImageLite</h1>
            </div>
        </header>
    )
}

const Footer = ()=>{
    return (
        <footer className="bg-indigo-950 text-white py-4 mt-8">
            <div className="contianer mx-auto text-center">
                Desenvolvido por Andrey
            </div>
        </footer>
    )
}