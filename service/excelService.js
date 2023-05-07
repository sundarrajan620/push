const excel = require("../models/answerType");
const XLSX = require('xlsx');

const updateXLSX = async (path) => {
  const workbook = XLSX.readFile(path);
  const sheetNames = workbook.SheetNames;
  let jsonData = [];
  let chapterId = 1;
  sheetNames.forEach(sheetNameList => {
    const worksheet = workbook.Sheets[sheetNameList];
    const dataList = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: null }).map((row) => {
      for (const key in row) {
        if (typeof row[key] === 'string') {
          row[key] = row[key].trim();
        }
      }
      return row;
    });

    const questions = dataList.map((data) => ({
      questionId: data.sno,
      questionType: data.questionType,
      question: data.question,
      answerType: data.answerType,
      choices: [
        { id: "option1", content: data.option1 },
        { id: "option2", content: data.option2 },
        { id: "option3", content: data.option3 },
        { id: "option4", content: data.option4 },
      ],
      answer: [data.answer],
      explanation: { type: "text", value: data.explanation },
      difficulty: data.difficulty,
      tags: [
        {
          subjectCode: "BIO",
          chapterId: chapterId,
          chapterName: sheetNameList,
        },
      ]

    }));
    jsonData.push(questions.flat());
    chapterId++;
  });

  //   for (i = 0; i < sheetNames.length; i++) {
  //       const sheetNameList = sheetNames[i];
  //   const worksheet = workbook.Sheets[sheetNameList];
  //   const dataList = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: null }).map((row) => {
  //     for (const key in row) {
  //       if (typeof row[key] === 'string') {
  //         row[key] = row[key].trim();
  //       }
  //     }
  //     return row;
  //   });

  //   const questions = dataList.map((data) => ({
  //     questionId: data.sno,
  //     question: data.question,
  //     answerType: data.answerType,
  //     choices: [
  //       { id: "option1", content: data.option1 },
  //       { id: "option2", content: data.option2 },
  //       { id: "option3", content: data.option3 },
  //       { id: "option4", content: data.option4 },
  //     ],
  //     answer: [data.answer],
  //     explanation: { type: "text", value: data.explanation },
  //     difficulty: data.difficulty,
  //     tags: [
  //       {
  //         subjectCode: "BIO",
  //         chapterId: i + 1,
  //         chapterName: sheetNameList,
  //       },
  //     ]

  //   }));
  //   jsonData.push(questions.flat());

  // };

  console.log(jsonData);

  const savedData = await excel.create(jsonData.flat());
  //return savedData.length;

  return (jsonData.flat());

};



// const updateChapterById = async (path,chapterId) => {
//     const updatedData = await excel.updateMany({ "tags.chapterId": chapterId }, data);
//     return updatedData;
//   };


const update = async (path, id) => {
  const workbook = XLSX.readFile(path);
  const sheetNames = workbook.SheetNames;
  let jsonData = [];

  for (i = 0; i < sheetNames.length; i++) {
    const sheetNameList = sheetNames[i];
    const worksheet = workbook.Sheets[sheetNameList];
    const dataList = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: null }).map((row) => {
      for (const key in row) {
        if (typeof row[key] === 'string') {
          row[key] = row[key].trim();
        }
      }
      return row;
    });

    const questions = dataList.map((data) => ({
      questionId: data.sno,
      question: data.question,
      answerType: data.answerType,
      choices: [
        { id: "option1", content: data.option1 },
        { id: "option2", content: data.option2 },
        { id: "option3", content: data.option3 },
        { id: "option4", content: data.option4 },
      ],
      answer: [data.answer],
      explanation: { type: "text", value: data.explanation },
      difficulty: data.difficulty,
      tags: [
        {
          subjectCode: "BIO",
          chapterId: i + 1,
          chapterName: sheetNameList,
        },
      ]

    }));
    jsonData.push(questions.flat());

  };

  console.log(jsonData);

  const updatedData = await excel.findByIdAndUpdate(id, jsonData.flat(), { new: true });
  //return updatedData;

  return (jsonData.flat());
};





const deleteChapterById = async (chapterId) => {
  const deletedData = await excel.deleteMany({ "tags.chapterId": chapterId });
  return deletedData;
};

const deleteQuestionById = async (questionId) => {
  const deletedData = await excel.deleteOne({ questionId });
  return deletedData;
};

module.exports = { updateXLSX, deleteChapterById, deleteQuestionById, update };


