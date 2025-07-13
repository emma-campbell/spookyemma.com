import { S3Client } from "@aws-sdk/client-s3";

/**
 * S3 client for interacting with DigitalOcean Spaces.
 * 
 * @constant
 * @type {S3Client}
 * @property {boolean} forcePathStyle - Determines whether to use path-style URLs for S3 objects.
 * @property {string} endpoint - The endpoint URL for the S3 service.
 * @property {string} region - The AWS region to send service requests to.
 * @property {Object} credentials - The credentials for accessing the S3 service.
 * @property {string} credentials.accessKeyId - The access key ID for authentication.
 * @property {string} credentials.secretAccessKey - The secret access key for authentication.
 */
const s3Client = new S3Client({
    forcePathStyle: false,
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.SPACES_KEY || '',
        secretAccessKey: process.env.SPACES_SECRET || '',
    }
});

export { s3Client };