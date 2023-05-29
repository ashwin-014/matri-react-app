
const parseContentHTML = (htmlData) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlData, 'text/html');
    // console.log("----> content doc", doc)
    const formBoxInner = doc.querySelector('div.form-box-inner');
    // console.log("----> formBoxInner", formBoxInner)
    const table = formBoxInner.querySelector('table');
    const nameRows = table.querySelectorAll('tr');
    // console.log("--> ", nameRows)
    const tableMain = formBoxInner.querySelector('table.proview');
    const rows = tableMain.querySelectorAll('tr');
    // console.log("--> ", rows)

    const nam = Array.from(nameRows).map(row => {
      const cells = row.querySelectorAll('td');
      return Array.from(cells).map(cell => cell.textContent);
    });
    
    // Convert table rows to array of arrays
    const dat = Array.from(rows).map(row => {
      const cells = row.querySelectorAll('td');
      // .replace(/<!--[\s\S]*?-->/g, '')
      return Array.from(cells).map(cell => cell.textContent);
    });
    return [dat.slice(1, 31), nam[1][0].replace("Girls Iyer", "").replace("Shortlist Express Interest", ""), dat[32]]
}

const parseCardHTML = (htmlData) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlData, 'text/html');
  // console.log("----> card doc", doc)
  const formBoxInner = doc.querySelector('div.form-box-inner');
  const tableMain = formBoxInner.querySelector('table.proview');
  const rows = tableMain.querySelectorAll('tr');
  // console.log("******---> ", rows)
  
  const tmpSlides = rows[33].querySelectorAll('.tmpSlide img');
  // const imageUrls = [];
  // tmpSlides.forEach((slide) => {
  //   const imageElement = slide.querySelector('img');
  //   if (imageElement) {
  //     imageElements.push(imageElement.getAttribute('src'));
  //   }
  // });

  const imageUrls = Array.from(tmpSlides).map((img) => img.getAttribute('src'));
  // console.log("***--> ", tmpSlides, imageUrls);
  // console.log("imageUrls: ", imageUrls)

  // Convert table rows to array of arrays
  const dat = Array.from(rows).map(row => {
    const cells = row.querySelectorAll('td');
    // .replace(/<!--[\s\S]*?-->/g, '')
    return Array.from(cells).map(cell => cell.textContent);
  });

  return [
    {
      "dob": dat[1][2],
      "star": dat[2][2],
      "job": dat[3][2],
      "income": dat[4][2],
      "talents": dat[17][2],
      "likes": dat[18][2],
    },
    imageUrls
  ]
}

const parseSearchPageHTML = (htmlData) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlData, 'text/html');
  const tmpPageLinks = doc.querySelectorAll('a.pagenate-cl');
  const tmpStrongs = doc.querySelectorAll('.listview strong');

  let profiles = []
  tmpStrongs.forEach((slide) => {
    const lnk = slide.querySelectorAll('span a');
    lnk.forEach((l) => {
      if (l) {
        profiles.push(l.getAttribute('href'));
      }
      })
    }
  )
  console.log("profiles: ", profiles)
  const profileLinks = Array.from(profiles);
  const page_links = Array.from(tmpPageLinks);
  return [profileLinks, page_links]
}

const fetchData = async (url, params={}) => {
    try {
      const response = await fetch(url, params);
      // console.log("response: ", response)
      const htmlData = await response.text();
    //   console.log("htmlData: ", htmlData)
      return (htmlData)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


export default parseContentHTML;
export {fetchData, parseCardHTML, parseSearchPageHTML};