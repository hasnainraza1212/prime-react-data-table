import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import {getUsersData} from "./../../EndPoints/EndPoints.js"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { FilterMatchMode, FilterService } from 'primereact/api'
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

const UsersDataTable = () => {
    // states
    const [filter, setFilter] = useState([])
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [totalcount, setTotalCount] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const { data, isLoading, error } = useQuery({queryKey:['users', currentPage, itemsPerPage], queryFn:() => getUsersData({ page: currentPage , limit:itemsPerPage })});

    // functuions
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
       const filter =  data?.users?.filter(user=> user?.first_name?.toLowerCase()?.includes(value)||user?.last_name?.toLowerCase()?.includes(value)|| user?.email?.toLowerCase()?.includes(value))
        setGlobalFilterValue(value);
        setFilter(filter)
    };


    const getSeverity = (status) => {
        switch (status) {
            case true:
                return 'danger'

            case false:
                return 'info';
        }
    };
    const getVefiedSeverity = (status) => {
        switch (status) {
            case true:
                return 'success'

            case false:
                return 'danger';
        }
    };

    // column body
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.is_deleted? "Deleted":"Active"} severity={getSeverity(rowData.is_deleted)} />;
    };
    const verifiedStatus = (rowData) => {
        return <Tag value={rowData.is_verified? "Verified":"Unverified"} severity={getVefiedSeverity(rowData.is_verified)} />;
    };
    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };
    const contentBody = (rowData) => {

        return (
            <div className="flex align-items-center gap-2">
                <img alt={rowData.first_name} src={rowData.image} width="32" />
            </div>
        );
    };
    const header = renderHeader()

  
    useEffect(() => {
        if (data) {
            setTotalCount(data.pagination.total);
            setFilter(data)
        }
    }, [data]);


  return (
    <DataTable 
    paginator
    value={filter?.length>0? filter :data?.users}
     dataKey="_id" 
     filterDisplay="row"
     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
     rowsPerPageOptions={[10, 25, 50, 100]}
     rows={itemsPerPage}
     paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
     totalRecords={totalcount}
      loading={isLoading}
      lazy
    first={(currentPage - 1) * itemsPerPage}
    onPage={(e) => {
        setCurrentPage(e.page + 1);
        setItemsPerPage(e.rows);
      }}
    globalFilterFields={['first_name', 'last_name', 'email']} 
    header={header} emptyMessage="No data found.">
        
<Column field="first_name" header="First Name" style={{ minWidth: '12rem' }} />
<Column field="last_name" header="Last Name" style={{ minWidth: '12rem' }} />
<Column field="email" header="Email" style={{ minWidth: '12rem' }} />
<Column field="is_verified" header="Verified" body={verifiedStatus} style={{ minWidth: '12rem' }} />
<Column field="is_deleted" header="Deleted" body={statusBodyTemplate} style={{ minWidth: '12rem' }} />
<Column field="image" body={contentBody} header="Image" style={{ minWidth: '12rem' }} />



</DataTable>
  )
}

export default UsersDataTable