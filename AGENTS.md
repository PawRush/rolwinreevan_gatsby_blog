# Agent Instructions

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, and next steps.

The application is deployed to AWS using:
1. [deploy-frontend-app] - Initial CloudFront + S3 deployment
2. [deploy-codepipeline] - CI/CD pipeline for automated deployments

**Pipeline**: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/GatsbyBlogPipeline/view

**Preview URL** (manual): https://d1kii5o78zdw86.cloudfront.net

**Production URL** (pipeline): Available after pipeline completes

To deploy changes: Push to `deploy-to-aws` branch
