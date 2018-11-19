const AWS            = require('aws-sdk');
const cloudformation = new AWS.CloudFormation();

const config = {
  debug:  false,                  // if true, print additional info to logs
};

//##############################################################################
exports.handler = async (event, context) => {

  try {
 
    let stacks = await getCloudFormationStacks();
 
    for (const stack of stacks) {
    
      let params = {
        StackName: stack.StackName
      };
    
      debugMessage(`Calling cloudformation.detectStackDrift(${JSON.stringify(params)})`);
      
      let response = await cloudformation.detectStackDrift(params).promise();
      
      console.log(`Initiated drift detection ID ${JSON.stringify(response.ResponseMetadata.ResponseId)}.`);
      
    }
 
  } 

  catch (err) {
    console.log('Error:\n' + err);
  }

};

//##############################################################################
async function getCloudFormationStacks() {

  let params = {
    StackStatusFilter: [ 'CREATE_COMPLETE', 'ROLLBACK_COMPLETE' ]
  };
  
  let stacks = [];
  
  do {
  
    let priorStacks = stacks; 
    
    debugMessage(`Calling cloudformation.listStacks(${JSON.stringify(params)})`);
    
    let response   = await cloudformation.listStacks(params).promise();
    
    stacks = priorStacks.concat(response.StackSummaries);

    params.NextToken = response.NextToken || undefined;
    
  } while (params.NextToken !== undefined);
  
  return stacks;

}

//##############################################################################
function debugMessage(message) {
  // message = string
  if (config.debug) {
    console.log(message);
  }
}

/*
var params = {
  StackName: 'STRING_VALUE',
  LogicalResourceIds: [
    'STRING_VALUE',
  ]
};
cloudformation.detectStackDrift(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});



*/