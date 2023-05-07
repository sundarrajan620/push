
const excel = require("../models/excel");

const excelToJson = require("convert-excel-to-json");
const XLSX = require('xlsx');
/////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////

const uploadXLSX = async (req, res, next) => {
    try {
        let path = req.file.path;
        const result1 = excelToJson({
            sourceFile: path,
            sheets: [{
                name: 'data',

                header: {
                    // Skip the first row and use the second row as column names
                    rows:null 
                },

                columnToKey: {
                    A: 'code',
                    B: "syllabus",
                    C: 'unit',
                    D: 'chapter'

                }
            }]
        });
        if (!result1 || !result1.data || !result1.data.length) {
            return res.status(400).json({
                success: false,
                message: "Excel sheet has no data"
            });
        }

        // Here you can access the data in result.Sheet1
        console.log(result1.data);

        const result = {};

for (const item of data) {
  const code = item.code;
  const syllabus = item.syllabus;
  const unit = item.unit;
  const chapter = item.chapter;

  if (!result[code]) {
    result[code] = {
      syllabus: []
    };
  }

  const codeObj = result[code];
  let syllabusObj = codeObj.syllabus.find(obj => obj.name === syllabus);

  if (!syllabusObj) {
    syllabusObj = {
      id: syllabus.toLowerCase().replace(/\s+/g, '-'),
      name: syllabus,
      unit: []
    };
    codeObj.syllabus.push(syllabusObj);
  }

  const unitObj = syllabusObj.unit.find(obj => obj.name === unit);

  if (!unitObj) {
    syllabusObj.unit.push({
      id: unit.toLowerCase().replace(/\s+/g, '-'),
      name: unit,
      chapter: []
    });
  }

  const chapterObj = {
    id: chapter.toLowerCase().replace(/\s+/g, '-'),
    name: chapter
  };

  syllabusObj.unit.forEach(unitItem => {
    if (unitItem.name === unit) {
      unitItem.chapter.push(chapterObj);
    }
  });
}

console.log(result);


        return res.status(201).json({
            success: true,
            message: result.data.length + " rows added to the database"
        });
    }
      

   
 catch (err) {
    if (err.code === "ENOENT") {
        return res.status(400).json({
            success: false,
            message: "File not found or path is incorrect"
        });
    }
    return res.status(500).json({ success: false, message: err.message });
}
};


module.exports = { uploadXLSX };  

                                                