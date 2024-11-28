import  { useEffect, useRef, useState } from 'react';
import { useTrainingStore } from '../../../store/trainingStore';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Download,
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface DocumentViewerProps {
  url: string;
}

export function DocumentViewer({ url }: DocumentViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [rotation, setRotation] = useState(0);
  const updateModuleProgress = useTrainingStore((state) => state.updateModuleProgress);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        renderPage(1, pdfDoc);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPdf();
  }, [url]);

  useEffect(() => {
    if (pdf) {
      renderPage(currentPage, pdf);
    }
  }, [currentPage, scale, rotation]);

  const renderPage = async (pageNum: number, pdfDoc: any) => {
    if (!canvasRef.current) return;

    const page = await pdfDoc.getPage(pageNum);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    const viewport = page.getViewport({ scale, rotation });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    // Update progress based on current page
    const progress = Math.round((currentPage / numPages) * 100);
    updateModuleProgress('1', progress); // Replace '1' with actual module ID
  };

  const changePage = (delta: number) => {
    const newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= numPages) {
      setCurrentPage(newPage);
    }
  };

  const handleZoom = (delta: number) => {
    const newScale = scale + delta;
    if (newScale >= 0.5 && newScale <= 3) {
      setScale(newScale);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleZoom(0.25)}
            className="p-2 rounded-lg hover:bg-gray-200"
            title="Zoom In"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleZoom(-0.25)}
            className="p-2 rounded-lg hover:bg-gray-200"
            title="Zoom Out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 rounded-lg hover:bg-gray-200"
            title="Rotate"
          >
            <RotateCw className="h-5 w-5" />
          </button>
          <a
            href={url}
            download
            className="p-2 rounded-lg hover:bg-gray-200"
            title="Download"
          >
            <Download className="h-5 w-5" />
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => changePage(-1)}
            disabled={currentPage <= 1}
            className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm">
            Page {currentPage} of {numPages}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={currentPage >= numPages}
            className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-auto bg-gray-800 rounded-lg p-4">
        <div className="flex justify-center min-h-[600px]">
          <canvas ref={canvasRef} className="max-w-full" />
        </div>
      </div>
    </div>
  );
}