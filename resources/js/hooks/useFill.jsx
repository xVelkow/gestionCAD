import sectionFields from "../modules/sectionFields";
import { useEffect } from "react";
const useFill = (checked, setObject, section, data) =>{
    useEffect(()=>{
		if(data){
			switch(section){
				case 'Members':
					setObject({
						Cef: data.id,
						Name: data.fullNameMember,
						Group: data.groupMember,
						Email: data.email,
						Department: data.departmentMember,
						Role: data.roleMember,
						Session: data.sessionMember
					});
					break;
				case 'Sessions':
					setObject({
						Reference: data.refSession
					});
					break;
				case 'Plannings':
					setObject({
						Title: data.titlePlanning,
						Description: data.descriptionPlanning,
						Session: data.sessionPlanning
					});
					break;
				case 'Posts':
					setObject({
						Title: data.titlePost,
						Description: data.descriptionPost,
						Session: data.sessionPost
					});
					break;
				case 'Departments':
					setObject({
						Name: data.nameDepartment,
						Description: data.descriptionDepartment,
						Session: data.sessionDepartment
					});
					break;
			}
		}
		else if(data == null && !checked){
			sectionFields.map(sections=>{
				sections[0] !== section
				? null
				: sections.map(elements=>{
					typeof(elements) !== 'object'
					? elements === section 
					? null 
					: setObject(object=>({
						...object,
						[elements]: '',
					}))
					: elements.map(element=>{
						element === 'START'
						? null
						: element.map(target=>{
							setObject(object=>({
								...object,
								[target]: '',
							}))
						})
					})
				})
			})
		}
	},[checked,data]);
}
export default useFill;