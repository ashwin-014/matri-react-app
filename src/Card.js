import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';


function MyCard ({name, imageUrls, details, full_table, link="https://www.google.com"}) {
    let imageUrl = "";
    if (Array.isArray(imageUrls) && imageUrls.length) { 
      imageUrl = "https://ssmatri.com/" + imageUrls[0];
    }
    console.log("name: ", link)
    // console.log("--> imageUrl: ", imageUrl, imageUrls)
    // console.log(details.dob.toString())
    // console.log(Array.isArray(details.dob))
    // console.log(Array.from(details["dob"]))

    const [expanded, setExpanded] = useState(false);
    const toggleExpansion = () => {
      setExpanded(!expanded);
    };

    return (
    <div>
      <Card raised sx={{borderRadius: '16px'}}>
        {imageUrl.length ?
          (
            <CardMedia
              component="img"
              height="400"
              // width="100%"
              // height="50%"
              image={imageUrl}
              alt="No Profile image"
              sx={{ padding: "1em 1em 1em 1em", objectFit: "contain" }}
            />
          ) : <div></div>
        }
        <CardContent sx={{ padding: "1em 1em 1em 1em", objectFit: "contain" }}>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {/* {details} */}
            <TableContainer>
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
            <Button size="small" href={"https://ssmatri.com/"+ link} target="_blank">Link</Button>
          </CardActions>
          </Typography>
          {expanded && 
            <Typography variant="body2">
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {full_table.map((row, index) => (
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
        <br />
      </div>
    );
  };
  
  export default MyCard;