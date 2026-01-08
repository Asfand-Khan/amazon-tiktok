import { PaymentRepository } from '../repositories/payment.repository.js';
import { ClientRepository } from '../repositories/client.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';
const paymentRepository = new PaymentRepository();
const clientRepository = new ClientRepository();
export class PaymentService {
    async createPayment(data) {
        const client = await clientRepository.findById(data.clientId);
        if (!client) {
            throw new AppError('Client not found', 404);
        }
        const paymentData = {
            client: { connect: { id: client.id } },
            amount: new Prisma.Decimal(data.amount),
            currency: data.currency,
            description: data.description,
            status: 'PENDING',
        };
        return paymentRepository.create(paymentData);
    }
    async getAllPayments() {
        return paymentRepository.findAll({});
    }
    async getMyPayments(userId) {
        const client = await clientRepository.findByUserId(userId);
        if (!client)
            return [];
        return paymentRepository.findAll({ clientId: client.id });
    }
    async getPaymentById(id) {
        const payment = await paymentRepository.findById(id);
        if (!payment) {
            throw new AppError('Payment not found', 404);
        }
        return payment;
    }
    async updatePayment(id, data) {
        const payment = await paymentRepository.findById(id);
        if (!payment) {
            throw new AppError('Payment not found', 404);
        }
        return paymentRepository.update(id, data);
    }
}
//# sourceMappingURL=payment.service.js.map