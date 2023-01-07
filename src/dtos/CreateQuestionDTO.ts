// Vou deitar esse tipo como sugestão de formato para DTO (acho que poderia facilitar nossa vida). 
// Se não concordar, me pede pra mudar quando for revisar o PR;
type CreateQuestionDTO = {
    content: string;
    examId: string;
}

export default CreateQuestionDTO;