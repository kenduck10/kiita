import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PAGE_PATH } from '@/utils/consts/route';

export const Logo = () => {
  return (
    <Link href={PAGE_PATH.HOME}>
      <Image src="/logo.svg" alt="logo" width="96" height="32" />
    </Link>
  );
};
