---
sop_name: deploy-frontend-app
repo_name: rolwinreevan_gatsby_blog
app_name: GatsbyBlog
app_type: Frontend Application
branch: deploy-to-aws-20260130_032535-sergeyka
created: 2026-01-30T04:25:00Z
last_updated: 2026-01-30T04:42:00Z
---

# Deployment Summary

Your app is deployed to AWS with automated CI/CD pipeline!

**Deployments**: Preview URL: https://d2dtmobc2ypry3.cloudfront.net (manual deployment available)

**Pipeline**: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/GatsbyBlogPipeline/view

**Automated Deployment**: Push to `deploy-to-aws-20260130_032535-sergeyka` branch to trigger production deployment

Services used: CodePipeline, CodeBuild, CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# Trigger pipeline deployment (automated)
git push origin deploy-to-aws-20260130_032535-sergeyka

# View pipeline status
aws codepipeline get-pipeline-state --name "GatsbyBlogPipeline" --query 'stageStates[*].[stageName,latestExecution.status]' --output table

# View build logs
aws logs tail "/aws/codebuild/GatsbyBlogPipelineStack-Synth" --follow

# Manual deployment (preview environment)
./scripts/deploy.sh

# View deployment status
aws cloudformation describe-stacks --stack-name "GatsbyBlogFrontend-prod" --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "<distribution-id>" --paths "/*"
```

## Pipeline

Your repository now has automated CI/CD via AWS CodePipeline.

**Pipeline URL**: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/GatsbyBlogPipeline/view

**Trigger**: Push to `deploy-to-aws-20260130_032535-sergeyka` branch

**Pipeline Stages**:
1. **Source**: Pull from GitHub via CodeConnection
2. **Build (Synth)**: Run secret scanning (secretlint) + Gatsby build + CDK synthesis
3. **UpdatePipeline**: Self-mutation (if pipeline code changed)
4. **Assets**: Publish CDK assets to S3
5. **Deploy**: Deploy GatsbyBlogFrontend-prod stack to production

**Production Stack**: GatsbyBlogFrontend-prod (deployed automatically by pipeline)

Created with the [setup-pipeline] Agent Standard Operation Procedure from the [AWS MCP](https://docs.aws.amazon.com/aws-mcp/latest/userguide/what-is-mcp-server.html).

---

## Production Readiness

For production deployments, consider:
- WAF Protection: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- CSP Headers: Configure Content Security Policy in CloudFront response headers (`script-src 'self'`, `frame-ancestors 'none'`)
- Custom Domain: Set up Route 53 and ACM certificate
- Monitoring: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics
- Auth Redirect URLs: If using an auth provider (Auth0, Supabase, Firebase, Lovable, etc.), add your CloudFront URL to allowed redirect URLs

---

# Deployment Plan: GatsbyBlog

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [x] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

## Deployment Info

- Framework: Gatsby
- Package Manager: npm
- Build Command: npm run build
- Output Directory: public/
- Base Path: / (root)
- CloudFront Config: URL rewrite function (/path → /path/index.html)
- Deployment URL: https://d2dtmobc2ypry3.cloudfront.net
- Stack name: GatsbyBlogFrontend-preview-sergeyka
- Distribution ID: E2Z8K4D5P1S3P4
- S3 Bucket: gatsbyblogfrontend-preview--cftos3s3bucketcae9f2be-7phf9midvnou
- S3 Log Bucket: gatsbyblogfrontend-previe-cftos3s3loggingbucket64b-zdr44bzcdefh
- CloudFront Log Bucket: gatsbyblogfrontend-previe-cftos3cloudfrontloggingb-ifynhxpqsfnm
- Deployment Timestamp: 2026-01-30T03:41:37Z

## Recovery Guide

```bash
# Rollback
cd infra
cdk destroy "GatsbyBlogFrontend-preview-sergeyka"

# Redeploy
./scripts/deploy.sh

# Manual invalidation if needed
aws cloudfront create-invalidation --distribution-id "E2Z8K4D5P1S3P4" --paths "/*"
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-30T04:25:00Z
Agent: Claude Sonnet 4.5
Progress: Complete deployment from planning through production validation
Next: Documentation finalized
