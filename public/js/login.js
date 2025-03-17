const loginForm = document.querySelector('.loginForm');
const localhost = new URL(`http://localhost:8080/login`);

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
        console.log('response has been sent, awaiting data')
    
    } catch (err) {
        console.log('fetch event didn;t occur -->', err)
    }
    
}


loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    let isComplete = await sendData(loginForm);

    if (isComplete === 0) {
        alert('a field has not been field');
        return;
    }

    console.log('all fields have been filled', isComplete)
})