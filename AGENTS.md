# Agent Instructions

This file contains instructions for AI coding agents working on this project.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

### Quick Deployment Commands

```bash
# Automated deployment (recommended)
git push origin deploy-to-aws-20260130_032535-sergeyka

# Manual preview deployment
./scripts/deploy.sh

# Manual production deployment
./scripts/deploy.sh prod
```

### Pipeline Deployment

- **Pipeline**: GatsbyBlogPipeline
- **Pipeline URL**: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/GatsbyBlogPipeline/view
- **Trigger Branch**: deploy-to-aws-20260130_032535-sergeyka
- **Production Stack**: GatsbyBlogFrontend-prod

### Manual Deployments

- **Preview Environment**: preview-sergeyka
- **Preview URL**: https://d2dtmobc2ypry3.cloudfront.net
- **Stack**: GatsbyBlogFrontend-preview-sergeyka
- **Distribution ID**: E2Z8K4D5P1S3P4
