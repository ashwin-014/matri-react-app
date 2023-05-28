import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Pagination, PaginationItem } from '@mui/material';


const BottomBar = ({ currentPage, allPages, pageSwitchHandler }) => {
  console.log("1 pageSwitchHandler: ", pageSwitchHandler)
  const handlePageChange = (event, value) => {
    console.log("pageSwitchHandler: ", pageSwitchHandler)
    pageSwitchHandler(value);
  };
  return (
    <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
      {/* <Toolbar>
        <Typography variant="body1">
            <Button />
        </Typography>
      </Toolbar> */}

    <Pagination
      count={allPages.length}
      page={currentPage}
      onChange={handlePageChange}
    //   renderItem={allPages.map((p, index) => (
    //     <PaginationItem
    //       {...p}
    //       component="button"
    //     //   disabled={typeof item.page === 'string'}
    //     />
    //     )
    //   )}
      siblingCount={1}
      boundaryCount={1}
    //   hideNextButton
    //   hidePrevButton
      showFirstButton
      showLastButton
      shape="rounded"
      size="large"
      variant="outlined"
      color="primary"
      classes={{ ul: 'pagination' }}
    />
    </AppBar>
  );
};

export default BottomBar;