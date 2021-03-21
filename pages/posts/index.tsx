import Link from 'next/link'
import db from '../../utils/db'

const Posts = (props) => {
  const { postsData } = props;

  return (
    <div>
      <h1>Publicaciones</h1>
      {postsData.map(post => (
        <div key={post.id}>
          <Link href={`/posts/${post.slug}`}>
            <a>{post.descripcion}</a>
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  // const posts = await db.collection('posts').orderBy('created', 'desc').get();
  const posts = await db.collection('posts').get();

  const postsData = posts.docs.map(post => ({
    id: post.id,
    ...post.data()
  }));

  console.log('PostsData: ', postsData)

  return {
    props: { postsData },
    revalidate: 10
  }
}

export default Posts;