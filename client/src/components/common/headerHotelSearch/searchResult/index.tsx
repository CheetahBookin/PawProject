import { HotelTypesShort } from "@/types/hotelTypes";
import { useRouter } from "next/navigation";

interface SearchResultProps {
    result: HotelTypesShort;
    setResults: React.Dispatch<React.SetStateAction<HotelTypesShort[]>>;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

function SearchResult({ result, setResults, setSearchValue }: SearchResultProps) {
    const router = useRouter();
    const createSlug = (name: string, id: number) =>{
        return `${name.toLowerCase().split(' ').join('-')}-${id}`;
    }
    const handleClick = () =>{
        const slug = createSlug(result.name, result.id)
        router.push(`/hotel/${slug}`);
        setResults([] as HotelTypesShort[]);
        setSearchValue("");
    }
    return (
      <div className="border-b border-gray-300 p-2 cursor-pointer hover:bg-gray-300" onClick={handleClick} key={result.id}>
        <p>{result.name} | {result.country}</p>
      </div>
    );
}

export default SearchResult;