const excel = require("../models/answerType");
const XLSX = require('xlsx');

const updateXLSX = async (req, res, next) => {
    try {
        let path = req.file.path;
        var workbook = XLSX.readFile(path);
        var sheetNames = workbook.SheetNames;
        let jsonData = [];

        for (i = 0; i < sheetNames.length; i++) {
            const sheetNameList = sheetNames[i];
            const worksheet = workbook.Sheets[sheetNameList];
            const dataList = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: null }).map((row) => {
                for (let key in row) {
                    if (typeof row[key] === 'string') {
                        row[key] = row[key].trim();
                    }
                }
                return row;
            });
            const questions = dataList.map((questions) => ({
                questionId: questions.sno,
                question: questions.question,
                answerType: questions.answerType,
                choices: [
                    {
                        id: "option1",
                        content: questions.option1
                    },

                    {
                        id: "option2",
                        content: questions.option1
                    },
                    {
                        id: "option3",
                        content: questions.option1
                    },

                    {
                        id: "option4",
                        content: questions.option1
                    },

                ],
                answer:[questions.answer] ,
                explanation:
                {
                  type: "text",
                  value : questions.explanation,
                } ,
                difficulty: questions.difficulty,
                // tags:[
                //   {
                //     subjectCode:"phy",
                //     chapterId: q
                //   }
                // ]
            }));
            jsonData.push({ chapterId: i + 1, chapterName: sheetNameList, questions: questions });

        }
        console.log(jsonData);

        const chapters = jsonData.map((chapter) => ({
          
          questions: chapter.questions,
          tags:[{
            chapterId: chapter.chapterId,
            chapterName: chapter.chapterName,
            
          }],
           
        }));
        console.log(chapters);

        // Update the existing data
        const updatedData = await excel.findOneAndUpdate({}, { chapters }, { new: true });

        res.status(200).json({ updatedData });
    } catch (err) {
        if (err.code === 'ENOENT') {
            return res.status(400).json({
                success: false,
                message: "File not found or path is incorrect",
            });
        }
        //return res.status(500).json({ success: false, message: err.message });
    }
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).json({ message: 'Internal server error' });
    // }
};

module.exports = { updateXLSX };
