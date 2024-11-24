export default interface CreateServerRequest {
    templateId: string,
    variables: Record<string, string>
}