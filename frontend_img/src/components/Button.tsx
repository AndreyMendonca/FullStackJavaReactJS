type Props = {
    color?: string;
    label?: string;
    onClick?: (event:any) => void;
    type?: "submit" | "button" | "reset" | undefined
}

export const Button = ({color, label, onClick, type}: Props) =>{
    return (
        <>
            <button 
                onClick={onClick} 
                className={`${color} text-white px-4 py-2 rounded-xl cursor-pointer`}
                type={type}>
                    {label}
            </button>
        </>
    )
}