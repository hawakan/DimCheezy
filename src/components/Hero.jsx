import { useEffect, useState } from 'react'

function Hero({ data }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FDF6EC]"
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF6EC] via-transparent to-[#FDF6EC]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Animated badge */}
        <div
          className={`inline-block mb-6 px-6 py-2 bg-[#D4AF37]/10 border border-[#D4AF37] rounded-full ${
            visible ? 'animate-float' : 'opacity-0'
          }`}
        >
          <span className="text-[#8B0000] font-medium">
            {data.toko.name} — {data.toko.description.split(' ')[0]}{' '}
            {data.toko.description.split(' ')[1]} {data.toko.description.split(' ')[2]}{' '}
            {data.toko.description.split(' ')[3]}
          </span>
        </div>

        {/* Title */}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-[#8B0000] mb-6 ${
            visible ? 'animate-fadeInUp' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          {data.title}
        </h1>

        {/* Slogan */}
        <p
          className={`text-xl md:text-2xl lg:text-3xl text-[#D4AF37] font-heading italic mb-6 ${
            visible ? 'animate-fadeInUp' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.4s' }}
        >
          {data.slogan}
        </p>

        {/* Description */}
        <p
          className={`text-lg md:text-xl text-[#3E1F00]/80 max-w-3xl mx-auto mb-10 leading-relaxed ${
            visible ? 'animate-fadeInUp' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.6s' }}
        >
          {data.description}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${
            visible ? 'animate-fadeInUp' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.8s' }}
        >
          <a href="#produk" className="btn-primary">
            Lihat Menu Kami
          </a>
          <a href="#kontak" className="btn-secondary">
            Hubungi Kami
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#keunggulan" aria-label="Scroll down">
          <svg
            className="w-8 h-8 text-[#8B0000]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-[#D4AF37]/50" />
      <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-[#D4AF37]/50" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-[#D4AF37]/50" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-[#D4AF37]/50" />
    </section>
  )
}

export default Hero
