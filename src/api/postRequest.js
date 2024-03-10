const handlePostRequest = async (url, data) => {
    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('POST request successful:', responseData);
      return responseData
    } catch (error) {
      console.error('Error making POST request:', error.message);
      return error.message
    }
  };


export default handlePostRequest