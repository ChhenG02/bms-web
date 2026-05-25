import html2canvas from "html2canvas";

import jsPDF from "jspdf";

type HandlePreviewPDFProps = {
  elementId: string;

  filename: string;
};

export async function handlePreviewPDF({
  elementId,

//   filename,
}: HandlePreviewPDFProps) {
  const element =
    document.getElementById(elementId);

  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,

    useCORS: true,

    backgroundColor: "#ffffff",

    windowWidth: 794,
  });

  const imgData =
    canvas.toDataURL("image/png");

  const pdf = new jsPDF(
    "p",
    "mm",
    "a4"
  );

  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const imgWidth = pageWidth;

  const imgHeight =
    (canvas.height * imgWidth) /
    canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    imgWidth,
    imgHeight
  );

  const blob = pdf.output("blob");

  const url = URL.createObjectURL(blob);

  window.open(url, "_blank");

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}