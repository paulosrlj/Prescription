import Patient from '../entities/Patient';

interface PatientResponse {
  id: string;
  cpf: string;
  name: string;
  email: string;
  birth_date: Date;
  phone: string;
  card: {
    id: string;
    quantidade_receitas: number;
  };
}

export function handlePatient(patient: Patient): PatientResponse {
  return {
    id: patient.id,
    cpf: patient.cpf,
    name: patient.name,
    email: patient.email,
    birth_date: patient.birth_date,
    phone: patient.phone,
    card: {
      id: patient.card.id,
      quantidade_receitas: patient.card.quantidade_receitas,
    },
  };
}
