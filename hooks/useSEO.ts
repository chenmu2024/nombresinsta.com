import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export const useSEO = ({ title, description, url, image }: SEOProps) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }

    // 3. Update Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    const fullUrl = url ? `https://nombresinsta.com${url}` : 'https://nombresinsta.com/';
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    }

    // 4. Update Open Graph Tags (Facebook/WhatsApp/iMessage)
    const updateMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', fullUrl);
    if (image) updateMeta('og:image', image);

    // 5. Update Twitter Cards
    const updateTwitter = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    
    updateTwitter('twitter:title', title);
    updateTwitter('twitter:description', description);

  }, [title, description, url, image]);
};