import { FullSearchResults } from "@/types/searchTypes";

interface SearchResultsProps {
    results: string[];
    setData: React.Dispatch<React.SetStateAction<{
        destination: string;
        checkInDate: string;
        checkOutDate: string;
        children: number;
        adults: number;
    }>>;
    destination: React.Dispatch<React.SetStateAction<string>>;
    clicked: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchResult?: React.Dispatch<React.SetStateAction<FullSearchResults | undefined>>;
}

function SearchResults({ results, setData, destination, clicked, setSearchResult }: SearchResultsProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent;
    if(text){
      setData((prevData) => ({
        ...prevData,
        destination: text
      }));
      destination(text);
      clicked(true);
      setSearchResult && setSearchResult(undefined)
    }
  }

  return (
    <div className="search-results absolute top-full mt-2 w-full bg-white shadow-md rounded-md border border-gray-300 dark:bg-background dark:text-font-dark-mode">
        <h3 className="text-lg font-semibold px-4 py-2 border-b border-gray-300">Search Results</h3>
        <div className="overflow-y-auto max-h-40">
            {results.map((result: string, index: number) => (
            <div key={index} className="px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer dark:hover:bg-gray-700" onClick={handleClick}>
                <p>{result}</p>
            </div>
            ))}
        </div>
    </div>
  );
}

export default SearchResults;
