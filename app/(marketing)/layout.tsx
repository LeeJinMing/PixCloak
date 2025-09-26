import Script from "next/script";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const isProd = process.env.NODE_ENV === "production";
  const enableAdsense = process.env.NEXT_PUBLIC_ADSENSE === "true";

  return (
    <>
      {isProd && enableAdsense && (
        <Script
          id="adsbygoogle-loader"
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1911238866563211"
          crossOrigin="anonymous"
        />
      )}
      {children}
    </>
  );
}


