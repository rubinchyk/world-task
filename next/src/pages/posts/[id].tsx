import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { Post } from '../../components/posts';

type IndexProps = {
  post: {
    res: string;
    message: string;
    data: Post[];
  };
}

export default function Posts(props: IndexProps) {
  const { res, message, data } = props.post;

  if (!props) {
    return <div>Loading...</div>;
  }
  
  const { title, content } = data[0];

  return (
    <>
      <div className="post-wrapper">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id;

  if (!id) {
    return {
      props: {
        res: '',
        message: '',
        data: '' 
      }
    };
  }
  
  const resPosts = await fetch(`${process.env.SERVER_URL}/get_post/${id}`);
  const post = await resPosts.json();

  return { props: { post } };
}