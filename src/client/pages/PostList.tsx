import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
// import { graphql } from 'react-relay';
// import * as PostListQueryGraphql from '@/graphql/PostListQuery.graphql';
// import PostItem from './PostItem';
import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query PostListQuery{
  allPosts{
    # ...PostItem__Post
    id
  }
}
`

const PostList = () => {
  const data = useLazyLoadQuery(query, {});
  if (data == null) {
    return <div>Empty Post</div>
  }
  return <div />
  // return <div>{data.allPosts.map((post) => <PostItem post={post} />)}</div>
}

export default PostList;