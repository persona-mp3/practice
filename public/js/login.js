const loginForm = document.querySelector('.loginForm');
const errorMsg = document.querySelector('.error-msg')



// fetch API is js native http request API that replaced the bulky XML API
// other js  API's include axios but is not native to js but managed by open source

async function sendData(form) { 
    const formData = new FormData(form)
    const userData = {}
    
    // formData has an iterable method  using object.entries() which returns the keys and values in strings
    for (let [name, value] of formData.entries()) {

        if (value.trim() === '' || value === undefined) {
            console.log('value -->', value)
            errorMsg.innerText = 'All fields must be filled'
            errorMsg.classList.add('onerror')
            return 0;
        
        }
        userData[`${name}`] = value;

        
    }

    

    // console.log(userData)

    try { 
        const localhost = new URL(`http://localhost:8080/login`);

        const response = await fetch(localhost, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        } )
        
        const data = await response.json()


        if (response.status === 404) {
            errorMsg.innerText = data.msg
            return;
        }

        if (response.status === 401) {
            errorMsg.innerText = data.msg
            return

        }

        if (response.status === 200) {
            errorMsg.innerText = data.msg
            errorMsg.classList.remove('onerror')
            errorMsg.classList.add('onsuccess')
            return
        }
    
    
    } catch (err) {
        console.log('fetch event didn;t occur -->', err)
    }
    
}


loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    let isComplete = await sendData(loginForm);

    if (isComplete === 0) {
        return;
    }

    console.log('all fields have been filled', isComplete)
})