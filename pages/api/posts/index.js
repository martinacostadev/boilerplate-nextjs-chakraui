import db from '../../../utils/db';

export default async (req, res) => {
  try {
    const { slug } = req.body;
    const posts = await db.collection('posts').get();
    const postsData = posts.docs.map(post => post.data());

    if (postsData.some(post => post.slug === slug)) {
      res.status(400).end();
    } else {
      const { id } = await db.collection('posts').add({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
}