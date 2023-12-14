import { PDFDocument, PDFFont } from "pdf-lib"

export const purchaseTypes = {
  ACCOUNT: 'счёт',
  CARD: 'карта',
}

export const downloadPDFWithINN = async (inn) => {
  try {
    const url = 'https://api.legpromrf.ru/file_manager/get_payment_form/'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer()) //!error with mode: 'no-cors'
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const page = pdfDoc.getPage(0)
    page.drawText(inn, {
      x: 139,
      y: 538,
      size: 12,
    })
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    console.log(pdfDataUri);
    let a = document.createElement("a"); //Create <a>
    a.href = pdfDataUri
    a.download = "file"; //File name Here
    a.click(); //Downloaded file
    a.remove()
  } catch(e) {
    console.error(e)
  }
}