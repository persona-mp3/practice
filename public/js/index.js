const questionRedirectBtn = document.getElementById('question-redirect')
const newsletterForm = document.getElementById('newsletter-form');

questionRedirectBtn.addEventListener('click', () => {
    location.href = '/src/quiz.html'
})

newsletterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

})