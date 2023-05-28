import React, { useEffect, useState } from "react";
// import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import parseContentHTML, {fetchData, parseCardHTML, parseSearchPageHTML} from "./Scrape";
import MyCard from "./Card";
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Pagination, PaginationItem } from '@mui/material';
// import BottomBar from "./BottomBar";


const App = () => {
  const [data, setData] = useState([]);
  const [imageURLs, setImageURL] = useState([]);
  const [name, setName] = useState([]);
  const [details, setDetails] = useState([]);
  const [current_page, setPage] = useState(1);
  const [links, setLinks] = useState([])
  const [originalLinks, setOriginalLinks] = useState([])

  // const handlePageChange = (event, value) => {
  //   setPage(value);
  // }
  console.log("--> loading whole: ", current_page);

  useEffect(() => {
    console.log("--> current_page: ", current_page);
    const baseLink = "/ssnmlprofilelist.php?type=GI&search=search&profile_id=&profile_name=&photo=&get_gothiram=115,13,161&get_htfrom=&get_htto=&get_incometo=&from=22&to=26&placeofjob=&job_indiastate=&job_indiacity=&abrooad=&pr_star=&star=&tot_page="
    console.log(baseLink + current_page)
    fetchData(
      baseLink + current_page,
      // "/ssnmlprofilelist.php?type=GI",
      // {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: "profile_id=&profile_name=&from=22&to=26&photo=&get_htfrom=&get_htto=&get_gothiram%5B%5D=115&get_gothiram%5B%5D=13&get_gothiram%5B%5D=161&search=submit"
      // }
    ).then((res) => {
      const [profiles, pages] = parseSearchPageHTML(res)
      setLinks(pages);
      return profiles
    }).then(
      (profiles) => {
      let dat_list = [];
      let nam_list = [];
      let url_list = [];
      let details_list = [];
      let links_list = [];

      profiles.map((prof, index) => {
      // profiles.forEach((prof) => {
        fetchData(prof).then(
          (html) => {
            const [dat, nam, url] = parseContentHTML(html);
            const [det, imgUrls] = parseCardHTML(html);
            dat_list.push(dat);
            // console.log("looping: ", dat, nam)
            nam_list.push(nam);
            links_list.push(prof);
            details_list.push(det)
            url_list.push(imgUrls)
            // return (html)
          }
        );
      });
      return [dat_list, nam_list, url_list, details_list, links_list]
      }
    ).then(([dat_list, nam_list, url_list, details_list, links_list]) => {
      setData(dat_list);
      setName(nam_list);
      setImageURL(url_list);
      setDetails(details_list);
      setOriginalLinks(links_list);
      // console.log("set data: ", links, name)
    });

    // fetchData("/ssnmlprofile.php?id=54770").then(
    //   (html) => {
    //     const [dat, nam, url] = parseContentHTML(html);
    //     let dat_list = [];
    //     let nam_list = [];
    //     for (let i=0;i<10;i++) {
    //       dat_list.push(dat);
    //       nam_list.push(nam);
    //     };
    //     setData(dat_list);
    //     setName(nam_list);
    //     return (html)
    //   }
    // ).then(
    //   (html) => {
    //     const [details, imageUrls] = parseCardHTML(html)
    //     let url_list = []
    //     let details_list = []
    //     for (let i=0;i<10;i++) {
    //       url_list.push(imageUrls);
    //       details_list.push(details)
    //     }
    //     setImageURL(url_list);
    //     setDetails(details_list);
    //   }
    // );

  }, []);  // 

  return (
    <div>
      {/* <h1>{name}</h1> */}
      {console.log("rendering again", data)}

      {data.map((d, index) => 
        (
          <MyCard 
            name={name[index]}
            imageUrls={imageURLs[index]}
            details={details[index]}
            full_table={d}
            link={originalLinks[index]}
          />
        )
      )}

      {/* <pre>{data}</pre> */}

      {/* <table>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}


      {/* <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {row.map((cell, index) => (
                  <TableCell key={index}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
      <Pagination
        count={links.length}
        page={current_page}
        onChange={(event, page) => setPage(page)}
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
    </div>
  );
};

export default App;
