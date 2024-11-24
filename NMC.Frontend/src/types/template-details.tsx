import Variable from "./variable";

export default interface TemplateDetails {
    variables: Variable[],
    eula_needed: boolean
}