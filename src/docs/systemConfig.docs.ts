/**
 * @swagger
 * tags:
 *   name: System Config
 *   description: System configuration management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SystemConfig:
 *       type: object
 *       properties:
 *         key:
 *           type: string
 *         value:
 *           type: object
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /system-config:
 *   post:
 *     summary: Create system config (Super Admin)
 *     tags: [System Config]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [key, value]
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: object
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: System config created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemConfig'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Super Admin only
 *   get:
 *     summary: Get all system configs (Super Admin)
 *     tags: [System Config]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of system configs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SystemConfig'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Super Admin only
 *
 * /system-config/{key}:
 *   get:
 *     summary: Get system config by key (Super Admin)
 *     tags: [System Config]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Config Key
 *     responses:
 *       200:
 *         description: System config details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemConfig'
 *       404:
 *         description: Config not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Super Admin only
 *   patch:
 *     summary: Update system config (Super Admin)
 *     tags: [System Config]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Config Key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: object
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated system config
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemConfig'
 *       404:
 *         description: Config not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Super Admin only
 */
