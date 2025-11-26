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
}
//# sourceMappingURL=client.service.js.map