import toArrayBuffer from 'to-array-buffer'
import { PDFDocument, PDFFont } from "pdf-lib"

export const purchaseTypes = {
  ACCOUNT: 'счёт',
  CARD: 'карта',
}

export const downloadPDFWithINN = async (inn, pdfBytes) => {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes)
    const page = pdfDoc.getPage(0)
    page.drawText(inn, {
      x: 139,
      y: 537,
      size: 12,
    })
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    console.log(pdfDataUri);
    let a = document.createElement("a"); 
    a.href = pdfDataUri
    a.download = "schet"; //Filename
    a.click(); //Download
    a.remove()
  } catch(e) {
    console.error(e)
  }
}