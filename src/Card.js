import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

import parseContentHTML, {fetchData, parseCardHTML} from "./Scrape";


const MyCard = ({ profile }) => {
  const [data, setData] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [name, setName] = useState([]);
  const [details, setDetails] = useState([]);
  const [profileLink, setProfileLink] = useState([])
  const [isLoading, setLoading] = useState(true)

  const [expanded, setExpanded] = useState(false);
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const getCardDetails = async (profile) => {
    const html = await fetchData(profile);
    const [dat, nam, url] = parseContentHTML(html);
    const [det, imgUrls] = parseCardHTML(html);

    let imageUrl = "";
    if (Array.isArray(imgUrls) && imgUrls.length) { 
      imageUrl = "https://ssmatri.com/" + imgUrls[0];
    }
    else if (imgUrls.length) {
      imageUrl = "https://ssmatri.com/" + imgUrls;
    }
    setImageURL(imageUrl)
    setData(dat);
    setName(nam);
    setDetails(det);
    setProfileLink(profile);
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
      getCardDetails(profile)
      setLoading(false);
    }, 4000);
    // getCardDetails(profile)
    // setLoading(false);
  }, [profile]);

  return (
    <div>
      {!isLoading ?
        (
          <Card raised sx={{borderRadius: '16px'}}>
          {imageURL.length ?
            (
              <CardMedia
                component="img"
                height="400"
                // width="100%"
                // height="50%"
                image={imageURL}
                alt="No Profile image"
                sx={{ padding: "1em 1em 1em 1em", objectFit: "contain" }}
              />
            ) : <div></div>
          }
          <CardContent sx={{ padding: "1em 1em 1em 1em", objectFit: "contain", backgroundColor: "#FFF8DE" }}>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              {/* {details} */}
              <TableContainer sx={{borderRadius: '16px'}}>
                  <Table>
                  {/* component={Link} to={`/details/${details.id}`} */}
                      <TableBody>
                        <TableRow>
                        <TableCell>{details.dob}</TableCell>
                        <TableCell>{details.star}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>{details.job}</TableCell>
                        <TableCell>{details.income}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>{details.talents}</TableCell>
                        <TableCell>{details.likes}</TableCell>
                        </TableRow>
                      </TableBody>
                  </Table>
              </TableContainer>
            <CardActions>
              <Button size="small" onClick={toggleExpansion}>{!expanded ? "More" : "Less"}</Button>
              <Button size="small" href={"https://ssmatri.com/"+ profileLink} target="_blank">Link</Button>
            </CardActions>
            </Typography>
            {expanded && 
              <Typography variant="body2">
                {/* <TableContainer component={Paper}> */}
                <TableContainer component="div" sx={{backgroundColor: "white", borderRadius: '16px'}}>
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
                </TableContainer>
              </Typography>
            }

            { expanded && (
                <CardActions>
                  <Button size="small" onClick={toggleExpansion}>{!expanded ? "More" : "Less"}</Button>
                </CardActions>
              )
            }
          </CardContent>
        </Card>
      ) : 
        <div>
          <br />
          <br />
          <Skeleton variant="rounded" sx={{borderRadius: '16px', width: "100%", height: "60px"}}/>
          <br />
          <Skeleton variant="circular" sx={{width: "40px", height: "40px"}}/>
          <br />
          <Skeleton variant="rounded" sx={{borderRadius: '16px', width: "100%", height: "60px"}}/>
          <Skeleton variant="rounded" sx={{borderRadius: '16px', width: "100%", height: "60px"}}/>
          <br />
          <br />
          <br />
          <br />
        </div>
    }
      <br />
      </div>
    );
  };
  
  export default MyCard;