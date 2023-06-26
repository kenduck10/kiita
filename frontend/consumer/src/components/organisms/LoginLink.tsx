import {Link} from '@mui/material';
import React from 'react';
import {PAGE_PATH} from '@/utils/consts/route';

/**
 * ログイン画面へのリンク
 * @constructor
 */
export const LoginLink = () => {
  return (
    <Link href={PAGE_PATH.LOGIN} fontWeight={'bold'} underline={'hover'} color={'inherit'}>
      ログイン
    </Link>
  );
};
