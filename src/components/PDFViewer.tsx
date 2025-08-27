import React, { useRef, useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.js';


import './PdfViewer.css';

const PdfViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5); 

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const loadedPdf = await pdfjsLib.getDocument(typedArray).promise;
        console.log("PDF loaded:", loadedPdf);
        setPdf(loadedPdf);
        setPageNumber(1);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const renderPage = async () => {
    if (pdf && canvasRef.current) {
      console.log("Rendering page", pageNumber);
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context!, viewport }).promise;
      console.log("Page rendered");
    } else {
      console.log("PDF or canvas not ready");
    }
  };

  useEffect(() => {
    renderPage();
  }, [pdf, pageNumber, scale]);

  return (
    <div className="pdf-viewer">
      <div className="controls">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button onClick={() => setScale((s) => s + 0.2)}>Zoom +</button>
        <button onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}>Zoom -</button>
        <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))}>←</button>
        <button onClick={() => setPageNumber((p) => (pdf && p < pdf.numPages ? p + 1 : p))}>→</button>
        <span>Page {pageNumber} / {pdf?.numPages || '?'}</span>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PdfViewer;
