require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.URLDB, (err) => {
    if (err) throw err;
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());



app.use(express.static(path.resolve(__dirname, '../public')));
// app.use(express.static(path.resolve(__dirname, './../../TodoList/dist/ftsock')));

app.use(require('./routes/usuarios'));
app.use(require('./routes/objetivos'));
app.use(require('./routes/incidencias'));

const pdfmake = require ('pdfmake');
const fs = require ('fs');

// var fonts = {
// 	Roboto: {
// 		normal: 'fonts/Roboto-Regular.ttf',
// 		bold: 'fonts/Roboto-Medium.ttf',
// 		italics: 'fonts/Roboto-Italic.ttf',
// 		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
// 	}
// };

// const pdf = new pdfmake(fonts);
// const docDefinition = {
// 	content: [
// 		'Nombre del objetivo',
// 		'Pepito'
// 	]
// }
// const fileName = `pdf.pdf`;
// const writeStream = fs.createWriteStream(fileName);
// const pdfDoc = pdf.createPdfKitDocument(docDefinition);
// pdfDoc.pipe(writeStream);
// pdfDoc.end();



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});

