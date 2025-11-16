/**
 * JSON-LD Script Component
 * Injects structured data into the page head for SEO
 */

interface JsonLdScriptProps {
  data: object | object[];
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : { '@graph': jsonLd }),
      }}
    />
  );
}
