import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

type Props = {
  file: File | null;
};

const ResumePreview = ({ file }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!file) return;

    const renderPDF = async () => {
      const buffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: buffer,
      }).promise;

      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.2 });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render(
        { canvasContext: context, viewport } as any
      ).promise;
    };

    renderPDF();
  }, [file]);

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Resume preview will appear here
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4 bg-gray-50">
      <canvas ref={canvasRef} className="mx-auto shadow" />
    </div>
  );
};

export default ResumePreview;
