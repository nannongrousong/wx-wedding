const justShowInfo = (content) => {
  wx.showModal({
    content,
    showCancel: false
  })
}

module.exports = {
  justShowInfo
}
