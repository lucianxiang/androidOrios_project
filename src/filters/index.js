/**
 * Created by leibo on 17/11/13.
 */
//获取日期 格式年-月-日
export const getNewDate = (value) => {
  let reg = /\d+/g
  if (value) {
    var num = value.match(reg)[0];
    var date = new Date(Number(num));
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

};
//获取状态
export const getStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '空闲';
    case 1:
      return '锁定';
    default:
      return '使用'
  }
};


//获取启用状态
export const getDelete = (value) => {
  if (Number(value) == 0) {
    return '启用'
  } else {
    return '不启用'
  }
};
//获取入住状态
export const getUseStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未入住';
    case 1:
      return '已入住';
    case 2:
      return '已退房';
    case 3:
      return '使用中';
    default:
      return '未知';
  }
};
export const useStatus = (value) => {
  switch (Number(value)) {
    case 0:
      return '未使用';
    case 1:
      return '已使用';
    case 2:
      return '已离店';
    default:
      return '未知';
  }
};
export const getGrade = (value) => {
  switch (Number(value)) {
    case 0:
      return '差评';
    case 1:
      return '中评';
    case 2:
      return '好评'
    default:
      return '未评级';
  }
};
//酒店星级
export const getStars = val=>{
  switch (Number(val)) {
    case 1:
      return '普通型';
    case 2:
      return '经济型';
    case 3:
      return '舒适型';
    case 4:
      return '高档型';
    case 5:
      return '豪华型';
    default:
      return '其他';
  }
}
export const getParkType = (val) => {
  switch (Number(val)) {
    case 0:
      return '用餐';
    case 1:
      return '景点';
    case 2:
      return '酒店';
    case 3:
      return '交通';
    default:
      return '未知';
  }
};
export const getEatType = (val)=>{
  switch (Number(val)) {
    case 0:
      return '早餐';
    case 1:
      return '午餐';
    case 2:
      return '晚餐';
    default:
      return '未知';
  }
};
export const  getOutStatus = (val)=>{
  switch (Number(val)) {
    case 0:
      return '出单中';
    case 1:
      return '出单成功';
    case 2:
      return '出单失败';
    default:
      return '未知';
  }
};
export const getCheck = (val)=>{
  switch (Number(val)) {
    case 0:
      return '审核中';
    case 1:
      return '通过';
    case 2:
      return '未通过';
    default:
      return '未知';
  }
};
export const getLongOut = val=>{
  switch (Number(val)) {
    case 0:
      return '短线';
    case 1:
      return '长线';
    default:
      return '未知';
  }
};
export const getSex = val =>{
  switch (Number(val)) {
    case 0:
      return '男';
    case 1:
      return '女';
    default:
      return '未知';
  }
};
//三证合一
export const getIncludeCert = val=>{
  switch (Number(val)) {
    case 0:
      return '是';
    case 1:
      return '否';
    default:
      return '未知';
  }
}

//审核状态
export const getPass = val=>{
  switch (Number(val)) {
    case 0:
      return '审核中';
    case 1:
      return '审核成功';
    case 2:
      return '审核失败';
    default:
      return '未知';
  }
}
//我的订单状态
export const getTicketStatus=val=>{
  switch (Number(val)) {
    case 0:
      return '未支付';
    case 1:
      return '已支付';
    case 2:
      return '已取消';
    default:
      return '未知';
  }
};
function getNum(num) {
  return num<10?'0'+num:''+num
}


export const getTiem = (num) => {
  return getNum(parseInt(num/1200))+':'+ getNum(parseInt(num/60)) +':'+ getNum(num%60)
}
export const getHouseNumber = v=>{
  if(v){
    let arr = v.split(',');
    let one = arr[0].split('-')
    let newArr = []
    if(one.length>2){
      //3个
      for(var i=0;i<arr.length;i++){
        let arrList = arr[i].split('-');
        newArr.push( arrList[0]+'栋'+arrList[1]+'楼'+arrList[2]+'号')
      }
    }else{
      //2个
      for(var i=0;i<arr.length;i++){
        let arrList = arr[i].split('-');
        newArr.push( arrList[0]+'楼'+arrList[1]+'号')
      }
    }
    return newArr.join(',')
  }
}

//时间
export const getUseTime = val=>{
  let date = new Date()
  if(!val){
    return date.getFullYear()+'-'+getNum((date.getMonth()+1))+'-'+getNum(date.getDate())+' '+getNum(date.getHours())+':'+getNum(date.getMinutes())+':'+getNum(date.getSeconds())
  }else{
    if(!val.includes('.')){
      return val.replace(/T/,' ')
    }else{
      return val.substring(0,val.indexOf('.')).replace(/T/,' ')
    }
  }
};
//订单类型
export const getOrderType = val=>{
  switch (Number(val)) {
    case 0:
      return '旅行社订单';
    case 1:
      return '车票订单';
    case 2:
      return '门票订单';
    case 3:
      return '美食订单';
    case 4:
      return '酒店订单';
    case 5:
      return '租车订单';
    default:
      return '未知';
  }
};


//跟团游和自由行
export const getHeelType = val=>{
  switch (Number(val)) {
    case 0:
      return '跟团游';
    case 1:
      return '自由行';
    default:
      return '其他';
  }
}
//去掉后面的:00
export const cancelTime = val=>{
  if(val){
    let n = val.lastIndexOf(':')
    return val.substring(0,n)
  }
}
//结算状态
export const settlementState = val =>{
  switch (Number(val)) {
    case 0:
      return '未结算';
    case 1:
      return '已结算';
    default:
      return '其他';
  }
}

