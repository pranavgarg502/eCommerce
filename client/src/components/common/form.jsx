
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
const types = {
    INPUT : 'input',
    SELECT : 'select',
    TEXTAREA : 'textarea'
};
function CommonForm({formControls , formData , setFormData , onSubmit , buttonText}){
    function renderInputsByComponentType(getControlItem){
        const value = formData[getControlItem.name] || '';
        let element = null;
        switch (getControlItem.componentType) {
            case types.INPUT:
                element = (<Input 
                name = {getControlItem.name} 
                type = {getControlItem.type}
                placeholder = {getControlItem.placeholder} 
                value = {value}
                onChange = {event => setFormData({
                    ...formData , [getControlItem.name] : event.target.value
                })}
                id = {getControlItem.name}/>)

                break;
            case types.SELECT:
                element = (<Select onValueChange = {value =>setFormData({
                    ...formData , 
                    [getControlItem.name] : value
                }
                   
                ) } value= {value}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder = {getControlItem.placeholder}/>
                    </SelectTrigger>
                    <SelectContent>
                        {getControlItem.options && getControlItem.options.length > 0 ? (
                        getControlItem.options.map(optionItem => (
                            <SelectItem key={optionItem.id} value={optionItem.id}>
                            {optionItem.label}
                            </SelectItem>
                        ))
                        ) : null}

                    </SelectContent>
                </Select>);
                break;  
            case types.TEXTAREA:
                element = (<Textarea
                value = {value}
                onChange = {event => setFormData({
                    ...formData , [getControlItem.name] : event.target.value
                })} 
                name = {getControlItem.name} 
                placeholder = {getControlItem.placeholder} 
                id = {getControlItem.name}/>);
                break;  
            
        
            default:
                element = (<Input 
                value = {value}
                onChange = {event => setFormData({
                    ...formData , [getControlItem.name] : event.target.value
                })}
                name = {getControlItem.name} 
                type = {getControlItem.type}
                placeholder = {getControlItem.placeholder} 
                id = {getControlItem.name}/>);

                break;
        }
        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls.map(
                        controlItem => 
                        <div className="grid w-full gap-1.5" key = {controlItem.name}> 
                            <Label className = "mb-1">{controlItem.label} </Label>
                            {renderInputsByComponentType(controlItem)}
                        </div>

                    )
                }
            </div>  
            <Button type = "submit" className = "mt-2 w-full">{buttonText || 'Submit'}</Button>
        </form>
    );
}
export default CommonForm;