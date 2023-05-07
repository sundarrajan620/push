const excel = require("../models/bioexcel");
const XLSX = require('xlsx');

// const uploadXLSX = async (req, res, next) => {
//   try {
//     let path = req.file.path;
//     var workbook = XLSX.readFile(path);
//     var sheetNames = workbook.SheetNames;    
//     let jsonData = [];

//     for (i = 0; i < sheetNames.length; i++) {
//       const sheetNameList = sheetNames[i];
//       const worksheet = workbook.Sheets[sheetNameList];
//       const dataList = XLSX.utils.sheet_to_json(worksheet);
//       jsonData.push({ chapterId: i+1, chapterName: sheetNameList, questions: dataList});   
//     }

//     // console.log(jsonData)

//     jsonData.forEach(sheet => {
//         sheet.questions.forEach(row => {
//           console.log(row);
//         });
//       });      

//     // if (jsonData.length === 0) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "excel sheet has no data",
//     //   });
//     // }

//     const data = jsonData.map((item) => {
//     //   const questions = item.questions.map((questionItem) => {
//     //     return {
//     //       id: questionItem.sno,
//     //       question: questionItem.question,
//     //       choices: {
//     //         option1: questionItem.option1,
//     //         option2: questionItem.option2,
//     //         option3: questionItem.option3,
//     //         option4: questionItem.option4,
//     //       },
//     //       feedback: 'string',
//     //       answer: questionItem.answer,
//     //     };
//     //   });
//       return {
//         chapters: {
//             chapterId: item.chapterId,
//             chapterName: item.chapterName,
//             questions:[
//                 {
//                     id: item.questions.sno,
//                     question: item.question,
//                 }
//             ] 
//         }    
//       };
//     });    

//     // console.log(data);
//res.status(200).json({ chapters });

//     // data.forEach((item) => {
//     //     console.log("Questions array of object for " + item.chapterName + ":");
//     //     console.log(item.questions);
//     //   });

//     // let savedData = await excel.create(data);

//     return res.status(201).json({
//       success: true,
//       message: savedData.length + " rows added to the database",
//     });
//   } catch (err) {
//     if (err.code === 'ENOENT') {
//       return res.status(400).json({
//         success: false,
//         message: "File not found or path is incorrect",
//       });
//     }
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// const uploadXLSX = async (req, res, next) => {
//     try {
//       let path = req.file.path;
//       var workbook = XLSX.readFile(path);
//       var sheetNames = workbook.SheetNames;    
//       let jsonData = [];

//       for (i = 0; i < sheetNames.length; i++) {
//         const sheetNameList = sheetNames[i];
//         const worksheet = workbook.Sheets[sheetNameList];
//         const dataList = XLSX.utils.sheet_to_json(worksheet);
//         const questions = dataList.map((row) => ({
//           id: row.id,
//           question: row.question,
//           choices: row.choices,
//           feedback: row.feedback,
//           answer: row.answer,
//           boolAnswer: false
//         }));
//         jsonData.push({ chapterId: i+1, chapterName: sheetNameList, questions: questions });   
//       }

//       const chapters = {};
//       jsonData.forEach((chapter) => {
//         chapters[chapter.chapterId] = {
//           chapterId: chapter.chapterId,
//           chapterName: chapter.chapterName,
//           questions: chapter.questions
//         };
//       });

//       res.status(200).json({ chapters });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

// const uploadXLSX = async (req, res, next) => {
//     try {
//       let path = req.file.path;
//       var workbook = XLSX.readFile(path);
//       var sheetNames = workbook.SheetNames;    
//       let jsonData = [];

//       for (i = 0; i < sheetNames.length; i++) {
//         const sheetNameList = sheetNames[i];
//         const worksheet = workbook.Sheets[sheetNameList];
//         const dataList = XLSX.utils.sheet_to_json(worksheet);
//         const questions = dataList.map((row) => ({
//           id: row.id,
//           question: row.question,
//           choices: [
//             { option1: row.option1 },
//             { option2: row.option2 },
//             { option3: row.option3 },
//             { option4: row.option4 }
//           ],
//           feedback: row.feedback,
//           answer: row.answer,
//           boolAnswer: false
//         }));
//         jsonData.push({ chapterId: i+1, chapterName: sheetNameList, questions: questions });   
//       }

//       const chapters = {};
//       jsonData.forEach((chapter) => {
//         chapters[chapter.chapterId] = {
//           chapterId: chapter.chapterId,
//           chapterName: chapter.chapterName,
//           questions: chapter.questions
//         };
//       });

//       res.status(200).json({ chapters });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

const uploadXLSX = async (req, res, next) => {
    try {
        let path = req.file.path;
        var workbook = XLSX.readFile(path);
        var sheetNames = workbook.SheetNames;
        let jsonData = [];

        for (i = 0; i < sheetNames.length; i++) {
            const sheetNameList = sheetNames[i];
            const worksheet = workbook.Sheets[sheetNameList];
            const dataList = XLSX.utils.sheet_to_json(worksheet);
            const questions = dataList.map((row) => ({
                questionId: row.sno,
                question: row.question,
                choices: [
                    { option1: row.option1 },
                    { option2: row.option2 },
                    { option3: row.option3 },
                    { option4: row.option4 }
                ],
                feedback: row.feedback,
                answer: row.answer,
                boolAnswer: false
            }));
            jsonData.push({ chapterId: i + 1, chapterName: sheetNameList, questions: questions });
        }

        const chapters = jsonData.map((chapter) => ({
            chapterId: chapter.chapterId,
            chapterName: chapter.chapterName,
            questions: chapter.questions
        }));

        console.log(" chapters", chapters);
        res.status(200).json({ chapters });
       let savedData = await excel.create(chapters);

       return res.status(201).json({
           success: true,
           message: savedData.length + " rows added to the database",
       });
   } catch (err) {
       if (err.code === 'ENOENT') {
           return res.status(400).json({
               success: false,
               message: "File not found or path is incorrect",
           });
       }
       return res.status(500).json({ success: false, message: err.message });
   }
        

    // } catch (err) {
    //   console.error(err);
    //   res.status(500).json({ message: 'Internal server error' });
    // }
};




module.exports = { uploadXLSX };
