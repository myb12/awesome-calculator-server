const multer = require("multer");
const path = require("path");
const upload = multer({ dest: 'uploads/' })

//======Multer configuration======//
module.exports = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),

    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".txt") {
            cb(new Error("Unsupported File Type!"), false);
            return;
        }
        cb(null, true);
    },
});
