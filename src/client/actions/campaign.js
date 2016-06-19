import {
  CALL_API,
  Schemas
} from '../api/serverApi.js';
import * as api from '../api/api.js'

const types = ['CAMPAIGN_REQUEST', 'CAMPAIGN_SUCCESS', 'CAMPAIGN_FAILURE'];

function fetchCampaign(filerId) {
  return {
    [CALL_API]: {
      types: types,
      endpoint: `committee_data_by_id/${filerId}/`,
      schema: Schemas.CAMPAIGN_ARRAY
    }
  }
}
export function loadCampaign(filerId, requiredFields = []) {
  return (dispatch, getState) => {
    const campaign = getState()
      .entities.campaigns[filerId]
    if (campaign && requiredFields.every(key => campaign.hasOwnProperty(key))) {
      return null
    }
    return dispatch(fetchCampaign(filerId))
  }
}
// new stuff
const requestCampaign = (filerId) => ({
  type: 'CAMPAIGN_REQUEST',
  filerId
});
const requestTransactions = (filerId) => ({
  type: 'TRANSACTION_REQUEST',
  filerId
});
const recieveCampaign = (filerId, response) => ({
  type: 'RECIEVE_CAMPAIGN',
  filerId,
  response
});
const recieveTransactions = (filerId, response) => ({
  type: 'RECIEVE_TRANSACTIONS',
  filerId,
  response
});
const requestSumByDate = (filerId) => ({
  type: 'SUM_REQUEST',
  filerId
});
const recieveSumByDate = (filerId,response) => ({
  type: 'RECIEVE_SUM',
  filerId,
  response
});
const requestMungedSum = (filerId) => ({
  type: 'REQUEST_MUNGED_SUM',
  filerId
});
const recieveMungedSum = (filerId,response) => ({
  type: 'RECIEVE_MUNGED_SUM',
  filerId,
  response
});
export const fetchCampaigns = (filerId) => (dispatch,getState) => {
  dispatch(requestCampaign(filerId));
  return api.fetchCampaigns(filerId)
    .then(response => {
      dispatch(recieveCampaign(filerId, response));
      return filerId;
    })
    .then(filerId => {
      dispatch(requestTransactions(filerId));
      return api.fetchTransactions(filerId)
        .then(response => {
          dispatch(recieveTransactions(filerId, response));
          return filerId
        })
    })
    .then(filerId => {
      dispatch(requestSumByDate(filerId));
      return api.fetchTransactionsForTimeline(filerId)
        .then(response => {
          dispatch(recieveSumByDate(filerId, response));
          return filerId;
        })
    })
    .then(filerId => {
      const dataToMunge = getState().entities.sums
      dispatch(requestMungedSum(filerId));
      return api.mungeByYear(dataToMunge)
      .then(response => {
        dispatch(recieveMungedSum(filerId,response));
        return filerId;
      })
    });
    // .then(filerId => { TODO: add more dispatch actions here
    //   // dispatch(requestState)
    // })
}
