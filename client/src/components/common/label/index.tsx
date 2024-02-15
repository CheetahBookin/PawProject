interface labelProps{
    spanContent?: string
    inputType: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    placeholder?: string
    className: string
    noLabel?: boolean
    value?: string
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

function Label({spanContent, inputType, onChange, name, placeholder, className, noLabel = false, value, onKeyDown}: labelProps){
    return(
        <>
            {!noLabel ? 
            <label className={'w-full'}>
                <span className={'text-gray-700'}>{spanContent}</span>
                <input type={inputType}
                   className={className} 
                   onChange={onChange}
                   name={name}
                   placeholder={placeholder}/>
            </label> : 
                <input type={inputType}
                    className={className} 
                    onChange={onChange}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onKeyDown={onKeyDown}
                    />
            }
        </>
    )
}

export default Label