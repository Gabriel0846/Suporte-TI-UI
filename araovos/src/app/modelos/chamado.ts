export interface Chamado {
    id?: any;
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: number; 
    status: number;     
    titulo: string;
    observacoes: string;
    tecnico: any;
    cliente: any;
    nomeCliente: string;
    nomeTecnico: string;
}
