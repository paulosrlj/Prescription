import Medicine from '../entities/Medicine';

export interface MedicineResponse {
  id: string;
  idRegister: string;
  nome: string;
  categoria: string;
  classe_terapeutica: string;
  empresa_detentora: string;
  dosagem: string | null;
}

export function handleMedicine(medicine: Medicine): MedicineResponse {
  return {
    id: medicine.id,
    idRegister: medicine.idRegister,
    nome: medicine.nome,
    categoria: medicine.categoria,
    classe_terapeutica: medicine.classe_terapeutica,
    empresa_detentora: medicine.empresa_detentora,
    dosagem: medicine.dosagem,
  };
}
