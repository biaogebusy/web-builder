export function getFileType(href: string): string {
  if (!href) {
    return '';
  }
  const url = href.toLowerCase();
  const pdfReg = /^.+(\.pdf)/;
  const svgReg = /^.+(\.svg)/;
  const txtReg = /^.+(\.txt)/;
  const wordReg = /^.+(\.doc|\.docx)/;
  const excelReg = /^.+(\.xls|\.xlsx)/;
  const jpgReg = /^.+(\.png|\.jpg|\.jpeg|\.bmp|\.gif|\.webp)/;
  if (pdfReg.test(url)) {
    return 'pdf';
  }
  if (svgReg.test(url)) {
    return 'svg';
  }
  if (txtReg.test(url)) {
    return 'txt';
  }
  if (wordReg.test(url)) {
    return 'word';
  }
  if (excelReg.test(url)) {
    return 'excel';
  }
  if (jpgReg.test(url)) {
    return 'picture';
  }
  return '';
}
