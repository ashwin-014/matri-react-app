import React, { useEffect, useState } from "react";
import {fetchData, parseSearchPageHTML} from "./Scrape";
// import MyCard from "./Card";
import MyCard from "./TestCard";
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Pagination } from '@mui/material';


const App = () => {
  const [current_page, setPage] = useState(1);
  const [pagelinks, setPageLinks] = useState([1])
  const [profileLinks, setProfileLinks] = useState([])

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
    getDetails(current_page);
   }, [current_page])

   return (
    <div>

    {profileLinks.map((prof, index) =>(<MyCard profile={prof} />))}

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