// lib/docxGenerator.ts
import { Document, Packer, Paragraph, TextRun } from 'docx';


export async function generateDocxBuffer(title: string, body: string) {
const doc = new Document({
sections: [
{
properties: {},
children: [
new Paragraph({
children: [new TextRun({ text: title, bold: true, size: 32 })]
}),
new Paragraph({ children: [new TextRun({ text: '\n' })] }),
...body.split('\n').map((line) => new Paragraph({ children: [new TextRun({ text: line })] }))
]
}
]
});


const buffer = await Packer.toBuffer(doc);
return buffer;
}