export const userColumns = [
  { field: "id", headerName: "ID", width: 220 },
  {
    field: "name",
    headerName: "Product",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          <p>{params.row.nameGeo}</p>
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
    renderCell: (params) => {
      return (
        <>
          <p>{params.row.dscGeo}</p>
        </>
      );
    },
  },

  {
    field: "price",
    headerName: "Price",
    width: 120,
    renderCell: (params) => {
      return (
        <>
          <p>{params.row.dailyprice} ₾</p>
        </>
      );
    },
  },
  {
    field: "date",
    headerName: "Add Date",
    width: 100,
    renderCell: (params) => {
      return (
        <>
          <p>{params.row.added}</p>
        </>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <>
          {params.row.status ? (
            <div>
              <p
                style={{
                  color: "#ffffff",
                  backgroundColor: "green",
                  padding: "3px 5px",
                  borderRadius: "5px",
                }}
              >
                ONLINE
              </p>
            </div>
          ) : (
            <p
              style={{
                color: "#ffffff",
                backgroundColor: "red",
                padding: "3px 5px",
                borderRadius: "5px",
              }}
            >
              OFFLINE
            </p>
          )}
        </>
      );
    },
  },
];
