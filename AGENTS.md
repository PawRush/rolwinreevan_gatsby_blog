# Agent Documentation

This document contains information for AI coding agents working with this repository.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

The application is deployed to AWS using:
- CloudFront for global CDN
- S3 for static file hosting
- CloudFormation for infrastructure management
- CDK for infrastructure as code

Deployment URL: https://d21g8av42xrr6i.cloudfront.net

To redeploy: `./scripts/deploy.sh`
