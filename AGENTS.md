# Agent Guidelines

This file provides context for AI coding agents working with this codebase.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

## Architecture

This is a Gatsby static site deployed to AWS using:
- **CloudFront**: CDN for global content delivery
- **S3**: Static file hosting
- **CDK**: Infrastructure as Code
- **CloudFormation**: AWS resource management

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run develop

# Build for production
npm run build

# Deploy to AWS
./scripts/deploy.sh
```

## Deployment Strategy

The project uses AWS CDK for infrastructure management. Deployment environments are determined by a username-based preview system:
- `preview-<username>`: Personal preview environments (auto-hotswap enabled)
- `dev`: Shared development environment
- `prod`: Production environment (with termination protection)

Deploy to different environments:
```bash
./scripts/deploy.sh                  # Deploy to preview-$(whoami)
./scripts/deploy.sh dev              # Deploy to dev
./scripts/deploy.sh prod             # Deploy to production
```
