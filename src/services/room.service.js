export class RoomService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async get(query) {
    const [results] = await this.#db.getWithParams({
      table: 'Room',
      params: {
        Number: query.id,
        DepartmentFK: query.departmentId,
      },
    });

    return results;
  }
  async create(room) {
    await this.#db.create({
      table: 'Room',
      params: {
        Number: room.id,
        DepartmentFK: room.departmentId,
        PatientFK: room.patientId,
      },
    });
  }
  async addPatient(room) {
    await this.#db.update({
      table: 'Patient',
      params: {
        RoomFK: room.id,
      },
      where: {
        PatientID: room.patientId,
      },
    });

    await this.#db.update({
      table: 'Room',
      params: {
        PatientFK: room.patientId,
      },
      where: {
        Number: room.id,
      },
    });
  }

  async remove(roomId) {
    await this.#db.remove({
      table: 'Room',
      where: {
        Number: roomId,
      },
    });
  }

  async removePatient(room) {
    await this.#db.update({
      table: 'Patient',
      params: {
        RoomFK: null,
      },
      where: {
        PatientID: room.patientId,
      },
    });

    await this.#db.update({
      table: 'Room',
      params: {
        PatientFK: null,
      },
      where: {
        Number: room.id,
      },
    });
  }
}
