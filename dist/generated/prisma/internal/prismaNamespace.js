import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.0.1",
    engine: "f09f2815f091dbba658cdcd2264306d88bb5bda6"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    Session: 'Session',
    Client: 'Client',
    Plan: 'Plan',
    Subscription: 'Subscription',
    Payment: 'Payment',
    CopiedData: 'CopiedData',
    Content: 'Content',
    BrandingSettings: 'BrandingSettings',
    Notification: 'Notification',
    ActivityLog: 'ActivityLog',
    SystemConfig: 'SystemConfig',
    EmailTemplate: 'EmailTemplate'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role',
    status: 'status',
    emailVerified: 'emailVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastLoginAt: 'lastLoginAt'
};
export const SessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
};
export const ClientScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    companyName: 'companyName',
    phoneNumber: 'phoneNumber',
    apiKey: 'apiKey',
    apiKeyIssuedAt: 'apiKeyIssuedAt',
    apiKeyExpiresAt: 'apiKeyExpiresAt',
    apiKeyStatus: 'apiKeyStatus',
    usageCount: 'usageCount',
    usageLimit: 'usageLimit',
    lastUsedAt: 'lastUsedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PlanScalarFieldEnum = {
    id: 'id',
    name: 'name',
    displayName: 'displayName',
    description: 'description',
    type: 'type',
    interval: 'interval',
    price: 'price',
    currency: 'currency',
    usageLimit: 'usageLimit',
    features: 'features',
    isActive: 'isActive',
    isPopular: 'isPopular',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SubscriptionScalarFieldEnum = {
    id: 'id',
    clientId: 'clientId',
    planId: 'planId',
    status: 'status',
    startDate: 'startDate',
    endDate: 'endDate',
    autoRenew: 'autoRenew',
    customUsageLimit: 'customUsageLimit',
    stripeSubscriptionId: 'stripeSubscriptionId',
    stripePriceId: 'stripePriceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    cancelledAt: 'cancelledAt'
};
export const PaymentScalarFieldEnum = {
    id: 'id',
    clientId: 'clientId',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    stripePaymentIntentId: 'stripePaymentIntentId',
    stripeChargeId: 'stripeChargeId',
    stripeInvoiceId: 'stripeInvoiceId',
    stripeCustomerId: 'stripeCustomerId',
    description: 'description',
    metadata: 'metadata',
    failureReason: 'failureReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    paidAt: 'paidAt'
};
export const CopiedDataScalarFieldEnum = {
    id: 'id',
    clientId: 'clientId',
    productTitle: 'productTitle',
    productAsin: 'productAsin',
    productPrice: 'productPrice',
    productImage: 'productImage',
    productUrl: 'productUrl',
    productData: 'productData',
    tiktokShopUrl: 'tiktokShopUrl',
    tiktokStatus: 'tiktokStatus',
    pastedAt: 'pastedAt',
    copiedFrom: 'copiedFrom',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ContentScalarFieldEnum = {
    id: 'id',
    type: 'type',
    title: 'title',
    content: 'content',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    publishedAt: 'publishedAt'
};
export const BrandingSettingsScalarFieldEnum = {
    id: 'id',
    logoUrl: 'logoUrl',
    faviconUrl: 'faviconUrl',
    primaryColor: 'primaryColor',
    secondaryColor: 'secondaryColor',
    fontFamily: 'fontFamily',
    companyName: 'companyName',
    tagline: 'tagline',
    email: 'email',
    phone: 'phone',
    address: 'address',
    socialLinks: 'socialLinks',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    metaKeywords: 'metaKeywords',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    message: 'message',
    metadata: 'metadata',
    isRead: 'isRead',
    readAt: 'readAt',
    createdAt: 'createdAt'
};
export const ActivityLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    actorEmail: 'actorEmail',
    type: 'type',
    description: 'description',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
};
export const SystemConfigScalarFieldEnum = {
    id: 'id',
    key: 'key',
    value: 'value',
    description: 'description',
    isEditable: 'isEditable',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const EmailTemplateScalarFieldEnum = {
    id: 'id',
    type: 'type',
    subject: 'subject',
    body: 'body',
    variables: 'variables',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const JsonNullValueInput = {
    JsonNull: JsonNull
};
export const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const UserOrderByRelevanceFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName'
};
export const SessionOrderByRelevanceFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent'
};
export const ClientOrderByRelevanceFieldEnum = {
    id: 'id',
    userId: 'userId',
    companyName: 'companyName',
    phoneNumber: 'phoneNumber',
    apiKey: 'apiKey'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const PlanOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    displayName: 'displayName',
    description: 'description',
    currency: 'currency'
};
export const SubscriptionOrderByRelevanceFieldEnum = {
    id: 'id',
    clientId: 'clientId',
    planId: 'planId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    stripePriceId: 'stripePriceId'
};
export const PaymentOrderByRelevanceFieldEnum = {
    id: 'id',
    clientId: 'clientId',
    currency: 'currency',
    stripePaymentIntentId: 'stripePaymentIntentId',
    stripeChargeId: 'stripeChargeId',
    stripeInvoiceId: 'stripeInvoiceId',
    stripeCustomerId: 'stripeCustomerId',
    description: 'description',
    failureReason: 'failureReason'
};
export const CopiedDataOrderByRelevanceFieldEnum = {
    id: 'id',
    clientId: 'clientId',
    productTitle: 'productTitle',
    productAsin: 'productAsin',
    productImage: 'productImage',
    productUrl: 'productUrl',
    tiktokShopUrl: 'tiktokShopUrl',
    tiktokStatus: 'tiktokStatus',
    copiedFrom: 'copiedFrom',
    userAgent: 'userAgent'
};
export const ContentOrderByRelevanceFieldEnum = {
    id: 'id',
    title: 'title'
};
export const BrandingSettingsOrderByRelevanceFieldEnum = {
    id: 'id',
    logoUrl: 'logoUrl',
    faviconUrl: 'faviconUrl',
    primaryColor: 'primaryColor',
    secondaryColor: 'secondaryColor',
    fontFamily: 'fontFamily',
    companyName: 'companyName',
    tagline: 'tagline',
    email: 'email',
    phone: 'phone',
    address: 'address',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    metaKeywords: 'metaKeywords'
};
export const NotificationOrderByRelevanceFieldEnum = {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message'
};
export const ActivityLogOrderByRelevanceFieldEnum = {
    id: 'id',
    userId: 'userId',
    actorEmail: 'actorEmail',
    description: 'description',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent'
};
export const SystemConfigOrderByRelevanceFieldEnum = {
    id: 'id',
    key: 'key',
    value: 'value',
    description: 'description'
};
export const EmailTemplateOrderByRelevanceFieldEnum = {
    id: 'id',
    subject: 'subject',
    body: 'body'
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map