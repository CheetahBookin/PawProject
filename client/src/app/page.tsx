import Search from '../components/layout/searchBar/index'

export default function Home() {
  return (
    <main className="h-full text-gray-900 bg-brand-secondary flex flex-col items-center pt-4 gap-12">
       <h1>Book. Stay. Play. Your Adventure Awaits!</h1>
       <Search/>
    </main>
  )
}
