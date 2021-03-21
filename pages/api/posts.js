import db from '../../utils/db';

export default async (req, res) => {
  try {
    const posts = await db.collection('posts').orderBy('created').get();
    const postsData = posts.docs.map(entry => ({
      id: entry.id,
      ...entry.data()
    }));
    res.status(200).json({ postsData });
  } catch (e) {
    res.status(400).end();
  }
}