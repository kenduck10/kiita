import Link from 'next/link';

export const NotFound = () => {
  return (
    <>
      <p>指定のページが見つかりませんでした</p>
      <Link href={`/`}>ホーム</Link>
    </>
  );
};

export default NotFound;
