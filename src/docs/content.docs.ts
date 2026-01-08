/**
 * @swagger
 * tags:
 *   name: Content
 *   description: Content management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         slug:
 *           type: string
 *         type:
 *           type: string
 *           enum: [PAGE, BLOG_POST, ANNOUNCEMENT]
 *         isPublished:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /contents:
 *   get:
 *     summary: Get all content
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: List of content
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *   post:
 *     summary: Create new content (Admin only)
 *     tags: [Content]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, body, slug, type]
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               slug:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [PAGE, BLOG_POST, ANNOUNCEMENT]
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Created content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 * /contents/{id}:
 *   get:
 *     summary: Get content by ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Content ID
 *     responses:
 *       200:
 *         description: Content details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Content not found
 *   patch:
 *     summary: Update content (Admin only)
 *     tags: [Content]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               slug:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [PAGE, BLOG_POST, ANNOUNCEMENT]
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Content not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   delete:
 *     summary: Delete content (Admin only)
 *     tags: [Content]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Content ID
 *     responses:
 *       204:
 *         description: Content deleted
 *       404:
 *         description: Content not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
