import styled from '@emotion/styled';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { MouseEventHandler, useState } from 'react';
import { NextRouter } from 'next/router';

const StyledTableHeadCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'black',
    color: 'white',
  },
});

const StyledTableBodyRow = styled(TableRow)<{ onClick: MouseEventHandler<HTMLTableRowElement> }>({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f5f5f5',
  },
  '&:hover': {
    cursor: 'pointer',
    opacity: 0.6,
  },
  '&': {
    textDecoration: 'none',
  },
});
export const LinkTable = <T extends object & { id: number }>({
  rows,
  tableHeads,
  router,
  linkParentPath,
}: {
  rows: T[];
  tableHeads: { key: keyof T; name: string }[];
  router: NextRouter;
  linkParentPath: string;
}) => {
  const onClickRow = async (id: number) => {
    await router.push(`${linkParentPath}${id}`);
  };

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <TableContainer>
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              {tableHeads.map((head) => (
                <StyledTableHeadCell key={head.key as string}>{head.name}</StyledTableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const propertyNames = Object.getOwnPropertyNames(row);
              const headKeys = tableHeads.map((tableHead) => tableHead.key as string);
              return (
                <StyledTableBodyRow key={row.id} onClick={() => onClickRow(row.id)}>
                  {propertyNames
                    .filter((propertyName) => headKeys.includes(propertyName))
                    .map((propertyName) => {
                      return <TableCell key={propertyName}>{row[propertyName as keyof T] as string}</TableCell>;
                    })}
                </StyledTableBodyRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={rows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                onPageChange={onPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
