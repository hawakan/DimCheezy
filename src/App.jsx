import data from './constants/data.json'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Keunggulan from './components/Keunggulan'
import Produk from './components/Produk'
import TentangKami from './components/TentangKami'
import Testimoni from './components/Testimoni'
import Berita from './components/Berita'
import Kontak from './components/Kontak'
import Footer from './components/Footer'

function App() {
  return (
    <div className="batik-pattern">
      <Navbar data={data} />
      <main>
        <Hero data={data.home} />
        <Keunggulan data={data.home.feature} />
        <Produk data={data.catalog_product} />
        <TentangKami data={data.about_us} />
        <Testimoni data={data.testimonials} />
        <Berita data={data.news} />
        <Kontak data={data.contact_us} />
      </main>
      <Footer data={data} />
    </div>
  )
}

export default App
