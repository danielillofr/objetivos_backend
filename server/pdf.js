const pdfmake = require ('pdfmake');
const objetivo2access = require ('./dbAcess/objetivo2')
const fs = require ('fs');

var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};
let pdf = new pdfmake(fonts);

Generar_fichero = (docDefinition) => {
    return new Promise((resolve,reject) => {
        const pdfDoc = pdf.createPdfKitDocument(docDefinition);
        // pdfDoc.pipe(writeStream);
        let chunks = [];
    
        pdfDoc.on('data', (chunk) => {
          chunks.push(chunk);
        });
      
        pdfDoc.on('end', () => {
          let result = Buffer.concat(chunks);
        //   result = 'data:application/pdf;base64,' + result.toString('base64');
          resolve(result);
        });
        
        pdfDoc.end();        
    })
}

Crear_pdf = async (idUsuario) => {
    let datos = await objetivo2access.Obtener_datos_usuario(idUsuario);

    let objetivosPDF = [];
    datos.objetivos.forEach(element => {
        let porcentaje = element.diasProyecto / 261;
        porcentaje = porcentaje * 1000;
        porcentaje = Math.round(porcentaje);
        porcentaje = porcentaje / 10;
        porcentaje = porcentaje + '%';
        let conseguido = element.diasProyecto / 261;
        conseguido = conseguido * element.conseguido;
        conseguido = conseguido * 10;
        conseguido = Math.round(conseguido);
        conseguido = conseguido / 10;
        conseguido = conseguido + '%';
        let fecha = new Date();
        fecha.setTime(Date.parse(element.fechaInicio));
        let fechaInicioString = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
        fecha.setTime(Date.parse(element.fechaFin));
        let fechaFinString = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
        let evaluado = element.conseguido;
        evaluado = evaluado + '%';

        let body = [element.estado, fechaInicioString,fechaFinString,porcentaje,evaluado, conseguido ]
        let title = {text: `${element.nombre}`};
        objetivosPDF.push(title);
        let contenido = {
            style: 'tableExample',
            table: {
                widths: ['*', '*', '*', '*', '*', '*', '*'],
                body: [
                    ['Estado', 'Fecha inicio', 'Fecha fin', 'Porcentaje', 'Evaluado', 'Conseguido']
                    // ['fixed-width cells have exactly the specified width', { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }]
                ]
            }
        }
        contenido.table.body.push(body);
        objetivosPDF.push(contenido);
    })


    const docDefinition = {
        content: [
            {text: `${datos.usuario.nombreCompleto}`, style: 'header', fontSize: 32, alignment: 'center' },
            {text: `Planificado`, style: 'header', bold: true, decoration: 'underline'},
            {text: `Dias:${datos.datos.totales.dias} - Porcentaje/Año:${datos.datos.totales.porcentaje}% - Conseguido:${datos.datos.porcentajeConseguido}%`},
            {text: `\nProyectos`, style: 'header', bold: true, decoration: 'underline'},
            {text: `Dias:${datos.datos.proyecto.dias} - Porcentaje/Año:${datos.datos.proyecto.porcentaje}% - ProyectoVsTotal:${datos.datos.proyecto.vsTotal}%`},
            {text: `\nIncidencias`, style: 'header', bold: true, decoration: 'underline'},
            {text: `Dias:${datos.datos.incidencias.dias} - Porcentaje/Año:${datos.datos.incidencias.porcentaje}% - ProyectoVsTotal:${datos.datos.incidencias.vsTotal}%`},
            {text: `\nListado de objetivos`, style: 'header', bold: true, decoration: 'underline'},
            // {text: `\nNombre objetivo\n`},
            // {
            //     style: 'tableExample',
            //     table: {
            //         widths: ['*', '*', '*', '*', '*', '*', '*'],
            //         body: [
            //             ['Estado', 'Fecha inicio', 'Fecha fin', 'Porcentaje', 'Evaluado', 'Conseguido'],
            //             ['CERRADO', '14/1/2019', '14/3/2019', '23%', '75%', '18.5%'],
            //             // ['fixed-width cells have exactly the specified width', { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }]
            //         ]
            //     }
            // }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        }
    }
    docDefinition.content.push(objetivosPDF);

    let result = await Generar_fichero(docDefinition);
    return result;

        // const fileName = `pdf.pdf`;
    // const writeStream = fs.createWriteStream(fileName);

}

module.exports = {Crear_pdf}