import React, { useRef, useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.js';

import './PdfViewer.css';

interface PdfViewerProps {
  fullscreen: boolean;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fullscreen }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);

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

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      context.clearRect(0, 0, canvas.width, canvas.height);

      await page.render({ canvasContext: context, viewport }).promise;
    };

    renderPage();
  }, [pdfDoc, pageNumber, scale]);

  return (
    <div className={`pdf-viewer ${fullscreen ? 'expanded' : ''}`}>
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
          <button onClick={() => setScale((s) => s + 0.2)}>+</button>
          <button onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}>−</button>
          <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))}>←</button>
          <button onClick={() => setPageNumber((p) => (pdfDoc && p < pdfDoc.numPages ? p + 1 : p))}>→</button>
          <span className="page-info">{pageNumber} / {pdfDoc?.numPages || '?'}</span>
        </div>
      )}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PdfViewer;
