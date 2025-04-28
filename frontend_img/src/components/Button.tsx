type Props = {
    color?: string;
    label?: string;
    onClick?: (event:any) => void;
}

export const Button = ({color, label, onClick}: Props) =>{
    return (
        <>
            <button onClick={onClick} className={`bg-${color}-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-${color}-400`}>{label}</button>
        </>
    )
}