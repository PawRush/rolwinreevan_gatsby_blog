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

The project uses AWS CDK for infrastructure management with two deployment methods:

### 1. Manual Deployment
Deploy to preview/dev environments for testing:
```bash
./scripts/deploy.sh                  # Deploy to preview-$(whoami)
./scripts/deploy.sh dev              # Deploy to dev
```

### 2. CI/CD Pipeline (Recommended for Production)
Automated deployment via AWS CodePipeline:
- **Branch**: `deploy-to-aws-20260129_185538-sergeyka`
- **Trigger**: Push to branch automatically triggers pipeline
- **Target**: Production environment (GatsbyBlogFrontend-prod)
- **Pipeline**: GatsbyBlogPipeline
- **Console**: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/GatsbyBlogPipeline/view

Deploy to production:
```bash
git push origin deploy-to-aws-20260129_185538-sergeyka
```

Pipeline stages:
1. **Source**: Pull from GitHub via CodeConnection
2. **Build**: Quality checks + CDK synthesis + secret scanning
3. **UpdatePipeline**: Self-mutation (if pipeline changed)
4. **Assets**: Publish CloudFormation assets
5. **Deploy**: Deploy GatsbyBlogFrontend-prod stack
