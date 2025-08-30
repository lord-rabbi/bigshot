import React, { useRef, useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.js';

import './PdfViewer.css';

interface PdfViewerProps {
  fullscreen: boolean;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fullscreen }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);

  const MIN_SCALE = 0.6;
  const MAX_SCALE = 3;

  const loadPdf = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      const doc = await pdfjsLib.getDocument(typedArray).promise;
      setPdfDoc(doc);
      setPageNumber(1);
    };
    reader.readAsArrayBuffer(file);
  };

  const increaseZoom = () => setScale((s) => Math.min(MAX_SCALE, s + 0.2));
  const decreaseZoom = () => setScale((s) => Math.max(MIN_SCALE, s - 0.2));

  const toggleFullscreen = () => {
    const element = viewerRef.current;
    if (!element) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error('Erreur lors de la sortie du fullscreen :', err);
      });
    } else {
      element.requestFullscreen().catch((err) => {
        console.error('Erreur lors de l’entrée en fullscreen :', err);
      });
    }
  };

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      // ✅ Correction du flou : support Retina
      const ratio = window.devicePixelRatio || 1;
      canvas.width = viewport.width * ratio;
      canvas.height = viewport.height * ratio;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);

      await page.render({ canvasContext: context, viewport }).promise;
    };

    renderPage();
  }, [pdfDoc, pageNumber, scale]);

  return (
    <div ref={viewerRef} className={`pdf-viewer ${fullscreen ? 'expanded' : ''}`}>
      {fullscreen && (
        <div className="compact-controls">
          <label htmlFor="pdf-upload" className="import-label">📄</label>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) loadPdf(e.target.files[0]);
            }}
          />
          <button onClick={increaseZoom}>+</button>
          <button onClick={decreaseZoom}>−</button>
          <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))}>←</button>
          <button onClick={() => setPageNumber((p) => (pdfDoc && p < pdfDoc.numPages ? p + 1 : p))}>→</button>
          <span className="page-info">{pageNumber} / {pdfDoc?.numPages || '?'}</span>
        </div>
      )}
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default PdfViewer;
