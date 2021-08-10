declare namespace Express {
  export interface Request {
    patient_id: string;
    patient_cpf: string;
    doctor_id: string;
    doctor_crm: string;
    admin_secret: string;
  }
}
