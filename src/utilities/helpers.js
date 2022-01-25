export default function downloadCsvContent(content, fileName) {
  if (!content || content.lenght === 0) return '';
  const headers = Object.keys(content[0]._source);
  const arrayHeaders = headers.filter((header) => typeof content[0]._source[header] !== 'string');
  const contentAfterFormat = content.map((itm) => {
    const thisItm = itm;
    for (let i = 0; i < arrayHeaders.length; i++) {
      const header = arrayHeaders[i];
      thisItm._source[header] = JSON.stringify(thisItm._source[header]);
    }
    return Object.values(thisItm._source).join(',');
  });
  const csvContent = `data:text/csv;charset=utf-8,${
    [...headers, ...contentAfterFormat].join('\n')}`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link); // Required for FF

  return link.click();
}

export function CSVToArray(strData, strDelimiter = ',') {
  // Create a regular expression to parse the CSV values.
  const objPattern = new RegExp(
    (
    // Delimiters.
      `(\\${strDelimiter}|\\r?\\n|\\r|^)`

          // Quoted fields.
          + '(?:"([^"]*(?:""[^"]*)*)"|'

          // Standard fields.
          + `([^"\\${strDelimiter}\\r\\n]*))`
    ),
    'gi',
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  const arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  let arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec(strData)) {
    // Get the delimiter that was found.
    const strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (
      strMatchedDelimiter.length
          && strMatchedDelimiter !== strDelimiter
    ) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    let strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(
        new RegExp('""', 'g'),
        '"',
      );
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return (arrData);
}
