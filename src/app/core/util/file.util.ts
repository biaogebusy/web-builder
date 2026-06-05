export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result;
      if (result) {
        resolve(result as ArrayBuffer);
      } else {
        reject(false);
      }
    };
    reader.onerror = e => reject(e);
    reader.readAsArrayBuffer(file);
  });
}
