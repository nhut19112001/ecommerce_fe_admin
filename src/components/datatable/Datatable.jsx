import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosClient from '../../api/axiosClient.js'

const Datatable = ({columns}) => {
  const url = "/user/search"
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    setList(data.payload);
  }, [data.payload]);  // whenever data changes update list

  const handleActivate = async (id, isActive) => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to ${isActive ? "deactivate" : "activate"} this account?`
      );
      if (confirmed) {
        await axiosClient.put(`user/updateActiveUser`, { user: id ,active: !isActive });
        setList((prevList) =>
          prevList.map((item) =>
            item._id === id ? { ...item, active: !isActive } : item
          )
        );
      }
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        const isActive = params.row.active;
        return (
          <div className="cellAction">
          {isActive ? (
            <div
              className="activateButton"
              onClick={() => handleActivate(params.row._id, true)}
            >
              Active
            </div>
          ) : (
            <div
              className="deactivateButton"
              onClick={() => handleActivate(params.row._id, false)}
            >
              Deactive
            </div>
          )}
          </div>
        );
      },
    },
  ];


  return (
    <div className="datatable">
      <DataGrid                                                   
        className="datagrid"
        rows={data.payload}                                              
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
