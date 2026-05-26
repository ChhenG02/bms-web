import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type GeneratePDFProps = {
  elementId: string;
};

export async function generatePDFBlobUrl({
  elementId,
}: GeneratePDFProps) {
  const element =
    document.getElementById(elementId);

  if (!element) return null;

  const canvas =
    await html2canvas(element, {
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

  return URL.createObjectURL(blob);
}