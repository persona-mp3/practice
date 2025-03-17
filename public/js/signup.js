const signupForm = document.querySelector('.signupForm');
const localhost = new URL(`http://localhost:8080/signup`);
const errorMsg = document.querySelector('.error-msg');
const submitBtn = document.querySelector('.cta-btn')

// fetch API is js native http request API that replaced the bulky XML API
// other js  API's include axios but is not native to js but managed by open source

async function sendData(form) { 
    
    const formData = new FormData(form)
    const userData = {}
    
    // formData has an iterable method  using object.entries() which returns the keys and values in strings
    for (let [name, value] of formData.entries()) {

        if (value === '') {
            console.log('value -->', value)
            return 0;
        
        }
        userData[`${name}`] = value;

        
    }

    

    console.log(userData)

    try { 
        const response = await fetch(localhost, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        } )
    
    
        const data = await response.json()

        if (response.status === 406) {
            errorMsg.classList.add('onerror')
            return;
        }
        
        if (response.status === 200) {
            submitBtn.disabled = true;
            submitBtn.setAttribute("style", "background-color: grey")
            errorMsg.classList.remove('onerror')
            errorMsg.classList.add('onsuccess')
            errorMsg.innerText = data.message

            setTimeout(() => {
                location.href = 'login.html'
            }, 3000)
            return;

        }

            
    } catch (err) {
        console.log('fetch event didn;t occur -->', err)
    }
    
}


signupForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    let isComplete = await sendData(signupForm);

    if (isComplete === 0) {
        alert('a field has not been field');
        return;
    }

})