const PdfPrinter = require('pdfmake');

function formatDate(dateString) {
  if (!dateString) return 'Data inválida';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Data inválida' : date.toLocaleDateString('pt-BR');
}

async function gerarPDF(users) {
  const fonts = {
    Roboto: {
      normal: 'node_modules/pdfmake/fonts/Roboto-Regular.ttf',
      bold: 'node_modules/pdfmake/fonts/Roboto-Bold.ttf',
      italics: 'node_modules/pdfmake/fonts/Roboto-Italic.ttf',
      bolditalics: 'node_modules/pdfmake/fonts/Roboto-BoldItalic.ttf',
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      { text: 'Relatório de Usuários', style: 'header' },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', '*'],
          body: [
            ['ID', 'Nome', 'Email', 'Data de Nascimento'],
            ...users.map(user => [
              user.id || 'N/A',
              user.nome || 'N/A',
              user.email || 'N/A',
              formatDate(user.dtnasc)
            ])
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  const chunks = [];

  return new Promise((resolve, reject) => {
    pdfDoc.on('data', chunk => chunks.push(chunk));
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
    pdfDoc.on('error', reject);
    pdfDoc.end();
  });
}
