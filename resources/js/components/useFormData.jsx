const useFormData = (method,section,object) =>{
    // if(isReady){
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
                break;
            case 'Sessions':
                formData.append('refSession',object.Reference);
                break;
            case 'Plannings':
                formData.append('titlePlanning',object.Title);
                formData.append('descriptionPlanning',object.Description);
                break;
            case 'Posts':
                formData.append('titlePost',object.Title);
                formData.append('descriptionPost',object.Description);
                break;
            case 'Departments':
                formData.append('nameDepartment',object.Name);
                formData.append('descriptionDepartment',object.Description);
                break;
        }
        return formData;
    // }
}
export default useFormData;