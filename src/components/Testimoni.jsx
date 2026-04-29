import { useEffect, useRef, useState } from 'react'

function Testimoni({ data }) {
  const [visible, setVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)
  const timeoutRef = useRef(null)

  const testimonials = data.testimonials_list

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

  // Auto-slide functionality
  useEffect(() => {
    const slideNext = () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    timeoutRef.current = setTimeout(slideNext, 4000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex, testimonials.length])

  const goToSlide = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section
      id="testimoni"
      ref={sectionRef}
      className="py-20 bg-[#FDF6EC]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Carousel */}
        <div
          className={`relative transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Testimonial cards container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-[#FFF8F0] rounded-2xl p-8 md:p-12 gold-border-accent max-w-3xl mx-auto">
                    {/* Quote marks */}
                    <div className="flex justify-center mb-6">
                      <span className="quote-mark">"</span>
                    </div>

                    {/* Feedback */}
                    <p className="text-lg md:text-xl text-[#3E1F00]/80 text-center leading-relaxed italic mb-8">
                      {testimonial.feedback}
                    </p>

                    {/* Avatar and name */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B0000] to-[#C0392B] flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-[#8B0000] text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-[#D4AF37] text-sm">Pelanggan Setia</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8B0000] text-[#D4AF37] flex items-center justify-center hover:bg-[#C0392B] transition-colors shadow-lg"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8B0000] text-[#D4AF37] flex items-center justify-center hover:bg-[#C0392B] transition-colors shadow-lg"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimoni
