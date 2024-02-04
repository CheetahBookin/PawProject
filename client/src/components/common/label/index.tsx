interface labelProps{
    spanContent?: string
    inputType: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
}

function Label({spanContent, inputType, onChange, name}: labelProps){
    return(
        <label className={'block w-full'}>
            <span className={'text-gray-700'}>{spanContent}</span>
            <input type={inputType}
                   className={'mt-1 block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none text-gray-600'} 
                   onChange={onChange}
                   name={name}/>
        </label>
    )
}

export default Label