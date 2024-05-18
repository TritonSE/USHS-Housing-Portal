import { useState } from "react";
import styled from "styled-components";

import { TablePagination } from "./TablePagination";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
  border-radius: 8px;
  background: #ffffff;
  padding: 16px 20px;
`;

const TableColumnHeader = styled.div`
  display: flex;
  flex: 1;
  padding: 12px 4px;
  justify-content: center;
  color: black;

  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.neutralGray0};
`;

const TableCell = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 22px 4px;
`;

const TableFooter = styled.div`
  padding-top: 20px;
`;

const TablePlaceholder = styled.div`
  padding: 12px 4px;
`;

export type TableCellContent = string | JSX.Element;

export type TableProps = {
  columns: string[];
  rows: TableCellContent[][];
  rowsPerPage?: number;
};

export const Table = (props: TableProps) => {
  const { columns, rows, rowsPerPage = 10 } = props;
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <TableContainer>
      <TableRow>
        {columns.map((name, idx) => (
          <TableColumnHeader key={idx}>{name}</TableColumnHeader>
        ))}
      </TableRow>
      {rows && rows.length > 0 ? (
        <>
          {rows
            .slice((pageNumber - 1) * rowsPerPage, pageNumber * rowsPerPage)
            .map((rowContent, rowIdx) => (
              <TableRow key={rowIdx}>
                {rowContent.map((cell, cellIdx) => (
                  <TableCell key={rowIdx + cellIdx}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          <TableFooter>
            {/* TODO: Replace this with new pagination when it is implemented */}
            <TablePagination
              totalPages={Math.ceil(rows.length / rowsPerPage)}
              currPage={pageNumber}
              setPageNumber={setPageNumber}
            />
          </TableFooter>
        </>
      ) : (
        <TablePlaceholder>Nothing to see here.</TablePlaceholder>
      )}
    </TableContainer>
  );
};
