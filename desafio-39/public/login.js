import { response } from "express";

const login = async(e, form) => {

    e.preventDefault();
    const res = await fetch(form.action, 
        {   
            method:'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
        }
    );
}

