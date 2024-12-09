const ServiceRepository = require("../repository/services.repository");

class ServicesService {
  serviceRepository;
  constructor() {
    this.serviceRepository = new ServiceRepository();
  }

  async getAllServices() {
    const services = await this.serviceRepository.getAllServices();
    return services;
  }

  async getServiceByCode(code) {
    const service = await this.serviceRepository.getServiceByCode(code);
    return service;
  }
}

module.exports = ServicesService;
