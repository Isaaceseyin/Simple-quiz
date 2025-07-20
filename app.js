const result = document.querySelector('.result');
const form = document.querySelector('.quiz-form');
const quizContainer = document.querySelector('.quiz');
let questions = [];
let correctAnswers = [];

const fetchQuestions = async () => {
  try {
    const res = await fetch('/api/questions');
    questions = await res.json();
    correctAnswers = questions.map(q => q.answer);
    displayQuestions();
  } catch (err) {
    console.error(err);
  }
};

const displayQuestions = () => {
  const quizForm = document.querySelector('.quiz-form');
  quizForm.innerHTML = ''; // Clear existing questions
  questions.forEach((q, i) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('my-5');
    let optionsHTML = '';
    q.options.forEach((option, j) => {
      optionsHTML += `
        <div class="my-2 form-check text-white-50">
            <input type="radio" name="q${i + 1}" value="${String.fromCharCode(65 + j)}" id="" checked>
            <label class="form-check-label">${option}</label>
        </div>
      `;
    });
    questionDiv.innerHTML = `
      <p class="lead font-weight-normal">
          ${i + 1}. ${q.question}
      </p>
      ${optionsHTML}
    `;
    quizForm.appendChild(questionDiv);
  });
  const submitButton = document.createElement('div');
  submitButton.classList.add('text-center');
  submitButton.innerHTML = `<input type="submit" class=" btn btn-light" value="Submit">`;
  quizForm.appendChild(submitButton);
};

form.addEventListener('submit', e => {
  e.preventDefault();

  let score = 0;
  const userAnswers = [];
  for (let i = 0; i < questions.length; i++) {
    const userAnswer = form[`q${i + 1}`].value;
    userAnswers.push(userAnswer);
  }


  // check answers
  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 100 / questions.length;
    }
  });
  //show results
  scrollTo(0, 0);
  result.querySelector('span').textContent = `${Math.round(score)}%`
  result.classList.remove('d-none');
});

fetchQuestions();
