# Agent Documentation

This document contains information for AI coding agents working with this repository.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

The application is deployed to AWS using:
- CodePipeline for automated CI/CD
- CodeBuild for building and testing
- CodeConnections for GitHub integration
- CloudFront for global CDN
- S3 for static file hosting
- CloudFormation for infrastructure management
- CDK for infrastructure as code

**Pipeline**: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/RolwinBlogPipeline/view

**To deploy**: `git push origin deploy-to-aws-20260128_131744-sergeyka`

**Manual deployment (preview)**: `./scripts/deploy.sh`
