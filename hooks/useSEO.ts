import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export const useSEO = ({ title, description, url, image, schema }: SEOProps) => {
  const location = useLocation();

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
    // Prefer passed URL, otherwise build from current location
    const currentPath = url || location.pathname;
    const fullUrl = `https://nombresinsta.com${currentPath === '/' ? '' : currentPath}`;
    
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    }

    // 4. Update Open Graph Tags
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

    // 6. Inject JSON-LD Schema
    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

  }, [title, description, url, image, schema, location]);
};