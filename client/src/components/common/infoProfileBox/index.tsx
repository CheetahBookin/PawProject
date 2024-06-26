type InfoProfileBoxProps = {
    text: string;
    children: React.ReactNode;
}

function InfoProfileBox({ text, children }: InfoProfileBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 text-center h-1/3 w-2/5">
        <h1 className="text-xl font-bold mb-4">{text}</h1>
        {children}
    </div>
  );
}

export default InfoProfileBox;
