import { useEffect, useRef, useState } from 'react'

function Produk({ data }) {
  const [visible, setVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
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
        setSelectedProduct(null)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProduct])

  return (
    <section
      id="produk"
      ref={sectionRef}
      className="py-20 bg-[#FFF8F0]"
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

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {data.products.map((product, index) => (
            <div
              key={product.name}
              className={`bg-[#FDF6EC] rounded-xl overflow-hidden card-hover cursor-pointer transition-all duration-700 ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image placeholder */}
              <div className="aspect-square bg-gradient-to-br from-[#D4AF37]/20 to-[#8B0000]/10 flex items-center justify-center">
               {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover h-full w-full"
                  />
                ) : (
                   <svg
                  className="w-16 h-16 text-[#D4AF37]/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-heading font-semibold text-[#3E1F00] text-sm md:text-base mb-2">
                  {product.name}
                </h3>
                <p className="text-xs text-[#3E1F00]/60 line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="inline-block px-3 py-1 bg-[#D4AF37] text-white text-sm font-semibold rounded-full">
                  {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-content w-full mx-4 p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-[#8B0000] hover:text-[#C0392B] transition-colors"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="aspect-video bg-gradient-to-br from-[#D4AF37]/20 to-[#8B0000]/10 rounded-xl flex items-center justify-center mb-6">
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="object-cover rounded-xl"
                />
              ):(
                <svg
                className="w-24 h-24 text-[#D4AF37]/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              )}
            </div>

            {/* Product info */}
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#8B0000] mb-3">
              {selectedProduct.name}
            </h3>

            <div className="inline-block px-4 py-2 bg-[#D4AF37] text-white font-semibold rounded-full mb-4">
              {selectedProduct.price}
            </div>

            <p className="text-[#3E1F00]/80 leading-relaxed mb-6">
              {selectedProduct.description}
            </p>

            {/* CTA */}
            <a
              href="#kontak"
              className="btn-primary w-full text-center block"
              onClick={() => setSelectedProduct(null)}
            >
              Pesan Sekarang
            </a>
          </div>
        </div>
      )}
    </section>
  )
}

export default Produk
