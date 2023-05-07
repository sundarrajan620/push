const mongoose = require("mongoose");

const excelSchema = new mongoose.Schema({
    chapters: [{
        chapterId: { type: String },
        chapterName: { type: String },

        questions: [{
            questionId: { type: String },
            question: { type: String },
            choices: [],
            // feedback: { type: String },
            answer: { type: String },
            explanation: { type: String },
            boolAnswer: { type: Boolean, default: false },
            difficulty: { type: String, default: "medium" },


           
             first: { type: String },
            // gdgfjdgfdgjd
            //gsdfgagf

            explanationn: { type: String },
            boolAnswerr: { type: Boolean, default: false },
            difficultyy: { type: String, default: "medium" }


        }]
    }]
})

//dfsdfjahjdfjkadfsgfsfgs
//dfgshfssffffffffffffffffff

module.exports = mongoose.model('ExcelBio', excelSchema);