import GalleryPopularDestinations from '@/components/layout/galleryPopularDestinations'
import GallerySlider1 from '@/components/layout/gallerySlider1'
import GallerySlider2 from '@/components/layout/gallerySlider2'
import Search from '../components/layout/searchBar/index'
import GalleryPropertyType from '@/components/layout/galleryPropertyType'


export default function Home() {
  return (
    <main className="text-gray-900 bg-brand-secondary flex flex-col items-center pt-4 gap-12">
       <Search />
       <GalleryPopularDestinations />
       <GalleryPropertyType />
       <GallerySlider1 />
       <GallerySlider2 />
    </main>
  )
}
