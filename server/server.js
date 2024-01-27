require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");

const corsOptions = {
	origin: [
		"http://localhost:5173",
		"http://localhost:4173",
		"http://127.0.0.1:5500",
	],
	methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
	credientials: true,
};

const os = require("os");
const hostaddress = os.hostname();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.get("/", (req, res) => {
	res.json({
		message: "Server online",
		developer: "Durlav Parajuli",
		device: hostaddress,
		network: req.connection.remoteAddress,
		osVersion: os.release(),
		osPlatform: os.platform(),
		uptime: parseInt(os.uptime()) + " seconds",
		user: os.userInfo(),
	});
});

app.use("/api/dictionary", function (req, res) {
	res.status(200).json({
		data: [
			{
				category: 1,
				categoryName: "Greetings",
				words: [
					{ id: 1, korean: "안녕하세요", english: "Hello" },
					{ id: 2, korean: "감사합니다", english: "Thank you" },
					{ id: 3, korean: "사랑", english: "Love" },
					{ id: 4, korean: "음식", english: "Food" },
					{ id: 5, korean: "학교", english: "School" },
				],
			},
			{
				category: 2,
				categoryName: "Travel and Leisure",
				words: [
					{ id: 1, korean: "가족", english: "Family" },
					{ id: 2, korean: "여행", english: "Travel" },
					{ id: 3, korean: "컴퓨터", english: "Computer" },
					{ id: 4, korean: "의료", english: "Medical" },
					{ id: 5, korean: "문화", english: "Culture" },
				],
			},
			{
				category: 3,
				categoryName: "Arts and Entertainment",
				words: [
					{ id: 1, korean: "미술", english: "Art" },
					{ id: 2, korean: "음악", english: "Music" },
					{ id: 3, korean: "체육", english: "Sports" },
					{ id: 4, korean: "역사", english: "History" },
					{ id: 5, korean: "과학", english: "Science" },
				],
			},
			{
				category: 4,
				categoryName: "Books and Hobbies",
				words: [
					{ id: 1, korean: "책", english: "Book" },
					{ id: 2, korean: "영화", english: "Movie" },
					{ id: 3, korean: "음식점", english: "Restaurant" },
					{ id: 4, korean: "여행지", english: "Destination" },
					{ id: 5, korean: "휴가", english: "Vacation" },
				],
			},
			{
				category: 5,
				categoryName: "Technology",
				words: [
					{ id: 1, korean: "코딩", english: "Coding" },
					{ id: 2, korean: "프로그래밍", english: "Programming" },
					{ id: 3, korean: "웹개발", english: "Web Development" },
					{ id: 4, korean: "데이터베이스", english: "Database" },
					{ id: 5, korean: "알고리즘", english: "Algorithm" },
				],
			},
			{
				category: 6,
				categoryName: "Medical Professions",
				words: [
					{ id: 1, korean: "의사", english: "Doctor" },
					{ id: 2, korean: "간호사", english: "Nurse" },
					{ id: 3, korean: "치과의사", english: "Dentist" },
					{ id: 4, korean: "약사", english: "Pharmacist" },
					{ id: 5, korean: "의료기사", english: "Medical Technician" },
				],
			},
			{
				category: 7,
				categoryName: "Beverages",
				words: [
					{ id: 1, korean: "커피", english: "Coffee" },
					{ id: 2, korean: "차", english: "Tea" },
					{ id: 3, korean: "주스", english: "Juice" },
					{ id: 4, korean: "맥주", english: "Beer" },
					{ id: 5, korean: "와인", english: "Wine" },
				],
			},
			{
				category: 8,
				categoryName: "Fashion and Accessories",
				words: [
					{ id: 1, korean: "모자", english: "Hat" },
					{ id: 2, korean: "신발", english: "Shoes" },
					{ id: 3, korean: "옷", english: "Clothes" },
					{ id: 4, korean: "가방", english: "Bag" },
					{ id: 5, korean: "안경", english: "Glasses" },
				],
			},
			{
				category: 9,
				categoryName: "Weather",
				words: [
					{ id: 1, korean: "우산", english: "Umbrella" },
					{ id: 2, korean: "비", english: "Rain" },
					{ id: 3, korean: "태양", english: "Sun" },
					{ id: 4, korean: "눈", english: "Snow" },
					{ id: 5, korean: "바람", english: "Wind" },
				],
			},
			{
				category: 10,
				categoryName: "Human Relations",
				words: [
					{ id: 1, korean: "친구", english: "Friend" },
					{ id: 2, korean: "사람", english: "Person" },
					{ id: 3, korean: "가치", english: "Value" },
					{ id: 4, korean: "꿈", english: "Dream" },
					{ id: 5, korean: "미소", english: "Smile" },
				],
			},
		],
	});
});

app.use("/api/categories", function (req, res) {
	res.status(200).json({
		categories: [
			{ id: 1, name: "Greetings" },
			{ id: 2, name: "Expressing Gratitude" },
			{ id: 3, name: "Emotions" },
			{ id: 4, name: "Cuisine" },
			{ id: 5, name: "Education" },
			{ id: 6, name: "Relationships" },
			{ id: 7, name: "Activities" },
			{ id: 8, name: "Technology" },
			{ id: 9, name: "Health" },
			{ id: 10, name: "Arts" },
			{ id: 11, name: "test" },
			{ id: 12, name: "test2" },
		],
	});
});

app.use(errorMiddleware);

connectDB().then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`server is running at port: ${process.env.PORT}`);
	});
});
