import type { Metadata } from "next";
import Client from "./Client";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Aspect Ratio Padder (Color/Blur) | PixCloak",
  description: "Pad images to a target aspect ratio using color or blur padding. Preview and export locally—no uploads. Great for banners and social crops.",
  alternates: { canonical: "/tools/aspect-pad", languages: { "x-default": "/tools/aspect-pad", en: "/tools/aspect-pad" } },
};

export default function Page() {
  return (
    <>
      <SoftwareAppJsonLd
        name="Aspect Ratio Padder"
        url="/tools/aspect-pad"
        description="Add padding to images to achieve target aspect ratios using solid colors or blur effects. Perfect for social media and banner images."
      />
      <FaqJsonLd items={[
        { question: "What is aspect ratio padding?", answer: "Adding colored or blurred borders to images to change their aspect ratio without cropping, preserving the entire original image content." },
        { question: "When should I use color vs blur padding?", answer: "Use solid color padding for clean, professional looks. Use blur padding for artistic effects that extend the image naturally." },
        { question: "What aspect ratios are supported?", answer: "Common ratios like 16:9, 4:3, 1:1 (square), 9:16 (vertical), and custom ratios. Perfect for social media platforms and web banners." },
        { question: "Can I choose the padding color?", answer: "Yes. Select any color using the color picker, or choose from preset colors like white, black, or transparent for PNG output." }
      ]} />
      <Client />
    </>
  );
}


