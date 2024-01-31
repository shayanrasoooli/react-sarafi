    // const ConvertData = (data , type) => {
    //     const convertedData = data[type].map((item) => {
    //         return{
    //             data:item[0] , 
    //             [type] : item[1],
    //         };
    //     });


    //     return convertedData
    // }

    // export   { ConvertData };



    const ConvertData = (data, type) => {
        if (data && data[type] && Array.isArray(data[type])) {
          const convertedData = data[type].map((item) => {
            return {
              data: item[0],
              [type]: item[1],
            };
          });
      
          return convertedData;
        } else {
          return [];
        }
      };
      
      export { ConvertData };
      