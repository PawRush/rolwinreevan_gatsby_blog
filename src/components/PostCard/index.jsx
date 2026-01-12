import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import * as style from './postCard.module.less';
import Utils from '../../utils/pageUtils';

const PostCard = (props) => {
  const { data: { node: { frontmatter } } } = props;
  const imageSrc = frontmatter && frontmatter.cover
    ? getSrc(frontmatter.cover.childImageSharp.gatsbyImageData)
    : '';

  return (
    <div className={style.postCard}>
      <Link to={Utils.resolvePageUrl(frontmatter.path)}>
        <div
          className={style.postCardImg}
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        />
        <div className={style.mrTp20}>
          <p>
            <span className={style.dateHolder}>{frontmatter ? moment(frontmatter.date).format('MMM Do YYYY') : ''}</span>
          </p>
          <h3>{frontmatter ? frontmatter.title : ''}</h3>
          <p>{frontmatter ? frontmatter.excerpt : ''}</p>
          <p style={{ color: '#ce6d96', wordSpacing: '10px' }}>
            {
                `#${frontmatter.tags.join(' #')}`
            }
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
