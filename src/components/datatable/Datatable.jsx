import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { customerColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({columns}) => {
  
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);  // whenever data changes update list

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const handleActivate = async (id, isActive) => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to ${isActive ? "deactivate" : "activate"} this account?`
      );
      if (confirmed) {
        await axios.put(`/${path}/${id}`, { active: !isActive });
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
            <Link
              to={{
                pathname: `/${path}/${params.row._id}`,
                state: { user: params.row },
              }}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
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
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];


  return (
    <div className="datatable">
      <div className="datatableTitle">
        Table
        <Link to={ `/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid                                                   // material UI DataGrid
        className="datagrid"
        rows={data}                                               // passing data
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
