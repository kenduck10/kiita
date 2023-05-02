import Link from 'next/link';

export const Error = () => {
  return (
    <>
      <p>予期せぬエラーが発生しました</p>
      <Link href={`/`}>ホーム</Link>
    </>
  );
};

export default Error;
