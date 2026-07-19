"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { emitProductEvent } from "@/lib/productEvents";

type InstallChoice = { outcome: "accepted" | "dismissed"; platform: string };
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<InstallChoice>;
};

const READY_KEY = "pixcloak-pwa-ready-v1";
const VISIT_KEY = "pixcloak-pwa-visits-v1";
const SESSION_KEY = "pixcloak-pwa-session-v1";

function isStandalone() {
  const nav = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true;
}

function isAppleMobile() {
  const nav = navigator as Navigator & { maxTouchPoints: number };
  return /iPhone|iPad|iPod/i.test(nav.userAgent) || (nav.platform === "MacIntel" && nav.maxTouchPoints > 1);
}

export function PwaInstall() {
  const pathname = usePathname() ?? "";
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [eligible, setEligible] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [appleMobile, setAppleMobile] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const standalone = isStandalone();
    setInstalled(standalone);
    if (standalone) emitProductEvent("pwa_standalone_launch", { tool: "pwa" });
    setAppleMobile(isAppleMobile());

    let visits = Number.parseInt(window.localStorage.getItem(VISIT_KEY) || "0", 10) || 0;
    if (!window.sessionStorage.getItem(SESSION_KEY)) {
      visits = Math.min(visits + 1, 2);
      window.localStorage.setItem(VISIT_KEY, String(visits));
      window.sessionStorage.setItem(SESSION_KEY, "1");
    }
    setEligible(window.localStorage.getItem(READY_KEY) === "downloaded" || visits >= 2);

    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      emitProductEvent("pwa_installed", { tool: "pwa" });
      setInstalled(true);
      setInstallPrompt(null);
      setHelpOpen(false);
    };
    const onReady = () => setEligible(true);

    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("pixcloak:pwa-ready", onReady);
    return () => {
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("pixcloak:pwa-ready", onReady);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (helpOpen && !dialog.open) dialog.showModal();
    if (!helpOpen && dialog.open) dialog.close();
  }, [helpOpen]);

  async function requestInstall() {
    emitProductEvent("pwa_install_requested", { tool: "pwa" });
    if (!installPrompt) {
      setHelpOpen(true);
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    if (choice.outcome === "accepted") emitProductEvent("pwa_install_accepted", { tool: "pwa" });
    if (choice.outcome === "dismissed") setHelpOpen(true);
  }

  if (!eligible || installed) return null;

  const shortcuts = isZh
    ? [
        ["/zh/redact", "图片打码"],
        ["/zh/compress", "指定 KB 压缩"],
        ["/zh/tools/pdf-to-image", "PDF 转图片"],
        ["/zh/tools/image-to-pdf", "图片转 PDF"],
      ]
    : [
        ["/safe-share", "Safe Share"],
        ["/upload-ready", "Upload Ready"],
        ["/tools/pdf-to-image", "PDF to Images"],
        ["/tools/image-to-pdf", "Images to PDF"],
      ];

  return (
    <>
      <button className="pwa-install-trigger" type="button" onClick={requestInstall} aria-haspopup="dialog">
        <span aria-hidden="true">↓</span>
        {isZh ? "安装应用" : "Install app"}
      </button>
      <dialog
        className="pwa-install-dialog"
        ref={dialogRef}
        aria-labelledby="pwa-install-title"
        onCancel={() => setHelpOpen(false)}
        onClose={() => setHelpOpen(false)}
      >
        <button className="pwa-dialog-close" type="button" onClick={() => setHelpOpen(false)} aria-label={isZh ? "关闭" : "Close"}>×</button>
        <span className="pwa-dialog-mark" aria-hidden="true">P</span>
        <div>
          <p className="eyebrow">{isZh ? "快速回到常用工具" : "RETURN WITHOUT TYPING A URL"}</p>
          <h2 id="pwa-install-title">{isZh ? "把皮克图添加到桌面" : "Add PixCloak to your device"}</h2>
          <p>
            {isZh
              ? "安装后可从桌面、开始菜单或主屏幕打开。图片仍只在当前设备的浏览器中处理。"
              : "Open it from your desktop, Start menu, or home screen. Image processing still stays in the browser on this device."}
          </p>
        </div>

        <ol className="pwa-install-steps">
          {appleMobile ? (
            <>
              <li>{isZh ? "使用 Safari 打开本页，点底部的“分享”按钮。" : "Open this page in Safari and tap the Share button."}</li>
              <li>{isZh ? "选择“添加到主屏幕”，再确认添加。" : "Choose Add to Home Screen, then confirm."}</li>
            </>
          ) : (
            <>
              <li>{isZh ? "打开浏览器菜单或地址栏右侧的安装图标。" : "Open the browser menu or the install icon in the address bar."}</li>
              <li>{isZh ? "选择“安装皮克图 / PixCloak”并确认。" : "Choose Install PixCloak and confirm."}</li>
            </>
          )}
        </ol>

        <div className="pwa-shortcut-preview" aria-label={isZh ? "安装后的快捷入口" : "Shortcuts available after installation"}>
          <strong>{isZh ? "安装后的四个快捷入口" : "Four installed shortcuts"}</strong>
          <div>
            {shortcuts.map(([href, label]) => <Link href={href} key={href} onClick={() => setHelpOpen(false)}>{label}</Link>)}
          </div>
        </div>
        <p className="pwa-support-note">
          {isZh ? "不同浏览器和系统显示快捷入口的方式可能不同。" : "Shortcut placement varies by browser and operating system."}
        </p>
      </dialog>
    </>
  );
}
