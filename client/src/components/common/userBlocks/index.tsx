type UserBlocksProps = {
    header: string;
    children: React.ReactNode;
}

function UserBlocks({ header, children }: UserBlocksProps) {
  return (
    <div className="w-[30%] shadow border rounded-lg flex flex-col justify-center">
        <h1 className='text-center text-xl font-bold'>{header}</h1>
        {children}
    </div>
  )
}

export default UserBlocks
