export default {
	genPDFFromTable: () =>{
		const doc = jspdf.jsPDF();
		doc.text('Demo', 10, 10);
		doc.table(10, 10, this.convertArrayElementToString(Table1.tableData), Table1.columnOrder, {autoSize: true});
		download(doc.output(), 'test-table.pdf');
	},
	genPDFFromHTML: () =>{
		var doc = jspdf.jsPDF();
		// var html = '<div class="aa"><h1>Test</h1></div>';
		// var parser = new DOMParser();
		// var content = parser.parseFromString(html, "text/html");
		// var elementHTML = content.querySelector('.aa');
		// doc.html(elementHTML, {
				// callback: function(doc) {
						// // Save the PDF
						// doc.save('test-html.pdf');
				// },
				// margin: [10, 10, 10, 10],
				// autoPaging: 'text',
				// x: 0,
				// y: 0,
				// width: 190, //target width in the PDF document
				// windowWidth: 675 //window width in CSS pixels
		// });
		
		// // Add new page
		// doc.addPage();
		doc.text(20, 20, 'GTN');
		doc.text(180, 20, 'Right corner', {align: 'right'});
		doc.text(20, 30, 'This is client-side Javascript to generate a PDF.');
		doc.table(20, 40, this.convertArrayElementToString(Table1.tableData), Table1.columnOrder, {autoSize: true});

		download(doc.output(), 'test-html.pdf');
	},
	
	convertArrayElementToString:(arrayOfObjects) =>{
		let stringArray = arrayOfObjects.map(obj => {
				let newObj = {};
				for (let key in obj) {
						newObj[key] = String(obj[key]);
				}
				return newObj;
		});
		return stringArray;
	},
	
	
	
	
	
	
	
	
	
	
	
	generatePDF: async () => {
		try {
			// const content = Text51.text;
			
			// Tạo một phần tử HTML tạm thời để chứa nội dung
			// const tempDiv = document.createElement('div');
			// tempDiv.innerHTML = content;
			// 
			// // Cấu hình html2pdf
			// const opt = {
			// margin: 1,
			// filename: 'myfile.pdf',
			// image: { type: 'jpeg', quality: 0.98 },
			// html2canvas: { scale: 2 },
			// jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
			// };
			
			// Sử dụng html2pdf để chuyển đổi
			// await html2pdf().from(tempDiv).set(opt).save();
			
			
			
			// jspdf
			// const doc = new jspdf();
			// console.log(doc);
			// doc.text("Hello world!", 10, 10);
			// doc.save("a4.pdf");
			
			const element = '<h1>Test</h1>';
			const options = {
				filename: 'my-document.pdf',
				margin: 1,
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: { scale: 2 },
				jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
			};
			await html2pdf.html2pdf().set(options).from(element).save();
			// showAlert('a');
			
		} catch (error) {
			console.error('Error generating PDF:', error);
		}
	},
	
	
	createAndDownloadPDF:() =>{
    // PDF content: very basic example with static text
    const pdfContent = `
%PDF-1.3
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 24 Tf
100 700 Td
(Hello, PDF!) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000018 00000 n
0000000077 00000 n
0000000178 00000 n
0000000457 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
565
%%EOF
    `;

    // Convert the string to a Blob
    const blob = new Blob([pdfContent], { type: 'application/pdf' });

    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'example.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
	},

	generatePDFManual:()=>{
		// Example usage
		this.createAndDownloadPDF('Hello, this is a simple PDF file.');
	},

}