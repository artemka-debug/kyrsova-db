export class AppointmentService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async get(query) {
    const [results] = await this.#db.getWithParams({
      table: 'Appointment',
      params: {
        AppointmentID: query.id,
        DoctorFK: query.doctorId,
        PatientFK: query.patientId,
      },
    });

    return results;
  }

  async create(appointment) {
    await this.#db.create({
      table: 'Appointment',
      params: {
        AppointmentID: appointment.id,
        Date: appointment.date,
        DoctorFK: appointment.doctorId,
        PatientFK: appointment.patientId,
        Diagnosis: appointment.diagnosis,
      },
    });
  }

  async remove(appointmentId) {
    await this.#db.remove({
      table: 'Appointment',
      where: {
        AppointmentID: appointmentId,
      },
    });
  }

  async update(appointment) {
    await this.#db.update({
      table: 'Appointment',
      params: {
        Date: appointment.date,
        Diagnosis: appointment.diagnosis,
      },
      where: {
        AppointmentID: appointment.id,
      },
    });
  }
}
