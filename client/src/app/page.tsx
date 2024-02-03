import Image from 'next/image'
import Search from '../components/layout/main/search'

export default function Home() {
  return (
    <main className="h-full text-gray-900 bg-brand-secondary">
       <h1>Book. Stay. Play. Your Adventure Awaits!</h1>
       <Search/>
    </main>
  )
}
