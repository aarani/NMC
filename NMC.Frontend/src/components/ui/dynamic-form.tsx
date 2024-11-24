import { Label } from "@radix-ui/react-label";
import { Button } from "./button";
import { CardContent, CardFooter } from "./card";
import { Input } from "./input";
import Variable from "@/types/variable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Checkbox } from "./checkbox";

interface DynamicFormProps {
    variables: Variable[];
    formValues: Record<string, string>;
    handleInputChange: (name: string, value: string) => void;
}

export default function DynamicForm({ variables, formValues, handleInputChange }: DynamicFormProps) {

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted with values:', formValues);
      // Here you can handle the form submission, e.g., send data to an API
    };
  
    const renderInput = (variable: Variable) => {
      if (variable.acceptable_answers.length === 2 && 
          variable.acceptable_answers.includes('true') && 
          variable.acceptable_answers.includes('false')) {
        return (
          <Checkbox
            id={variable.name}
            checked={formValues[variable.name] === 'true'}
            onCheckedChange={(checked) => 
              handleInputChange(variable.name, checked ? 'true' : 'false')
            }
          />
        );
      } else if (variable.acceptable_answers.length > 1) {
        return (
          <Select onValueChange={(value) => handleInputChange(variable.name, value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select an option`} />
            </SelectTrigger>
            <SelectContent>
              {variable.acceptable_answers.map((answer) => (
                <SelectItem key={answer} value={answer}>
                  {answer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      } else {
        return (
          <Input
            type="text"
            id={variable.name}
            value={formValues[variable.name] || ''}
            onChange={(e) => handleInputChange(variable.name, e.target.value)}
            placeholder={`Enter ${variable.name}`}
          />
        );
      }
    };
  
    return (
        <div>
            {variables.map((variable) => (
            <div key={variable.name} className="space-y-2">
                <div className="flex items-center space-x-2">
                {variable.acceptable_answers.length === 2 && 
                    variable.acceptable_answers.includes('true') && 
                    variable.acceptable_answers.includes('false') ? (
                    <>
                    {renderInput(variable)}
                    <Label htmlFor={variable.name}>{variable.name}</Label>
                    </>
                ) : (
                    <>
                    <Label htmlFor={variable.name}>{variable.name}</Label>
                    {renderInput(variable)}
                    </>
                )}
                </div>
                <p className="text-sm text-gray-500">{variable.description}</p>
            </div>
            ))}
        </div>
    );
  }
  