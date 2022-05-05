'use strict';

module.exports = (capability) => async (req, res, next) => {
  console.log(capability);
  if (req.user.capabilities.includes(capability)){
    next();
  } else {
    console.error('user does not have', capability);
    next('user does not have capability'); 
  }
};