/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Something went wrong
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         email:
 *           type: string
 *           format: email
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         role:
 *           type: string
 *           enum: [SUPER_ADMIN, ADMIN, STAFF, CLIENT]
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, SUSPENDED, PENDING]
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     Menu:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         url:
 *           type: string
 *         icon:
 *           type: string
 *         sorting:
 *           type: integer
 *         isActive:
 *           type: boolean
 *         parentId:
 *           type: integer
 *           nullable: true
 *
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         companyName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         apiKey:
 *           type: string
 *         usageCount:
 *           type: integer
 *         usageLimit:
 *           type: integer
 */
