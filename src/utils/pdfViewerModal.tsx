// src/components/PdfViewerModal.tsx
import React from "react";
// import ReactPDF from "@react-pdf"; //if needed we have it here

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Your Shadcn dialog components

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col p-0">
        {" "}
        {/* Adjust max-w and h for better viewing */}
        <DialogHeader className="p-4 border-b">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Viewing PDF</DialogDescription>
        </DialogHeader>
        <div className="flex-grow w-full">
          {pdfUrl ? (
            <iframe src={pdfUrl} className="w-full h-full border-none" />
          ) : (
            <div className="flex items-center justify-center h-full">
              PDF not found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerModal;
