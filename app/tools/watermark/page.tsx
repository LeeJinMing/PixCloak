import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Text Watermark – Batch overlay & export | PixCloak",
  description: "Add a text watermark to images locally and download. Adjustable opacity/size/position.",
  alternates: { canonical: "/tools/watermark" },
};
export default function Page(){
  return <Client/>;
}

function Preview({ url, draw, size, text, pos, opacity, font }: { url: string; draw: (c: HTMLCanvasElement, img: CanvasImageSource, w: number, h: number) => void; size: number; text: string; pos: Pos; opacity: number; font: string; }) {
  const [imgW, setImgW] = useState<number | null>(null);
  const [imgH, setImgH] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <img src={url} alt="preview" onLoad={(e) => { const el = e.currentTarget as HTMLImageElement; setImgW(el.naturalWidth); setImgH(el.naturalHeight); setReady(true); }} style={{ maxWidth: '100%', display: 'none' }} />
      <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
      {ready && imgW && imgH && (
        <Render draw={draw} canvasRef={canvasRef} url={url} imgW={imgW} imgH={imgH} size={size} text={text} pos={pos} opacity={opacity} font={font} />
      )}
    </div>
  );
}

function Render({ draw, canvasRef, url, imgW, imgH, size, text, pos, opacity, font }: { draw: (c: HTMLCanvasElement, img: CanvasImageSource, w: number, h: number) => void; canvasRef: React.MutableRefObject<HTMLCanvasElement | null>; url: string; imgW: number; imgH: number; size: number; text: string; pos: Pos; opacity: number; font: string; }) {
  const [ran, setRan] = useState(false);
  if (!ran) {
    setRan(true);
    const img = new Image(); img.src = url; img.decode().then(() => { if (canvasRef.current) { draw(canvasRef.current, img, imgW, imgH); } });
  }
  return null;
}


