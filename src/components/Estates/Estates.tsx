import { Box } from "@mui/material";
import Table from "../../core/components/Table/Table";
import { columns } from "./columns";
import {useEffect, useState} from "react";
import apiService from "../../api/apiService";

const EstatesComponent = () => {
    const [users, setUsers] = useState(null);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState<number | undefined>(1);
    const [search, setSearch] = useState<string | undefined>("");

    useEffect(() => {
        console.log('here');
        const fetchData = async () => {
            const params = {
                ...(!search && { page: currentPage }),
                ...(search && { page: currentPage, name: search }),
            };

            try {
                const result = await apiService.getData('v1/users', params);
                setUsers(result.data);
                setPages(result.meta.pagination.pages);
                setCurrentPage(result.meta.pagination.page);
                console.log(result);
                // console.log(data);
            } catch (error) {
                // Handle error
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(r => {});
    }, [currentPage, search]);

    return (
        <>
            <Box><h1>Estates</h1></Box>
            <Box padding={6}>
                {users &&
                    <Table
                        data={users}
                        columns={columns}
                        pageCount={pages}
                        page={setCurrentPage}
                        search={setSearch}
                        searchLabel="Search by name"
                    />
                }
            </Box>
        </>
    );

};

export default EstatesComponent;