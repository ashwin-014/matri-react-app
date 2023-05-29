import React, { useEffect, useState } from "react";
import {fetchData, parseSearchPageHTML} from "./Scrape";
import MyCard from "./Card";
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Pagination } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CircularProgress from '@mui/material/CircularProgress';


const App = () => {
  const [current_page, setPage] = useState(1);
  const [pagelinks, setPageLinks] = useState([1])
  const [profileLinks, setProfileLinks] = useState([])
  const [isLoading, setLoading] = useState(true)

  console.log("--> loading whole: ", current_page);

//   const incrementPage = () => {
//     setPage((current_page) => current_page + 1)
//   }
//   const decrementPage = () => {
//     setPage((current_page) => current_page - 1)
//   }

  const baseLink = "/ssnmlprofilelist.php?type=GI&search=search&profile_id=&profile_name=&photo=&get_gothiram=115,13,161&get_htfrom=&get_htto=&get_incometo=&from=22&to=26&placeofjob=&job_indiastate=&job_indiacity=&abrooad=&pr_star=&star=&tot_page="
  const getDetails = async (pageNumber) => {
    const html = await fetchData(baseLink + pageNumber);
    const [profiles, pages] = await parseSearchPageHTML(html);
    setPageLinks(pages);
    setProfileLinks(profiles);
  };

  useEffect(() => {
    console.log("--> current_page: ", current_page);
    setLoading(true);
    setTimeout(async () => {
      getDetails(current_page);
      setLoading(false);
    }, 4000);
   }, [current_page])

   return (
    <div>
      {!isLoading ?
        (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
          {profileLinks.map((prof, index) =>(
            <Grid xs={2} sm={4} md={4} key={index}>
            <MyCard profile={prof} />
            </Grid>
          )
          )}
          </Grid>
        ): (
          <div height={1000} style={{
            // do your styles depending on your needs.
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CircularProgress />
          </div>
        )}

    <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
    <Pagination
        count={pagelinks.length}
        page={current_page}
        onChange={(event, page) => setPage(page)}
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
      {console.log("rendering again", pagelinks)}

    </AppBar>
    </div>
  );
}


export default App;
// "proxy": "https://www.ssmatri.com"