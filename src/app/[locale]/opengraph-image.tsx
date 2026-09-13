import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/// A bare link pasted into WhatsApp or Viber with no preview reads as spam —
/// this is what stops that. Satori (the renderer behind ImageResponse) can't
/// use next/font's self-hosted files directly, so this falls back to its
/// built-in sans-serif rather than pulling in a second font pipeline for one
/// generated image.
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        backgroundColor: '#0a0a0a',
        backgroundImage: 'radial-gradient(circle at 15% 15%, #1c1c1c 0%, #0a0a0a 60%)',
      }}
    >
      <div style={{ display: 'flex', fontSize: 56, fontWeight: 800, color: '#ffffff' }}>Facturo</div>
      <div
        style={{
          display: 'flex',
          marginTop: 32,
          fontSize: 40,
          fontWeight: 600,
          lineHeight: 1.3,
          color: '#f5f5f5',
          maxWidth: 920,
        }}
      >
        {t('title').replace(/^Facturo\s*[—-]\s*/, '')}
      </div>
      <div style={{ display: 'flex', marginTop: 24, fontSize: 24, color: '#a3a3a3', maxWidth: 880 }}>
        {t('description')}
      </div>
    </div>,
    size,
  );
}
