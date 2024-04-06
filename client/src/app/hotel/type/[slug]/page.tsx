"use client"

import HotelTypeCard from "@/components/common/hotelTypeCard";
import Loading from "@/components/common/loading";
import { browseByPropertyType, getHotelsTypes } from "@/services/hotelsService";
import { HotelTypes } from "@/types/hotelTypes";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function PropertyType() {
    const router = useRouter();
    const [hotelsTypes, setHotelsTypes] = useState([] as HotelTypes[]);
    const [loading, setLoading] = useState<boolean>(true);
    const pathname = usePathname()
    const slug = pathname.split('/').pop() || ''

    const createSlug = (name: string) => {
        return name.toLowerCase()
    }

    useEffect(() => {
        const fetchHotelsTypes = async () => {
            try {
                const response = await browseByPropertyType(slug);
                if (!response) {
                    throw new Error("No hotels found");
                }
                const responseSlug: string = createSlug(response.data[0].type)
                if (responseSlug !== slug) {
                    throw new Error("No hotel found");
                }
                document.title = slug.charAt(0).toUpperCase() + slug.slice(1) + "s";
                setHotelsTypes(response.data as HotelTypes[]);
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        fetchHotelsTypes();
    }, [slug]);

    const createSlugHotel = (name: string, id: number) => {
        return `${name.toLowerCase().split(' ').join('-')}-${id}`;
    }

    const handleClick = (name: string, id: number) => {
        const slug = createSlugHotel(name, id)
        router.push(`/hotel/${slug}`);
    }

    return (
        <Suspense fallback={<Loading />}>
            {loading ? (
                <Loading />
            ) : (
                <main className="flex flex-col justify-center">
                    {hotelsTypes ? hotelsTypes.map((hotelType, index) => (
                        <div key={index} className="flex bg-brand-secondary text-black cursor-pointer p-4 border border-gray-200 rounded-lg mb-4" onClick={() => handleClick(hotelType.name, hotelType.id)}>
                            <div className="flex-shrink-0 mr-4">
                                <img src={hotelType.images[0].image} alt={hotelType.name} className="w-40 h-40 object-cover rounded-lg" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{hotelType.name}</h2>
                                <p className="text-gray-600">{hotelType.city}</p>
                            </div>
                        </div>
                    )) : <Loading />}
                </main>
            )}
        </Suspense>
    )
}

export default PropertyType;
