import {
    Box,
    Paper,
    Skeleton,
    Table as MuiTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField
} from "@mui/material";
import {
    Cell,
    ColumnDef,
    flexRender,
    getCoreRowModel, getSortedRowModel,
    Row, SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { debounce } from "lodash";
import React, { ChangeEvent, FC, memo, useMemo, useState } from "react";
import { StyledPagination, StyledTableRow } from "./styled";

interface TableProps {
    data: any[];
    columns: ColumnDef<any>[];
    isFetching?: boolean;
    skeletonCount?: number;
    skeletonHeight?: number;
    headerComponent?: JSX.Element;
    pageCount?: number;
    page?: (page: number) => void;
    search?: (search: string) => void;
    onClickRow?: (cell: Cell<any, unknown>, row: Row<any>) => void;
    searchLabel?: string;
}

const Table: FC<TableProps> = ({
                                   data,
                                   columns,
                                   isFetching,
                                   skeletonCount = 10,
                                   skeletonHeight = 28,
                                   headerComponent,
                                   pageCount,
                                   search,
                                   onClickRow,
                                   page,
                                   searchLabel = "Search",
                               }) => {
    const [paginationPage, setPaginationPage] = useState(1);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const memoizedData = useMemo(() => data, [data]);
    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoizedHeaderComponent = useMemo(
        () => headerComponent,
        [headerComponent]
    );

    const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
        data: memoizedData,
        columns: memoizedColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        // manualSorting: true,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        pageCount,
    });

    const skeletons = Array.from({ length: skeletonCount }, (x, i) => i);

    const columnCount = getAllColumns().length;

    const noDataFound =
        !isFetching && (!memoizedData || memoizedData.length === 0);

    const handleSearchChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        search && search(e.target.value);
    };

    const handlePageChange = (
        event: ChangeEvent<unknown>,
        currentPage: number
    ) => {
        setPaginationPage(currentPage === 0 ? 1 : currentPage);
        page?.(currentPage === 0 ? 1 : currentPage);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        currentPage: number,
    ) => {
        setPaginationPage(currentPage === 0 ? 1 : currentPage);
        page?.(currentPage === 0 ? 1 : currentPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPaginationPage(0);
    };

    return (
        <Paper elevation={3} style={{ padding: "2rem 30px" }}>
            <Box textAlign={"left"} paddingX="1rem">
                {memoizedHeaderComponent && <Box>{memoizedHeaderComponent}</Box>}
                {search && (
                    <TextField
                        onChange={debounce(handleSearchChange, 500)}
                        size="small"
                        label={searchLabel}
                        margin="normal"
                        variant="standard"
                    />
                )}
            </Box>
            <Box style={{ overflowX: "auto" }}>
                <MuiTable>
                    {!isFetching && (
                        <TableHead>
                            {getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : <div
                                                    className={
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : ''
                                                    }
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    title={
                                                        header.column.getCanSort()
                                                            ? header.column.getNextSortingOrder() === 'asc'
                                                                ? 'Sort ascending'
                                                                : header.column.getNextSortingOrder() === 'desc'
                                                                    ? 'Sort descending'
                                                                    : 'Clear sort'
                                                            : undefined
                                                    }
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: ' ⬆️',
                                                        desc: ' ⬇️',
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                    )}
                    <TableBody>
                        {!isFetching ? (
                            getRowModel().rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            onClick={() => onClickRow?.(cell, row)}
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </StyledTableRow>
                            ))
                        ) : (
                            <>
                                {skeletons.map((skeleton) => (
                                    <TableRow key={skeleton}>
                                        {Array.from({ length: columnCount }, (x, i) => i).map(
                                            (elm) => (
                                                <TableCell key={elm}>
                                                    <Skeleton height={skeletonHeight} />
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                ))}
                            </>
                        )}
                    </TableBody>
                </MuiTable>
            </Box>
            {noDataFound && (
                <Box my={2} textAlign="center">
                    No Data Found
                </Box>
            )}
            {pageCount && page && (
                <>
                    <StyledPagination
                        count={pageCount}
                        page={paginationPage}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />

                    {/*<TablePagination*/}
                    {/*    component="div"*/}
                    {/*    count={pageCount}*/}
                    {/*    page={paginationPage}*/}
                    {/*    onPageChange={handleChangePage}*/}
                    {/*    rowsPerPage={rowsPerPage}*/}
                    {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
                    {/*    rowsPerPageOptions={[5,10,25,50]}*/}
                    {/*    sx={{*/}
                    {/*        display: 'flex',*/}
                    {/*        flexDirection: 'row',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        alignItems: 'baseline',*/}
                    {/*        '& > *': {*/}
                    {/*            m: 1,*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*/>*/}
                </>
            )}
        </Paper>
    );
};

export default memo(Table);