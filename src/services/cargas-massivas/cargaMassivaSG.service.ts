// import app from '../../app';
// import multer from 'multer';
// import csv from 'csv-parser';
// import fs from 'fs';

// // Configuração do multer
// const upload = multer({ dest: 'uploads/' })

// app.post('/carga-massiva-sg', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('Nenhum arquivo enviado.')
//     }

//     const filePath = req.file.path

//     // Ler o arquivo .csv
//     const results:any = []
//     fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//             // Aqui você pode tomar as ações necessárias sobre o conteúdo do arquivo
//             console.log(results);
//             res.send('Arquivo processado com sucesso.')
//         })
// })