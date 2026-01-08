/**
 * @swagger
 * tags:
 *   name: Copied Data
 *   description: Copied data management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CopiedData:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         sourceType:
 *           type: string
 *         sourceId:
 *           type: string
 *         data:
 *           type: object
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /copied-data:
 *   post:
 *     summary: Create copied data record
 *     tags: [Copied Data]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sourceType, sourceId, data]
 *             properties:
 *               sourceType:
 *                 type: string
 *               sourceId:
 *                 type: string
 *               data:
 *                 type: object
 *     responses:
 *       201:
 *         description: Created copied data record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CopiedData'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get my copied data
 *     tags: [Copied Data]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's copied data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CopiedData'
 *       401:
 *         description: Unauthorized
 *
 * /copied-data/{id}:
 *   get:
 *     summary: Get copied data by ID
 *     tags: [Copied Data]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Copied Data ID
 *     responses:
 *       200:
 *         description: Copied data details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CopiedData'
 *       404:
 *         description: Copied data not found
 *       401:
 *         description: Unauthorized
 *   patch:
 *     summary: Update copied data
 *     tags: [Copied Data]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Copied Data ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Updated copied data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CopiedData'
 *       404:
 *         description: Copied data not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete copied data
 *     tags: [Copied Data]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Copied Data ID
 *     responses:
 *       204:
 *         description: Copied data deleted
 *       404:
 *         description: Copied data not found
 *       401:
 *         description: Unauthorized
 */
