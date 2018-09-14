const isDebug = true;
const debugApiPrefix = 'http://localhost:81';
const onlineApiPrefix = '';

const getApiUrl = () => {
  const apiPrefix = isDebug ? debugApiPrefix : onlineApiPrefix;
  return {
    WX_LOGIN: apiPrefix + '/login/wx',
    LIST_AWARD: apiPrefix + '/award',
    LIST_AWARD_RECORD: apiPrefix + '/award/record',
    AWARD_LOTTERY: apiPrefix + '/award/lottery',
    AWARD_MARK: apiPrefix + '/award/mark',
    LIST_BARRAGE: apiPrefix + '/barrage',
    ADD_BARRAGE: apiPrefix + '/barrage'
  }
}

module.exports = {
  getApiUrl
};

