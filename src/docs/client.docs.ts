/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client dashboard endpoints
 */

/**
 * @swagger
 * /clients/dashboard:
 *   get:
 *     summary: Get client dashboard data
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     clientProfile:
 *                       $ref: '#/components/schemas/Client'
 *                     stats:
 *                       type: object
 *                       properties:
 *                         usage:
 *                           type: integer
 *                         limit:
 *                           type: integer
 */

/**
 * @swagger
 * /clients/api-key/regenerate:
 *   post:
 *     summary: Regenerate API Key
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: New API Key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     apiKey:
 *                       type: string
 */
