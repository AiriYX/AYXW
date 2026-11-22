import { useEffect, useRef, useState } from "react";

type Props = { url: string; title: string };

/**
 * Renders every page of a PDF right in the page (no popout, no browser PDF
 * viewer), so the poem keeps its exact layout. pdf.js is loaded only when a
 * PDF poem is opened.
 */
const PdfPages = ({ url, title }: Props) => {
  const box = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    let destroy: (() => void) | undefined;

    (async () => {
      const pdfjs = await import("pdfjs-dist");
      const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

      const doc = await pdfjs.getDocument(url).promise;
      destroy = () => void doc.destroy();
      const el = box.current;
      if (cancelled || !el) return;
      el.innerHTML = "";

      // render sharp on retina screens, sized to the column width
      const width = el.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      for (let n = 1; n <= doc.numPages; n++) {
        const page = await doc.getPage(n);
        const scale = (width / page.getViewport({ scale: 1 }).width) * dpr;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.className = "pdf-page";
        canvas.setAttribute("aria-label", `${title}, page ${n}`);
        canvas.setAttribute("role", "img");
        el.appendChild(canvas);
        await page.render({
          canvasContext: canvas.getContext("2d")!,
          viewport,
        }).promise;
        if (cancelled) return;
      }
      setStatus("ready");
    })().catch((err) => {
      console.error("PDF failed to render:", err);
      if (!cancelled) setStatus("error");
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [url, title]);

  return (
    <div>
      {status === "loading" && (
        <div className="pdf-page pdf-skeleton" aria-label="Loading poem" />
      )}
      {status === "error" && (
        <p className="text-center text-sm">
          The poem couldn&apos;t load here.{" "}
          <a href={url} className="underline decoration-pink-500">
            Open the PDF instead
          </a>
          .
        </p>
      )}
      <div ref={box} className="space-y-6" />
    </div>
  );
};

export default PdfPages;
