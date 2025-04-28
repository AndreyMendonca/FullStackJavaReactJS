type Props = {
    id?: string;
    type: string, 
    style?: string,
    onChange?: (event:React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText = ({type, style, onChange, ...outrasProps}: Props) =>{
    return (
        <input 
            type={type}
            {...outrasProps}
            onChange={onChange}
            className={`${style} border px-5 py-2 rounded-lg text-gray-500 border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
        />
    )
}