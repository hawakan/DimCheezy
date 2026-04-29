import { useEffect, useRef, useState } from 'react'

function TentangKami({ data }) {
  const [visible, setVisible] = useState(false)
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

  const orgStructure = [
    {
      role: 'ketua',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      role: 'sekretaris',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      role: 'bendahara',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-[#FFF8F0] to-[#FDF6EC]"
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
        </div>

        {/* Description */}
        <div
          className={`bg-[#FDF6EC] rounded-2xl p-6 md:p-8 mb-12 gold-border-accent transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#3E1F00]/80 leading-relaxed whitespace-pre-line">
            {data.description}
          </p>
        </div>

        {/* Organizational Structure */}
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-2xl font-heading font-bold text-[#8B0000] text-center mb-8">
            Struktur Organisasi
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {orgStructure.map((item, index) => {
              const person = data.struktur_organisasi[item.role]
              return (
                <div
                  key={item.role}
                  className="bg-[#FFF8F0] rounded-xl p-6 text-center card-hover gold-border-accent"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8B0000] to-[#C0392B] text-[#D4AF37] mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-heading font-semibold text-[#3E1F00] text-lg">
                    {person.nama}
                  </h4>
                  <p className="text-[#8B0000] text-sm mt-1">{person.jabatan}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tujuan */}
        <div
          className={`bg-gradient-to-br from-[#8B0000]/5 to-[#D4AF37]/10 rounded-2xl p-6 md:p-8 border-l-4 border-[#8B0000] transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '450ms' }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8B0000] text-[#D4AF37] flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-[#8B0000] mb-3">
                {data.tujuan.title}
              </h3>
              <p className="text-[#3E1F00]/80 leading-relaxed">
                {data.tujuan.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TentangKami
