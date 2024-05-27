import GalleryPopularDestinations from '@/components/layout/galleryPopularDestinations'
import BargainsGallery from '@/components/layout/bargainsGallery'
import Search from '../components/layout/searchBar/index'
import GalleryPropertyType from '@/components/layout/galleryPropertyType'
import BestRatedGallery from "@/components/layout/bestRatedGallery";


export default function Home() {
  return (
    <main className="text-gray-900 bg-brand-secondary flex flex-col items-center pt-4 gap-12 dark:bg-black">
       <Search />
       <GalleryPopularDestinations />
       <GalleryPropertyType />
       <BargainsGallery />
       <BestRatedGallery/>
    </main>
  )
}
