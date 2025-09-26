export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Global related tasks module for guides */}
      {/* Individual pages can still render their own modules; this ensures baseline internal links. */}
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
    </>
  );
}


