export { metadata } from "./compress/page";
import CompressPage from "./compress/page";

export default function Home() {
  return (
    <div>
      <h1 style={{ margin: '8px 0' }}>PixCloak – Compress & Redact Images Locally (No Upload)</h1>
      <CompressPage />
    </div>
  );
}
