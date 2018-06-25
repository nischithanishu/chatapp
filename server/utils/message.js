var moment = require('moment');
var generateMessage=(from,text)=>{
  return{
    from,
    text,
    createAt:moment().valueOf()
  };
};


var generateLocaltionMessage=(from,latitude,longitude)=>{
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createAt:moment().valueOf()
  };
};
module.exports={generateMessage, generateLocaltionMessage};
