import React from 'react';
import { Layout } from 'antd';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Header from '../../components/PageLayout/Header';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import SEO from '../../components/Seo';
import Comment from '../../components/Comment';
import Config from '../../../config';
import Utils from '../../utils/pageUtils';

import 'prismjs/themes/prism-solarizedlight.css';
import './highlight-syntax.less';
import * as style from './post.module.less';

const Post = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark;
  const {
    title, cover, excerpt, path,
  } = frontmatter;
  const image = getImage(cover);

  const canonicalUrl = Utils.resolvePageUrl(
    Config.siteUrl,
    Config.pathPrefix,
    path,
  );
  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <SEO
          title={title}
          description={excerpt}
          path={path}
          keywords={['Rolwin', 'Reevan', 'Monteiro', 'FullStack developer', 'Javascript', 'ReactJS', 'NodeJS', 'Gatsby', 'technology']}
        />
        <Header />
        <SidebarWrapper>
          <div className="marginTopTitle">
            <h1>{title}</h1>
            <div className={style.bannerImgContainer}>
              <GatsbyImage className={style.bannerImg} image={image} title={excerpt} alt={title} />
            </div>
            <article className={style.blogArticle} dangerouslySetInnerHTML={{ __html: html }} />
            <Comment pageCanonicalUrl={canonicalUrl} pageId={title} />
          </div>
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($postPath: String!) {
    markdownRemark(frontmatter: { path: { eq: $postPath } }) {
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        tags
        path
        excerpt
        cover {
          childImageSharp {
            gatsbyImageData(
              width: 1000
              placeholder: TRACED_SVG
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { path: { ne: $postPath } }
        fileAbsolutePath: { regex: "/index.md$/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            tags
            excerpt
            cover {
              childImageSharp {
                gatsbyImageData(
                  width: 600
                  placeholder: TRACED_SVG
                  formats: [AUTO, WEBP]
                )
              }
            }
          }
        }
      }
    }
  }
`;

export default Post;
