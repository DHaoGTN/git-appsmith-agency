export default {
	createPDF: async () => {
		try {
			const pdfDoc = await PDFLib.PDFDocument.create();
			const timesRomanFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

			const page = pdfDoc.addPage();
			const { width, height } = page.getSize();
			const fontSize = 30;

			page.drawText('Creating PDFs in JavaScript is awesome!', {
				x: 50,
				y: height - 4 * fontSize,
				size: fontSize,
				font: timesRomanFont,
				color: PDFLib.rgb(0, 0.53, 0.71),
			});

			// Save and create Blob
			const pdfBytes = await pdfDoc.save();
			const blob = new Blob([pdfBytes], { type: 'application/pdf' });
			const url = URL.createObjectURL(blob);
			await download(url, "test.pdf", "application/pdf");

			// // Create and download
			// const url = URL.createObjectURL(blob);
			// const link = document.createElement('a');
			// link.href = url;
			// link.download = 'created-document.pdf';
			// document.body.appendChild(link); // Thêm link vào DOM
			// link.click();
			// link.remove(); // Dọn dẹp sau khi tải xuống
			// URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error creating PDF:', error);
		}
	}
}
