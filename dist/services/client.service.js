import { ClientRepository } from '../repositories/client.repository.js';
import { AppError } from '../utils/AppError.js';
import { v4 as uuidv4 } from 'uuid';
const clientRepository = new ClientRepository();
export class ClientService {
    async getDashboardData(userId) {
        const client = await clientRepository.findByUserId(userId);
        if (!client) {
            throw new AppError('Client profile not found', 404);
        }
        return {
            clientProfile: client,
            stats: {
                usage: client.usageCount,
                limit: client.usageLimit,
            },
        };
    }
    async regenerateApiKey(userId) {
        const client = await clientRepository.findByUserId(userId);
        if (!client) {
            throw new AppError('Client profile not found', 404);
        }
        const newApiKey = uuidv4();
        const updatedClient = await clientRepository.update(client.id, {
            apiKey: newApiKey,
            apiKeyIssuedAt: new Date(),
        });
        return { apiKey: updatedClient.apiKey };
    }
    async getAllClients() {
        return clientRepository.findAll();
    }
    async getClientById(id) {
        const client = await clientRepository.findById(id);
        if (!client) {
            throw new AppError('Client not found', 404);
        }
        return client;
    }
    async updateClient(id, data) {
        const client = await clientRepository.findById(id);
        if (!client) {
            throw new AppError('Client not found', 404);
        }
        return clientRepository.update(id, data);
    }
    async deleteClient(id) {
        const client = await clientRepository.findById(id);
        if (!client) {
            throw new AppError('Client not found', 404);
        }
        return clientRepository.delete(id);
    }
}
//# sourceMappingURL=client.service.js.map