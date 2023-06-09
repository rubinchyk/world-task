import React from 'react';
import Posts, { Post } from '../components/posts';
import styles from './Index.module.scss';
import { useRouter } from 'next/router';

type DataProps = {
  res: string;
  message: string;
}

type IndexProps = {
  data: DataProps;
  posts: {
    res: string;
    message: string;
    data: Post[];
  };
}

export default function Index({ data, posts }: IndexProps) {
  const router = useRouter();

  const handleAddNewPostClick = () => {
    router.push("/add_post");
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const { res, message } = data;
  return (
    <>
      <div onClick={handleAddNewPostClick} className={styles['plus-icon']}>Add New Post</div>

      {message}

      <Posts res={posts.res} message={posts.message} data={posts.data} />
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.SERVER_URL}/check_db_connection`);
  const data = await res.json();

  const resPosts = await fetch(`${process.env.SERVER_URL}/get_posts`);
  const posts = await resPosts.json();

  return { props: { data, posts } };
}