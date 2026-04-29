import { useEffect, useRef, useState } from 'react'
import newsImage from '../assets/news.jpg'

function Berita({ data }) {
  const [visible, setVisible] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedNews(null)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedNews])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  }

  return (
    <section
      id="berita"
      ref={sectionRef}
      className="py-20 bg-linear-to-b from-[#FDF6EC] to-[#FFF8F0]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#8B0000] mb-4">
            {data.title}
          </h2>
          <div className="section-divider max-w-md mx-auto" />
          <p className="text-[#3E1F00]/80 max-w-3xl mx-auto mt-6">
            {data.description}
          </p>
        </div>

        {/* News grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {data.news_list.map((news, index) => (
            <div
              key={news.slug}
              className={`bg-[#FDF6EC] rounded-2xl overflow-hidden card-hover cursor-pointer transition-all duration-700 ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setSelectedNews(news)}
            >
              {/* Image placeholder */}
              <div className="relative aspect-video bg-linear-to-br from-[#D4AF37]/20 to-[#8B0000]/10 flex items-center justify-center">
               {(() => {
                  const getImgSrc = (img) => {
                    if (!img) return null
                    if (typeof img === 'string' && img.startsWith('http')) return img
                    if (typeof img === 'string' && img.includes('news')) return newsImage
                    return img
                  }
                  const imgSrc = getImgSrc(news.image)
                  return imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={news.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                  <svg className="w-12 h-12 text-[#D4AF37]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  )
                })()}

                {/* Highlight badge */}
                {news.highlight && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#D4AF37] text-white text-xs font-semibold rounded-full">
                    Sorotan Utama
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-[#8B0000] text-sm mb-2">{formatDate(news.date)}</div>
                <h3 className="font-heading font-bold text-[#3E1F00] text-lg mb-3">
                  {news.title}
                </h3>
                <p className="text-[#3E1F00]/60 text-sm line-clamp-3">
                  {news.content}
                </p>
                <div className="mt-4 flex items-center text-[#8B0000] font-medium text-sm">
                  Baca selengkapnya
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="modal-content w-full max-w-3xl mx-4 p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-[#8B0000] hover:text-[#C0392B] transition-colors"
              onClick={() => setSelectedNews(null)}
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-sm text-[#8B0000] mb-2">{formatDate(selectedNews.date)}</div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#8B0000] mb-4">
              {selectedNews.details?.title || selectedNews.title}
            </h3>

            {/* Highlight badge */}
            {selectedNews.highlight && (
              <span className="inline-block px-3 py-1 bg-[#D4AF37] text-white text-xs font-semibold rounded-full mb-4">
                Sorotan Utama
              </span>
            )}

            {/* Content */}
            <div className="prose prose-red max-w-none">
              <p className="text-[#3E1F00]/80 leading-relaxed mb-6">
                {selectedNews.details?.body || selectedNews.content}
              </p>

              {/* Images */}
              {selectedNews.image1 && (
                <div className="mb-6">
                  <div className="aspect-video bg-linear-to-br from-[#D4AF37]/20 to-[#8B0000]/10 rounded-xl flex items-center justify-center mb-2">
                    <svg className="w-12 h-12 text-[#D4AF37]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {selectedNews.image1.caption && (
                    <p className="text-sm text-[#3E1F00]/60 text-center italic">{selectedNews.image1.caption}</p>
                  )}
                </div>
              )}

              {selectedNews.image2 && (
                <div className="mb-6">
                  <div className="aspect-video bg-linear-to-br from-[#D4AF37]/20 to-[#8B0000]/10 rounded-xl flex items-center justify-center mb-2">
                    <svg className="w-12 h-12 text-[#D4AF37]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {selectedNews.image2.caption && (
                    <p className="text-sm text-[#3E1F00]/60 text-center italic">{selectedNews.image2.caption}</p>
                  )}
                </div>
              )}

              {/* Video embed placeholder */}
              {selectedNews.video1 && (
                <div className="mb-6">
                  <div className="aspect-video bg-[#3E1F00]/10 rounded-xl flex items-center justify-center mb-2">
                    <svg className="w-16 h-16 text-[#8B0000]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {selectedNews.video1.caption && (
                    <p className="text-sm text-[#3E1F00]/60 text-center italic">{selectedNews.video1.caption}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Berita
