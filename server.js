require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Question = require('./models/Question');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', async () => {
  console.log('Connected to Database');
  // Seed the database if it's empty
  const count = await Question.countDocuments();
  if (count === 0) {
    const questions = [
      {
        question: 'What is the name of the father of Judah?',
        options: ['Reuben', 'Isreal'],
        answer: 'B',
      },
      {
        question: 'Who is the mother of Jacob?',
        options: ['Sarah', 'Rebecca'],
        answer: 'B',
      },
      {
        question: "What is the name of Lot's Uncle?",
        options: ['Joseph', 'Abraham'],
        answer: 'B',
      },
      {
        question: "What are the name of Jacob's wives ?",
        options: ['Racheal & Leah', 'leah & Rebecca'],
        answer: 'A',
      },
      {
        question: 'What is the name of the father of Racheal ?',
        options: ['Laban', 'Lot'],
        answer: 'A',
      },
    ];
    await Question.insertMany(questions);
    console.log('Database seeded');
  }
});

app.use(express.json());

const questionsRouter = require('./routes/questions');
app.use('/api/questions', questionsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
