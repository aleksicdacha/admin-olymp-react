import {ButtonGroup, Chip} from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Tooltip from "@mui/material/Tooltip";

const handleAction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
    console.log(action);
}

const buttons = [
    <Button key="one"
            color="primary"
            onClick={(event) => handleAction(event, 'edit')}
    >
        <Tooltip title="Edit" placement="top">
            <EditSharpIcon />
        </Tooltip>
    </Button>,
    <Button key="two"
            color="error"
            onClick={(event) => handleAction(event, 'delete')}
    >
        <Tooltip title="Delete" placement="top">
            <DeleteForeverSharpIcon />
        </Tooltip>
    </Button>
];

export const columns: ColumnDef<any, any>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (row: any) => {
            return (
                <Chip
                    label={row.getValue()}
                    size="medium"
                    color={row.getValue() === "active" ? "primary" : "default"}
                />
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: (row: any) => {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                    <ButtonGroup variant="text" size="small" aria-label="Small button group">
                        {buttons}
                    </ButtonGroup>
                </Box>
            );
        },
    }
];