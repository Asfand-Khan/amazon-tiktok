/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client dashboard and management endpoints
 */

/**
 * @swagger
 * /clients/dashboard:
 *   get:
 *     summary: Get client dashboard data
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /clients/api-key/regenerate:
 *   post:
 *     summary: Regenerate API Key
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients (Admin only)
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       403:
 *         description: Forbidden - Admin only
 */

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get client by ID (Admin only)
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *       403:
 *         description: Forbidden - Admin only
 *   patch:
 *     summary: Update client (Admin only)
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *       403:
 *         description: Forbidden - Admin only
 *   delete:
 *     summary: Delete client (Admin only)
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       204:
 *         description: Client deleted
 *       404:
 *         description: Client not found
 *       403:
 *         description: Forbidden - Admin only
 */
