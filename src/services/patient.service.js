export class PatientService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async get(query) {
    const [results] = await this.#db.getWithParams({
      table: 'Patient',
      params: {
        PatientID: query.id,
        Name: query.name,
      },
    });

    return results;
  }

  async create(patient) {
    await this.#db.create({
      table: 'Patient',
      params: {
        PatientId: patient.id,
        Name: patient.name,
        Surname: patient.surname,
        Sex: patient.sex,
        PhoneNumber: patient.phone,
        DateOfBirht: patient.birthDate,
        MedicalHistory: '',
        RoomFK: null,
      },
    });
  }

  async remove(patientId) {
    await this.#db.remove({
      table: 'Patient',
      where: {
        PatientId: patientId,
      },
    });
  }

  async update(patient) {
    await this.#db.update({
      table: 'Patient',
      params: {
        Name: patient.name,
        Surname: patient.surname,
        Sex: patient.sex,
        PhoneNumber: patient.phone,
        DateOfBirht: patient.birthDate,
        MedicalHistory: patient.medicalHistory,
      },
      where: {
        PatientId: patient.id,
      },
    });
  }
}
