const excel = require("../models/bioexcel");

//const excelToJson = require("convert-excel-to-json");
const XLSX = require('xlsx');



const uploadXLSX = async (req, res, next) => {
    try {
      let path = req.file.path;
      var workbook = XLSX.readFile(path);
      var sheetNames = workbook.SheetNames;
      let jsonData = {};

      for(i=0; i<=sheetNames.length;i++){
        const sheetNameList = sheetNames[i];
  const worksheet = workbook.Sheets[sheetNameList];
  
  jsonData[sheetNameList]=data;

        // jsonData[i] = XLSX.utils.sheet_to_json(
        //   workbook.Sheets[sheet_name_list[i]]
        // );
      }
      console.log(jsonData);

      // let jsonData = XLSX.utils.sheet_to_json(
      //   workbook.Sheets[sheet_name_list[0]]
      // );
      //console.log(jsonData);

      if (jsonData.length === 0) {
        return res.status(400).json({
          success: false,
          message: "xml sheet has no data",
        });
      }

      const data = jsonData.map((item) => {
        return {          
          id: item.sno,
          question: item.question,
          choices: 
            {
              option1 : item.option1,
              option2 : item.option2,
              option3 : item.option3,
              option4 : item.option4,
            }
          ,
          feedback: 'string',
          answer: item.answer,            
        };
      });

      console.log(data);
      
      let savedData = await excel.create(data);

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
  };

  module.exports = { uploadXLSX };  