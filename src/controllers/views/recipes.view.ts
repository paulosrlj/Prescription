interface IDoctorView {
  crm: string;
  name: string;
  phone: string;
}

export const doctorView = (doctor: IDoctorView): IDoctorView => {
  return { crm: doctor.crm, name: doctor.name, phone: doctor.phone };
};
