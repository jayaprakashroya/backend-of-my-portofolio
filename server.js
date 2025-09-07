const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;
if (!uri || !/^mongodb(\+srv)?:\/\//.test(uri)) {
	console.error('MONGODB_URI environment variable is not set or is invalid.');
	process.exit(1);
}
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});
connection.on('error', (error) => {
	console.error('MongoDB connection error:', error);
});
connection.on('disconnected', () => {
	console.log('MongoDB disconnected');
});

// Schema and Model
const messageSchema = new mongoose.Schema({
	fullname: String,
	email: String,
	message: String,
	date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Routes
app.get('/', (req, res) => {
	res.send('Backend is running');
});

app.post('/api/contact', async (req, res) => {
	try {
		const { fullname, email, message } = req.body;
		const newMessage = new Message({ fullname, email, message });
		await newMessage.save();
		res.status(201).json({ message: 'Message saved successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to save message' });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
