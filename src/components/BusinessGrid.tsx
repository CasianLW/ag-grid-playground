import React, { FC, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { BusinessData, Dirigeant } from "../types/businessInterface";
import { ActionType } from "../types/actionTypes";
import { ColDef } from "ag-grid-community";
import { DirigeantsCellRenderer } from "./DirigeantsCellRenderer";

interface CustomColDef extends ColDef {
  cellRendererFramework?: React.ComponentType<any>;
}

const BusinessGrid: FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const businessesState = useSelector((state: RootState) => state.businesses);
  const { data, loading, error, currentPage } = businessesState;

  const handleSave = (modifiedBusiness: BusinessData) => {
    dispatch({
      type: ActionType.UPDATE_BUSINESS,
      payload: modifiedBusiness,
    });
  };

  // Define defs for ag-Grid
  const columnDefs: CustomColDef[] = [
    { headerName: "SIREN", field: "siren" },
    { headerName: "Name", field: "nom_complet", editable: true },
    { headerName: "Date création", field: "date_creation", editable: true },
    { headerName: "Date fermeture", field: "date_fermeture", editable: true },
    {
      headerName: "Dirigeants",
      field: "dirigeants",
      //   cellRendererFramework: DirigeantsView,
      cellRendererFramework: DirigeantsCellRenderer,
      valueFormatter: (params) => {
        return params.value
          .map(
            (dirigeant: Dirigeant) => `${dirigeant.prenoms} ${dirigeant.nom}`
          )
          .join(", ");
      },
    },
    {
      headerName: "Modified",
      field: "Modified",
      cellRenderer: (params: any) => (params.value ? "Yes" : "No"),
    },
  ];
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    dispatch({
      type: ActionType.FETCH_BUSINESSES_REQUEST,
      payload: { query: newQuery, page: currentPage, pageSize: 10 },
    });
  };

  // Event handler for cell value changes (unfinished)
  const onCellValueChanged = (params: any) => {
    const modifiedBusiness: BusinessData = {
      ...params.data,
      [params.colDef.field]: params.newValue,
      Modified: true,
    };
    handleSave(modifiedBusiness);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <input
        className="p-1 mb-2 rounded"
        placeholder="Search businesses..."
        type="text"
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <AgGridReact
        rowData={Object.values(data)}
        columnDefs={columnDefs}
        onCellValueChanged={onCellValueChanged}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default BusinessGrid;
