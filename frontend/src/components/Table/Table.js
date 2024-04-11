import React, { useState } from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';

const Table = ({ data, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);

  const recordsPerPage = 5; // show 5 records per page

  // Calculate the number of pages
  const pageCount = Math.ceil(data.length / recordsPerPage);

  // Calculate the index of the first and last record on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Slice the data array to get only the records for the current page
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showDeleteDialog = (record) => {
    setDeleteRecord(record);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    onDelete(deleteRecord.id);
    setOpenDialog(false);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '5px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: '10px 40px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '10px 10px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '10px 30px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '10px 10px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px 10px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record, index) => (
            <tr key={record.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'transparent' }}>
              <td style={{ padding: '10px 10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{record.date}</td>
              <td style={{ padding: '10px 10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{record.amount}</td>
              <td style={{ padding: '10px 10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{record.category.name}</td>
              <td style={{ padding: '10px 10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{record.description}</td>
              <td style={{ padding: '10px 10px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                <button onClick={() => onEdit(record.id)} style={{ padding: '5px', backgroundColor: '#f0f0f0', color: 'darkcyan', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => showDeleteDialog(record)} style={{ padding: '5px', backgroundColor: '#f0f0f0', color: '#ff3333', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        {/* Pagination buttons */}
        <button
          disabled={currentPage <= 1}
          onClick={() => paginate(currentPage - 1)}
          style={{
            padding: '8px 15px',
            margin: '0 5px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: currentPage <= 1 ? '#ccc' : '#3498db',
            color: 'white',
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Prev
        </button>
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            style={{
              padding: '8px 12px',
              margin: '0 3px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: currentPage === i + 1 ? '#1e73ab' : '#3498db',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage >= pageCount}
          onClick={() => paginate(currentPage + 1)}
          style={{
            padding: '8px 15px',
            margin: '0 5px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: currentPage >= pageCount ? '#ccc' : '#3498db',
            color: 'white',
            cursor: currentPage >= pageCount ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to delete this record?`}
        {deleteRecord && (
          <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '5px', overflow: 'hidden', marginTop: '10px' }}>
            <tbody>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left', fontSize: '14px' }}>
                  {deleteRecord.date}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left', borderLeft: '1px solid #eaeaea', fontSize: '14px' }}>
                  {deleteRecord.amount}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left', borderLeft: '1px solid #eaeaea', fontSize: '14px' }}>
                  {deleteRecord.category.name}
                </td> 
                {deleteRecord.description && (
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left', borderLeft: '1px solid #eaeaea', fontSize: '14px' }}>
                    <i>{deleteRecord.description.length > 20 ? `${deleteRecord.description.substring(0, 20)}...` : deleteRecord.description}</i>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        )}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Table;
