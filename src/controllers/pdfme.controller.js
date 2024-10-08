import { Template, BLANK_PDF } from '@pdfme/common';

export async function crearTestPdf(req, res) {
  // Define la plantilla del PDF
  const template = {
    basePdf: BLANK_PDF, // Si tienes un PDF base para usar como fondo
    schemas: [
      {
        name: 'title',
        position: { x: 50, y: 50 },
        width: 500,
        height: 30,
        type: 'text',
        fontSize: 20,
        align: 'left',
      },
      {
        name: 'content',
        position: { x: 50, y: 100 },
        width: 500,
        height: 20,
        type: 'text',
        fontSize: 12,
        align: 'left',
      },
    ],
  };

  // Datos para el PDF
  const inputs = [
    {
      title: 'Generando un PDF con pdfme',
      content: 'Este es un ejemplo sencillo de cómo usar @pdfme/generator en Node.js.',
    },
  ];

  // Genera el PDF
  // (async () => {
  //   const pdfBuffer = await generate({ template, inputs });

  //   // Guarda el PDF generado
  //   fs.writeFileSync('output.pdf', pdfBuffer);
  //   console.log('PDF generado con éxito');
  // })();

  generate({ template, inputs }).then((pdf) => {
    console.log(pdf);

    // Browser
    // const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    // window.open(URL.createObjectURL(blob));

    // Node.js
    fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);

  });
}
