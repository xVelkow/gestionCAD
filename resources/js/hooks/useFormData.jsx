const useFormData = (method,section,object) =>{
        const formData = new FormData();
        if(method === 'PATCH'){
            formData.append('_method', 'PATCH');
        }
        switch(section){
            case 'Members':
                formData.append('id',object.Cef);
                formData.append('fullNameMember',object.Name);
                formData.append('groupMember',object.Group);
                formData.append('email',object.Email);
                formData.append('departmentMember',object.Department);
                formData.append('roleMember',object.Role);
                formData.append('sessionMember',object.Session);
                break;
            case 'Sessions':
                formData.append('refSession',object.Reference);
                break;
            case 'Plannings':
                formData.append('titlePlanning',object.Title);
                formData.append('descriptionPlanning',object.Description);
                formData.append('sessionPlanning',object.Session);
                break;
            case 'Posts':
                console.log(object)
                formData.append('titlePost',object.Title);
                formData.append('descriptionPost',object.Description);
                formData.append('sessionPost',object.Session);
                formData.append('imagePost',object.Image);
                break;
            case 'Departments':
                formData.append('nameDepartment',object.Name);
                formData.append('descriptionDepartment',object.Description);
                formData.append('sessionDepartment',object.Session);
                break;
            case 'Password':
                formData.append('password',object.newPassword);
                break;
        }
        return formData;
}
export default useFormData;