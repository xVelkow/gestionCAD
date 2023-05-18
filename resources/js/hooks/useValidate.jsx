const useValidate = async (section,object, status = 'updated') =>{
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
                                if(/^\D*$/.test(object.Name)){
                                    showObj = {
                                        state: 'alert-success',
                                        message: `Member ${status} successfully`
                                    }
                                    checked = true;
                                }else{
                                    showObj = {
                                        state: 'alert-fail',
                                        message: 'Name should not contain any numbers'
                                    }
                                }
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
                            showObj = {
                                state: 'alert-success',
                                message: `Session ${status} successfully`
                            }
                        }else{
                        showObj = {
                            state: 'alert-fail',
                            message: 'Example: 2022-2023 | 1 year difference'
                        }
                        }
                    }
                    else{
                        showObj = {
                            state: 'alert-fail',
                            message: 'Example: 2022-2023 | 1 year difference'
                        }
                    }
                    break;
                case 'Plannings':
                    showObj = {
                        state: 'alert-success',
                        message: `Planning ${status} successfully`
                    }
                case 'Posts':
                    showObj = {
                        state: 'alert-success',
                        message: `Post ${status} successfully`
                    }
                case 'Departments':
                    showObj = {
                        state: 'alert-success',
                        message: `Department ${status} successfully`
                    }
                    checked = true;
                    break;
                case 'Password':
                    if(object.newPassword.length >= 8){
                        if(object.newPassword === object.confirmPassword){
                            checked = true;
                            showObj = {
                                state: 'alert-success',
                                message: `Password ${status} successfully`
                            }
                        }else{
                            showObj = {
                                state: 'alert-fail',
                                message: `Passwords should be the same`
                            }
                        }
                    }else{
                        showObj = {
                            state: 'alert-fail',
                            message: `Password should be at least 8 characters long`
                        }
                    }
                    
                    break;
            }
        }
    }
    const data = [showObj, checked]
    return data;
}
export default useValidate;