const processStatistics = async (start, end) => {
  try {
    // Fetch
    const response = await fetch(
      "https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json"
    );
    const apiResponse = await response.json();
    if (start && end) {
      let result = [];
      let websiteId = [];
      for (let i = 0; i < apiResponse.length; i++) {
        if (
          new Date(apiResponse[i].date).getTime() >= Date.parse(start) &&
          new Date(apiResponse[i].date).getTime() <= Date.parse(end)
        ) {
          console.log(apiResponse[i]);
          if (!websiteId.includes(apiResponse[i].websiteId)) {
            websiteId.push(apiResponse[i].websiteId);
            let temp = {};
            temp.websiteId = apiResponse[i].websiteId;
            temp.date = apiResponse[i].date;
            temp.chats = apiResponse[i].chats;
            temp.missedChats = apiResponse[i].missedChats;
            result.push(temp);
          } else {
            let ind = websiteId.indexOf(apiResponse[i].websiteId);
            result[ind].chats =
              parseInt(result[ind].chats) + parseInt(apiResponse[i].chats);

            result[ind].missedChats =
              parseInt(result[ind].missedChats) +
              parseInt(apiResponse[i].missedChats);
          }
        }
      }
      console.log(result);
    } else {
      let result = [];
      let websiteId = [];
      for (let i = 0; i < apiResponse.length; i++) {
        if (!websiteId.includes(apiResponse[i].websiteId)) {
          websiteId.push(apiResponse[i].websiteId);
          let temp = {};
          temp.websiteId = apiResponse[i].websiteId;
          temp.chats = apiResponse[i].chats;
          temp.missedChats = apiResponse[i].missedChats;
          result.push(temp);
        } else {
          let ind = websiteId.indexOf(apiResponse[i].websiteId);
          result[ind].chats =
            parseInt(result[ind].chats) + parseInt(apiResponse[i].chats);

          result[ind].missedChats =
            parseInt(result[ind].missedChats) +
            parseInt(apiResponse[i].missedChats);
        }
      }
      console.log(result);
    }
  } catch (error) {
    console.log(error.message);
  }
};
processStatistics(
  new Date(2019, 3, 1, 05, 30, 00),
  new Date(2019, 3, 2, 05, 30, 00)
);
