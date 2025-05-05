const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadPath = path.join(__dirname, "../uploads");

		// Check if the uploads folder exists, if not, create it
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true });
		}

		cb(null, uploadPath); // Save files in the 'uploads' directory
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
	},
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Only image files are allowed!"), false);
	}
};

// Multer configuration
const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
	fileFilter,
});

module.exports = upload;
