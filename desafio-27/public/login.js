import { response } from "express";


const login = async(e, form) => {
    e.preventDefault();

    await fetch(form.action, 
        {   
            method:'GET',
            mode: 'no-cors'
        }
    );
}