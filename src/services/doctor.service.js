export class DoctorService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async get(query) {
    const [results] = await this.#db.getWithParams({
      table: 'Doctor',
      params: {
        DoctorId: query.id,
        Name: query.name,
      },
    });

    return results;
  }

  async create(doctor) {
    await this.#db.create({
      table: 'Doctor',
      params: {
        DoctorId: doctor.id,
        Name: doctor.name,
        Surname: doctor.surname,
        DepartmentFK: doctor.department,
        Speciality: doctor.speciality,
        PhoneNumber: doctor.contact,
        Specialty: doctor.specialty,
        StartedAt: new Date(),
      },
    });
  }

  async remove(doctorId) {
    await this.#db.remove({
      table: 'Doctor',
      where: {
        DoctorId: doctorId,
      },
    });
  }

  async update(doctor) {
    await this.#db.update({
      table: 'Doctor',
      params: {
        Name: doctor.name,
        Surname: doctor.surname,
        Specialty: doctor.specialty,
        PhoneNumber: doctor.contact,
      },
      where: {
        DoctorId: doctor.id,
      },
    });
  }
}
