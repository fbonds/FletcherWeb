import { useEffect } from 'react'

export default function SEO({ 
  title = 'Fletcher Bonds - Software Tester & IT Systems Support',
  description = 'Experienced software tester and IT systems support professional with expertise in testing frameworks, CI/CD, and technical support. Based in Seattle, WA.',
  keywords = 'Fletcher Bonds, Software Tester, IT Systems Support, Test Automation, Seattle, Quality Assurance, AI Development',
  ogImage = '/og-image.jpg',
  url = 'https://fletcherbonds.com/'
}) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: url },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: description },
      { property: 'twitter:image', content: ogImage },
    ]

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
      let element = document.querySelector(selector)
      
      if (element) {
        element.setAttribute('content', content)
      } else {
        element = document.createElement('meta')
        if (name) element.setAttribute('name', name)
        if (property) element.setAttribute('property', property)
        element.setAttribute('content', content)
        document.head.appendChild(element)
      }
    })

    // Add structured data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Fletcher Bonds',
      jobTitle: 'Software Tester & IT Systems Support',
      url: url,
      image: ogImage,
      description: description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Seattle',
        addressRegion: 'WA',
        addressCountry: 'US'
      },
      sameAs: [
        'https://www.linkedin.com/in/fletcherbonds/',
        'https://github.com/fbonds'
      ],
      knowsAbout: [
        'Software Testing',
        'IT Systems Support',
        'Test Automation',
        'CI/CD',
        'Quality Assurance',
        'IBM Mainframe',
        'Linux',
        'Windows Server',
        'macOS',
        'Android',
        'Cloud Technologies',
        'AI-Assisted Development'
      ]
    }

    let scriptTag = document.querySelector('script[type="application/ld+json"]')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(structuredData)

  }, [title, description, keywords, ogImage, url])

  return null
}
