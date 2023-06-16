import React from 'react';
import PropTypes from 'prop-types';

function PostCard({post}) {
  return (
    <div>{post.caption}</div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object
};

export default PostCard;
