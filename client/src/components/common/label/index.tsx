interface labelProps{
    spanContent?: string
    inputType: string
}

function Label({spanContent, inputType}: labelProps){
    return(
        <label className={'block w-full'}>
            <span className={'text-gray-700'}>{spanContent}</span>
            <input type={inputType}
                   className={'mt-1 block w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none'} />
        </label>
    )
}

export default Label