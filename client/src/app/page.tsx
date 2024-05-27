import GalleryPopularDestinations from '@/components/layout/galleryPopularDestinations'
import BargainsGallery from '@/components/layout/bargainsGallery'
import GallerySlider2 from '@/components/layout/gallerySlider2'
import Search from '../components/layout/searchBar/index'
import GalleryPropertyType from '@/components/layout/galleryPropertyType'


export default function Home() {
  return (
    <main className="text-gray-900 bg-brand-secondary flex flex-col items-center pt-4 gap-12 dark:bg-background">
       <Search />
       <GalleryPopularDestinations />
       <GalleryPropertyType />
       <BargainsGallery />
       <GallerySlider2 />
    </main>
  )
}
