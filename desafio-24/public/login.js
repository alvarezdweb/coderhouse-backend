
const login = async(e, form) => {

    e.preventDefault();
    await fetch(form.action, 
        {   
            method:'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
        }
    );
    window.location.reload();
}

