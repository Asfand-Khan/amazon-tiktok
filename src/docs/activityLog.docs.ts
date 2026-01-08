/**
 * @swagger
 * tags:
 *   name: Activity Logs
 *   description: Activity log management and retrieval
 */

/**
 * @swagger
 * /activity-logs/me:
 *   get:
 *     summary: Get current user's activity logs
 *     tags: [Activity Logs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of activity logs for the current user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   action:
 *                     type: string
 *                   details:
 *                     type: object
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /activity-logs:
 *   get:
 *     summary: Get all activity logs (Admin only)
 *     tags: [Activity Logs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of all activity logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
