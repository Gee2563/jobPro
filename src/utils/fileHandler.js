// // src/utils/fileHandlers.js
// Will revisit this file later. Not able to figure out pdfjs-dist
// import * as pdfjsLib from 'pdfjs-dist';
// import { Document } from 'docx';
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// // Set the workerSrc property
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// export const extractTextFromPDF = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = async () => {
//       const typedArray = new Uint8Array(reader.result);
//       const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
//       let text = '';
//       for (let i = 0; i < pdf.numPages; i++) {
//         const page = await pdf.getPage(i + 1);
//         const textContent = await page.getTextContent();
//         text += textContent.items.map((item) => item.str).join(' ') + '\n';
//       }
//       resolve(text);
//     };
//     reader.onerror = (error) => reject(error);
//     reader.readAsArrayBuffer(file);
//   });
// };

// export const extractTextFromWord = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const buffer = event.target.result;
//       const doc = new Document(buffer);
//       const paragraphs = doc.Paragraphs.map((para) => para.Text).join('\n');
//       resolve(paragraphs);
//     };
//     reader.onerror = (error) => reject(error);
//     reader.readAsArrayBuffer(file);
//   });
// };
