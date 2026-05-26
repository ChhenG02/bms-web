import { useEffect, useState, useRef } from "react";

type PDFPreviewOverlayProps = {
  open: boolean;
  pdfUrl?: string;
  title?: string;
  onClose: () => void;
};

function PDFPreviewOverlay({
  open,
  pdfUrl,
  title = "document.pdf",
  onClose,
}: PDFPreviewOverlayProps) {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setVisible(false);
      setZoom(100);
      setCurrentPage(1);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Try to read page count from iframe after load
  const handleIframeLoad = () => {
    setLoading(false);
    try {
      const win = iframeRef.current?.contentWindow as any;
      if (win?.PDFViewerApplication) {
        const check = setInterval(() => {
          const pages = win.PDFViewerApplication?.pagesCount;
          if (pages) {
            setTotalPages(pages);
            clearInterval(check);
          }
        }, 200);
        setTimeout(() => clearInterval(check), 5000);
      }
    } catch (_) {}
  };

  // Track scroll position to estimate current page
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onScroll = () => {
      if (totalPages <= 1) return;
      const ratio = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
      const page = Math.min(
        totalPages,
        Math.max(1, Math.round(ratio * (totalPages - 1)) + 1),
      );
      setCurrentPage(page);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [totalPages]);

  const handleDownload = () => {
    if (pdfUrl) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = title;
      a.click();
    }
  };

  const handlePrint = () => {
    const iframe = iframeRef.current;

    if (!iframe) return;

    iframe.contentWindow?.focus();

    iframe.contentWindow?.print();
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 25, 300));
  const zoomOut = () => setZoom((z) => Math.max(z - 25, 25));
  const resetZoom = () => setZoom(100);

  const iframeSrc = pdfUrl
    ? `${pdfUrl}${pdfUrl.includes("?") ? "&" : "#"}toolbar=0&navpanes=0&scrollbar=1`
    : undefined;

  if (!open) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600&display=swap');

        .pdf-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          background: #1e1e1e;
          font-family: 'Google Sans', 'Segoe UI', sans-serif;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .pdf-overlay.visible { opacity: 1; }

        /* ── TOP BAR ── */
        .pdf-topbar {
          height: 52px;
          background: #2d2d2d;
          display: flex;
          align-items: center;
          padding: 0 8px 0 16px;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          user-select: none;
          gap: 12px;
        }

        /* Left */
        .pdf-topbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }
        .pdf-file-icon { width: 20px; height: 26px; flex-shrink: 0; }
        .pdf-file-icon svg { width: 100%; height: 100%; }
        .pdf-filename {
          font-size: 13.5px;
          font-weight: 500;
          color: #e2e2e2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 400px;
          letter-spacing: 0.01em;
        }

        /* ── CENTER: zoom + page ── */
        .pdf-toolbar-center {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .pdf-sep {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.12);
          margin: 0 4px;
        }

        /* zoom icon buttons */
        .pdf-zoom-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #bdc1c6;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.12s, color 0.12s;
        }
        .pdf-zoom-btn:hover { background: rgba(255,255,255,0.1); color: #f1f3f4; }
        .pdf-zoom-btn:active { background: rgba(255,255,255,0.18); }
        .pdf-zoom-btn:disabled { opacity: 0.35; cursor: default; }
        .pdf-zoom-btn svg { width: 18px; height: 18px; }

        /* zoom value pill — clickable to reset */
        .pdf-zoom-value {
          height: 30px;
          min-width: 56px;
          padding: 0 10px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.05);
          color: #e2e2e2;
          font-size: 12.5px;
          font-family: 'Google Sans', 'Segoe UI', sans-serif;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.12s, border-color 0.12s;
          letter-spacing: 0.01em;
        }
        .pdf-zoom-value:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.25);
        }

        /* page indicator */
        .pdf-page-info {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #9aa0a6;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .pdf-page-info span.current {
          color: #e2e2e2;
          font-weight: 600;
        }

        /* Right: action + close */
        .pdf-topbar-right {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .pdf-action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          padding: 0 13px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.14);
          background: transparent;
          color: #c8cace;
          font-size: 12.5px;
          font-family: 'Google Sans', 'Segoe UI', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .pdf-action-btn svg { width: 15px; height: 15px; flex-shrink: 0; }
        .pdf-action-btn:hover {
          background: rgba(255,255,255,0.09);
          color: #f1f3f4;
          border-color: rgba(255,255,255,0.22);
        }
        .pdf-action-btn:active { background: rgba(255,255,255,0.15); }

        .pdf-topbar-sep {
          width: 1px; height: 22px;
          background: rgba(255,255,255,0.12);
          margin: 0 4px;
        }

        .pdf-close-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #9aa0a6;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .pdf-close-btn:hover { background: rgba(255,255,255,0.1); color: #e8eaed; }
        .pdf-close-btn:active { background: rgba(255,255,255,0.18); }
        .pdf-close-btn svg { width: 20px; height: 20px; }

        /* ── BODY ── */
        .pdf-body {
          flex: 1;
          overflow: auto;
          position: relative;
          background: #3c3c3c;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .pdf-iframe-scaler {
          transform-origin: top center;
          width: 100%;
          flex-shrink: 0;
        }

        .pdf-body iframe {
          display: block;
          width: 100%;
          height: calc(100vh - 52px);
          border: none;
        }

        /* ── LOADER ── */
        .pdf-loader {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #1e1e1e;
          gap: 16px;
          transition: opacity 0.3s ease;
        }
        .pdf-loader.hidden { opacity: 0; pointer-events: none; }
        .pdf-spinner {
          width: 38px; height: 38px;
          border: 3px solid rgba(255,255,255,0.08);
          border-top-color: #8ab4f8;
          border-radius: 50%;
          animation: pdf-spin 0.75s linear infinite;
        }
        .pdf-loader-text { font-size: 12.5px; color: #80868b; letter-spacing: 0.02em; }
        @keyframes pdf-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className={`pdf-overlay${visible ? " visible" : ""}`}>
        {/* ── TOP BAR ── */}
        <div className="pdf-topbar">
          {/* Left: icon + filename */}
          <div className="pdf-topbar-left">
            <div className="pdf-file-icon">
              <svg
                viewBox="0 0 22 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="22" height="28" rx="2.5" fill="#EA4335" />
                <path d="M13 0L22 9H13V0Z" fill="rgba(0,0,0,0.25)" />
                <text
                  x="3"
                  y="21"
                  fontSize="7"
                  fontWeight="700"
                  fill="white"
                  fontFamily="sans-serif"
                >
                  PDF
                </text>
              </svg>
            </div>
            <span className="pdf-filename">{title}</span>
          </div>

          {/* Center: zoom out | value | zoom in | sep | page */}
          <div className="pdf-toolbar-center">
            <button
              className="pdf-zoom-btn"
              onClick={zoomOut}
              disabled={zoom <= 25}
              aria-label="Zoom out"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13H5v-2h14v2z" />
              </svg>
            </button>

            <button
              className="pdf-zoom-value"
              onClick={resetZoom}
              title="Reset to 100%"
            >
              {zoom}%
            </button>

            <button
              className="pdf-zoom-btn"
              onClick={zoomIn}
              disabled={zoom >= 300}
              aria-label="Zoom in"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>

            <div className="pdf-sep" />

            {/* Page indicator */}
            <div className="pdf-page-info">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ opacity: 0.5 }}
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
              </svg>
              <span className="current">{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div>
          </div>

          {/* Right: Download + Print + Close */}
          <div className="pdf-topbar-right">
            <button
              className="pdf-action-btn"
              onClick={handleDownload}
              aria-label="Download"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 16l-5-5 1.41-1.41L11 13.17V4h2v9.17l2.59-2.58L17 11l-5 5zm-7 4v-2h14v2H5z" />
              </svg>
              Download
            </button>

            <button
              className="pdf-action-btn"
              onClick={handlePrint}
              aria-label="Print"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
              </svg>
              Print
            </button>

            <div className="pdf-topbar-sep" />

            <button
              className="pdf-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="pdf-body" ref={bodyRef}>
          <div className={`pdf-loader${!loading ? " hidden" : ""}`}>
            <div className="pdf-spinner" />
            <span className="pdf-loader-text">Loading document…</span>
          </div>

          <div
            className="pdf-iframe-scaler"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              title="PDF Preview"
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PDFPreviewOverlay;
