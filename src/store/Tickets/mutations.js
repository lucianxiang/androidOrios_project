/**
 * Created by leibo on 18/7/4.
 */


export default {
  initTicketHomeImage(state, data) {
    state.ticketHomeImageList = data;
  },
  initHotTicketCity(state, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].tm_ts_ShowImage) {
        data[i].imgData = data[i].tm_ts_ShowImage.split(',')
      } else {
        data[i].imgData = [];
      }
    }
    state.hotTicketCity = data;

  },
  initTicketSelected(state, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].tm_ts_ShowImage) {
        data[i].imgData = data[i].tm_ts_ShowImage.split(',')
      } else {
        data[i].imgData = [];
      }
    }
    state.ticketSelectedList = data;
  },
  initTicketInfo(state, obj) {
    if (obj.tm_ts_ShowImage) {
      if (obj.tm_ts_ShowImage) {
        obj.tm_ts_ShowImage = obj.tm_ts_ShowImage.split(',');
      } else {
        obj.tm_ts_ShowImage = [];
      }
    }
    if (!obj.tm_TourSite_TicketTypeMX.length) {
      obj.tm_TourSite_TicketTypeMX = '';
    }
    state.tm_BookKnow = obj.tm_BookKnow
    state.ticketInfoObj = obj;
  },
  initTicketListPage(state, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].tm_ts_ShowImage) {
        data[i].imgData = data[i].tm_ts_ShowImage.split(',')
      } else {
        data[i].imgData = [];
      }
    }
    if (state.ticketScrollTop.id) {
      state.ticketListPageList = data.map(item => {
        if (item.tm_ts_Code == state.ticketScrollTop.id) {
          item.activeState = true
          return item
        } else {
          item.activeState = false;
          return item
        }
      })
    }
    state.ticketListPageList = data;
  },
  initSmallStop(state, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].tm_se_Image) {
        data[i].imgData = data[i].tm_se_Image.split(',');
      } else {
        data[i].imgData = [];
      }
    }
    state.smallStopList = data;
  },
  allComment(state, obj) {
    state.allCommentObj = obj;
  },
  initCommentData(state, data) {
    state.commentDataList = data;
  },
  initTmTmBus(state, str) {
    state.tmTmBusString = str;
  },
  initTmTmDrive(state, str) {
    state.tmTmDrive = str;
  },
  initTmTmAddress(state, str) {
    state.tmTmAddress = str;
  },
  tmBookKnow(state, obj) {
    state.tm_BookKnow = obj;
  },
  ticketScrollTop(state, obj) {
    state.ticketScrollTop = obj;
  },
  clearTicketScrollTop(state) {
    state.ticketScrollTop = {};
  }
}
