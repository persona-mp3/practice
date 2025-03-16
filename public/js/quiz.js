const quizForm = document.querySelector('.questionnaire-form');
const errorMsg = document.querySelector('.error-msg')


function checkSelectedLabel (evt) {

    const radioBtns = document.querySelectorAll('.quiz-checkbox');
    let selectedAns = {}

    // if no button has been selected, prevent moving on to the next question
    radioBtns.forEach((btn) => {
        if (!btn.checked) {
            console.log('no option has been selected');
            
        }
    })




    radioBtns.forEach((btn) => {
        btn.addEventListener('change', (evt) => {

            // check all radio buttons for unselected ones
            radioBtns.forEach((uncheckedBtn) => {
                uncheckedBtn.parentElement.classList.remove('checked');
            })
            

            if (btn.checked) {
                btn.parentElement.classList.add('checked');
                
                // update the value of the selected checkBtn to the object
                // the value for backendDev will be set to the name of the question instead of 'value'
                let btnValue = btn.value;
                selectedAns.value = btnValue;
                
                console.log('value updated', selectedAns)
            }


            if (btn.checked.length === 0) {
                console.log('0 buttons checked')
            }
        })
    })


    return selectedAns

    
}


let isSelected = checkSelectedLabel()

quizForm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    if (isSelected.value === undefined) {
        errorMsg.classList.add('onerror')
        console.log('no value selected');
        return;
    } else {
        errorMsg.classList.remove('onerror')
    }


})


const ctx = document.getElementById('myChart');
const config = {
    type: 'pie',
    data: {
        labels: ['Electricity', 'Transportation', 'Travel', 'Other'],
        datasets: [{
            label: 'Licks',
            data: [20, 40, 50, 50]
        }]
    },

    options: {}

}

new Chart(ctx, config)


// new Chart (ctx, {
//     type: 'doughnut',
//     data: {
//         // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         // borderWidth: 1
//       }]
//     },

//     options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       },

//       cutout: 0

// })

