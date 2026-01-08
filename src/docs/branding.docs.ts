/**
 * @swagger
 * tags:
 *   name: Branding
 *   description: Branding settings management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BrandingSettings:
 *       type: object
 *       properties:
 *         logoUrl:
 *           type: string
 *         primaryColor:
 *           type: string
 *         secondaryColor:
 *           type: string
 *         fontFamily:
 *           type: string
 *         companyName:
 *           type: string
 *       example:
 *         logoUrl: "https://example.com/logo.png"
 *         primaryColor: "#FF0000"
 *         secondaryColor: "#00FF00"
 *         fontFamily: "Roboto"
 *         companyName: "My Company"
 */

/**
 * @swagger
 * /branding:
 *   get:
 *     summary: Get branding settings
 *     tags: [Branding]
 *     responses:
 *       200:
 *         description: Branding settings details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandingSettings'
 *   put:
 *     summary: Update branding settings (Admin only)
 *     tags: [Branding]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandingSettings'
 *     responses:
 *       200:
 *         description: Updated branding settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandingSettings'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   patch:
 *     summary: Partially update branding settings (Admin only)
 *     tags: [Branding]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandingSettings'
 *     responses:
 *       200:
 *         description: Updated branding settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandingSettings'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
