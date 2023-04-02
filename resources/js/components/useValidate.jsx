import { useState } from "react";

const useValidate = async (section,object) =>{
    let checked = false;
    let showObj = {};
    const allEmpty = await Object.values(object).every(v=>v == '');
    if(allEmpty){
        showObj = {
            state: 'alert-fail',
            message: 'Please fill all the inputs first'
        }
    }else{
        const isEmpty = await Object.values(object).some(v=>v == '');
        if(isEmpty){
            showObj = {
                state: 'alert-fail',
                message: 'Input fields should not be empty'
            }
        }else{
            switch(section){
                case 'Members':
                    if(object.Cef.match(/^[0-9]{13}$/)){
                        const domain = /@ofppt-edu.ma$/;
                        const domainTest = domain.test(object.Email.toLowerCase());
                        if(domainTest){
                            if(object.Email.match(/\@/g).length === 1){
                                checked = true;
                            }else{
                                showObj = {
                                    state: 'alert-fail',
                                    message: 'Email should contain only one @'
                                }
                            }
                        }else{
                            showObj = {
                                state: 'alert-fail',
                                message: 'Email should end with @ofppt-edu.ma'
                            }
                        }
                    }else{
                        showObj = {
                            state: 'alert-fail',
                            message: 'Cef should contain exactly 13 digits'
                        }
                    }
                    break;
                case 'Sessions':
                    const pattern = /^\d{4}-\d{4}$/;
                    if(pattern.test(object.Reference)){
                        const [sec1, sec2] = object.Reference.split('-');
                        if((+sec1) + 1 === (+sec2)){
                            checked = true;
                        }else{
                        showObj = {
                            state: 'alert-fail',
                            message: 'Example: 2022-2023'
                        }
                        }
                    }
                    else{
                        showObj = {
                            state: 'alert-fail',
                            message: 'Example: 2022-2023'
                        }
                    }
                    break;
                case 'Plannings':
                case 'Posts':
                    checked = true;
                    break;
            }
        }
    }
    const data = [showObj, checked]
    return data;
}
export default useValidate;