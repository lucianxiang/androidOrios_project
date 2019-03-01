/**
 * Created by leibo on 18/7/4.
 */
const Home = (resolve) => require(['@/view/Home'], resolve);//首页
const SearchPage = (resolve) => require(['@/view/SearchPage'], resolve);//搜索页
const CityList = (resolve) => require(['@/view/CityList'], resolve);//城市列表

//跟团游

const TourSearchDetails = (resolve) => require(['@/view/tour/TourSearchDetails'], resolve);//旅游查询详情
const NearbyTour = (resolve) => require(['@/view/tour/NearbyTour'], resolve);
const ExitShortTour = (resolve) => require(['@/view/tour/ExitShortTour'], resolve);
const SeletePlayDate = (resolve) => require(['@/view/tour/SeletePlayDate'], resolve);//选择团期
const SelectTourist = (resolve) => require(['@/view/tour/SelectTourist'], resolve);//选择出游人
const AddTourist = (resolve) => require(['@/view/tour/AddTourist'], resolve);//添加游客
const ProductChara = (resolve) => require(['@/view/tour/ProductChara'], resolve);//地点详情
const ProductFeatures = (resolve) => require(['@/view/tour/ProductFeatures'], resolve);//产品特色
const CommentsOnTourists = (resolve) => require(['@/view/tour/CommentsOnTourists'], resolve);//产品特色
const TourTrip = (resolve) => require(['@/view/tour/TourTrip'], resolve);//行程
const CostDescription = (resolve) => require(['@/view/tour/CostDescription'], resolve);//费用说明
const PredeterminedInstructions = (resolve) => require(['@/view/tour/PredeterminedInstructions'], resolve);//预定须知
const TravelNotes = (resolve) => require(['@/view/tour/TravelNotes'], resolve);//出行须知
const BreachResponsibility = (resolve) => require(['@/view/tour/BreachResponsibility'], resolve);//违约责任
const SpecialLimit = (resolve) => require(['@/view/tour/SpecialLimit'], resolve);//特殊限制
const SecurityTips = (resolve) => require(['@/view/tour/SecurityTips'], resolve);//安全提示
const ThemeOfPlay = (resolve) => require(['@/view/tour/ThemeOfPlay'], resolve);//游玩主题
const FillOrder = (resolve) => require(['@/view/tour/FillOrder'], resolve);//填写订单

//个人中心

const UserCenter = (resolve) => require(['@/view/UserCenter/UserCenter'], resolve);//个人中心
const UserLogin = (resolve) => require(['@/view/UserCenter/UserLogin'], resolve);//用户登录
const UserRegister = (resolve) => require(['@/view/UserCenter/UserRegister'], resolve);//用户注册
const UserInfo = (resolve) => require(['@/view/UserCenter/UserInfo'], resolve);//用户信息
const ChangePermanentResidence = (resolve) => require(['@/view/UserCenter/ChangePermanentResidence'], resolve);//选择常住地
const ChangeOccupation = (resolve) => require(['@/view/UserCenter/ChangeOccupation'], resolve);//选择职业
const ChangeEducation = (resolve) => require(['@/view/UserCenter/ChangeEducation'], resolve);//选择学历
const FindPassword = (resolve) => require(['@/view/UserCenter/FindPassword'], resolve);//忘记密码
const UpdatePassword = (resolve) => require(['@/view/UserCenter/UpdatePassword'], resolve);//修改密码
const MyWallet = (resolve) => require(['@/view/UserCenter/MyWallet'], resolve);//我的钱包
const RechargeMoney = (resolve) => require(['@/view/UserCenter/RechargeMoney'], resolve);//充值余额
const UpdateWalletInfo = (resolve) => require(['@/view/UserCenter/UpdateWalletInfo'], resolve);//修改钱包信息
const TopContacts = (resolve) => require(['@/view/UserCenter/TopContacts'], resolve);//常用联系人
const AddTopContacts = (resolve) => require(['@/view/UserCenter/AddTopContacts'], resolve);//添加常用联系人
const SelectTopContacts = (resolve) => require(['@/view/UserCenter/SelectTopContacts'], resolve);//选择常用联系人
const SweepCode = (resolve) => require(['@/view/UserCenter/SweepCode'], resolve);//确认登录
const AboutHly = (resolve) => require(['@/view/UserCenter/AboutHly'], resolve);//关于hly

//门票

const TicketDetails = (resolve) => require(['@/view/ticket/TicketDetails'], resolve);//门票首页
const TicketSearchDetails = (resolve) => require(['@/view/ticket/TicketSearchDetails'], resolve);//景点查询详情
const TicketFillOrder = (resolve) => require(['@/view/ticket/TicketFillOrder'], resolve);//填写景点订单
const SearchTicketList = (resolve) => require(['@/view/ticket/SearchTicketList'], resolve);//景点查询列表页
const TicketSearchList = (resolve) => require(['@/view/ticket/TicketSearchList'], resolve);//景点查询列表页
const TicketMap = (resolve) => require(['@/view/ticket/TicketMap'], resolve);//景点地图

//酒店

const HotelHome = (resolve) => require(['@/view/hotel/HotelHome'], resolve);//酒店首页
const HotelDetails = (resolve) => require(['@/view/hotel/HotelDetails'], resolve);//酒店详情
const HotelSearchDetails = (resolve) => require(['@/view/hotel/HotelSearchDetails'], resolve);//酒店查询详情
const HotelFillOrder = (resolve) => require(['@/view/hotel/HotelFillOrder'], resolve);//填写酒店订单
const HotelRoomInfo = (resolve) => require(['@/view/hotel/HotelRoomInfo'], resolve);//填写酒店订单
const HotelCommentInfo = (resolve) => require(['@/view/hotel/HotelCommentInfo'], resolve);//酒店评论详情

//美食

const FoodDetails = (resolve) => require(['@/view/food/FoodDetails'], resolve);//美食首页
const FoodRestaurantIntroduction = (resolve) => require(['@/view/food/FoodRestaurantIntroduction'], resolve);//美食首页
const FoodDetailInfo = (resolve) => require(['@/view/food/FoodDetailInfo'], resolve);//美食详细页面
const FoodOrderDetail = (resolve) => require(['@/view/food/FoodOrderDetail'], resolve);//美食详细页面
const FoodSearch = (resolve) => require(['@/view/food/FoodSearch'], resolve);//美食查找页
const BusinessInfo = (resolve) => require(['@/view/food/BusinessInfo'], resolve);//美食查找页
const FoodSellerInfo = (resolve) => require(['@/view/food/FoodSellerInfo'], resolve);//美食商家信息1
const FoodSellerInfoTwo = (resolve) => require(['@/view/food/FoodSellerInfoTwo'], resolve);//美食商家信息2
const FoodOrderIfo = (resolve) => require(['@/view/food/FoodOrderIfo'], resolve);//美食订单信息

//租车

const CarDetails = (resolve) => require(['@/view/car/CarDetails'], resolve);//租车首页
const SearchCity = (resolve) => require(['@/view/car/SearchCity'], resolve);//搜索城市
const SelectCar = (resolve) => require(['@/view/car/SelectCar'], resolve);//选择车型
const Select = (resolve) => require(['@/view/car/Select'], resolve);//筛选
const CarInfo = (resolve) => require(['@/view/car/CarInfo'], resolve);//车辆详情
const ConfirmOrder = (resolve) => require(['@/view/car/ConfirmOrder'], resolve);//确认订单

//微电影

const MovieDetails = (resolve) => require(['@/view/movie/MovieDetails'], resolve);//微电影首页
const MovieChannel = (resolve) => require(['@/view/movie/MovieChannel'], resolve);//微电影频道
const MoviePlayers = (resolve) => require(['@/view/movie/MoviePlayers'], resolve);//微电影播放
const MovieAllComment = (resolve) => require(['@/view/movie/MovieAllComment'], resolve);//微电影评论
const MovieSeries = (resolve) => require(['@/view/movie/MovieSeries'], resolve);//微电影系列
const MovieEducation = (resolve) => require(['@/view/movie/MovieEducation'], resolve);//微电影教育

//订单

const PayOrder = (resolve) => require(['@/view/aboutOrder/PayOrder'], resolve);//支付订单
const MyOrderDetails = (resolve) => require(['@/view/aboutOrder/MyOrderDetails'], resolve);//我的订单详情
const MyFoodOrderDetails = (resolve) => require(['@/view/aboutOrder/MyFoodOrderDetails'], resolve);//我的美食订单详情
const MyCarOrderDetails = (resolve) => require(['@/view/aboutOrder/MyCarOrderDetails'], resolve);//订单信息
const MyHotelOrderInfo = (resolve) => require(['@/view/aboutOrder/MyHotelOrderInfo'], resolve);//酒店订单详情
const Barcode = (resolve) => require(['@/view/aboutOrder/Barcode'], resolve);//扫一扫
const MyTicketOrderDetails = (resolve) => require(['@/view/aboutOrder/MyTicketOrderDetails'], resolve);//扫一扫

//跟团游搜索列表页
const SearchKeyword = (resolve) => require(['@/view/tour/SearchKeyword'], resolve);
const Setting = (resolve) => require(['@/view/UserCenter/Setting'], resolve);//设置

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/searchPage',
    name: 'SearchPage',
    component: SearchPage
  },
  {
    path: '/cityList',
    name: 'CityList',
    component: CityList,
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
  },
  {
    path: '/searchKeyword',
    name: 'SearchKeyword',
    component: SearchKeyword,
  },
  {
    path: '/nearbyTour',
    name: 'NearbyTour',
    component: NearbyTour,
  },
  {
    path: '/exitShortTour',
    name: 'ExitShortTour',
    component: ExitShortTour,
  },
  {
    path: '/barcode',
    name: 'Barcode',
    component: Barcode,
  },
  {
    path: '/myTicketOrderDetails',
    name: 'MyTicketOrderDetails',
    component: MyTicketOrderDetails,
  },
  {
    path: '/productChara/:id',
    name: 'ProductChara',
    component: ProductChara,
    children: [
      {
        path: 'productFeatures',
        name: 'ProductFeatures',
        component: ProductFeatures,
      },
      {
        path: 'tourTrip',
        name: 'TourTrip',
        component: TourTrip
      },
      {
        path: 'costDescription',
        name: 'CostDescription',
        component: CostDescription
      },
      {
        path: 'predeterminedInstructions',
        name: 'PredeterminedInstructions',
        component: PredeterminedInstructions
      },
      {
        path: 'commentsOnTourists',
        name: 'CommentsOnTourists',
        component: CommentsOnTourists
      }
    ]
  },
  {
    path: '/userCenter',
    name: 'UserCenter',
    component: UserCenter,
  },
  {
    path: '/userLogin',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/userRegister',
    name: 'UserRegister',
    component: UserRegister,
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: UserInfo,
  },
  {
    path: '/changePermanentResidence',
    name: 'ChangePermanentResidence',
    component: ChangePermanentResidence,
  },
  {
    path: '/changeOccupation',
    name: 'ChangeOccupation',
    component: ChangeOccupation,
  },
  {
    path: '/changeEducation',
    name: 'ChangeEducation',
    component: ChangeEducation,
  },
  {
    path: '/findPassword',
    name: 'FindPassword',
    component: FindPassword,
  },
  {
    path: '/updatePassword',
    name: 'UpdatePassword',
    component: UpdatePassword,
  },
  {
    path: '/myWallet',
    name: 'MyWallet',
    component: MyWallet,
  },
  {
    path: '/rechargeMoney',
    name: 'RechargeMoney',
    component: RechargeMoney,
  },
  {
    path: '/updateWalletInfo',
    name: 'UpdateWalletInfo',
    component: UpdateWalletInfo,
  },
  {
    path: '/topContacts',
    name: 'TopContacts',
    component: TopContacts,
  },
  {
    path: '/addTopContacts',
    name: 'AddTopContacts',
    component: AddTopContacts,
  },
  {
    path: '/selectTopContacts',
    name: 'SelectTopContacts',
    component: SelectTopContacts,
  },
  {
    path: '/sweepCode',
    name: 'SweepCode',
    component: SweepCode,
  },
  {
    path: '/aboutHly',
    name: 'AboutHly',
    component: AboutHly,
  },
  {
    path: '/ticketDetails',
    name: 'TicketDetails',
    component: TicketDetails,
  },
  {
    path: '/hotelHome',
    name: 'HotelHome',
    component: HotelHome,
  },
  {
    path: '/hotelDetails',
    name: 'HotelDetails',
    component: HotelDetails,
  },
  {
    path: '/hotelFillOrder',
    name: 'HotelFillOrder',
    component: HotelFillOrder,
  },
  {
    path: '/hotelRoomInfo',
    name: 'HotelRoomInfo',
    component: HotelRoomInfo,
  },
  {
    path: '/hotelCommentInfo',
    name: 'HotelCommentInfo',
    component: HotelCommentInfo,
  },
  {
    path: '/myHotelOrderInfo',
    name: 'MyHotelOrderInfo',
    component: MyHotelOrderInfo,
  },
  {
    path: '/foodDetails',
    name: 'FoodDetails',
    component: FoodDetails,
  },

  {
    path: '/foodRestaurantIntroduction',
    name: 'FoodRestaurantIntroduction',
    component: FoodRestaurantIntroduction,
  },


  {
    path: '/foodDetailInfo',
    name: 'FoodDetailInfo',
    component: FoodDetailInfo,
  },

  {
    path: '/foodOrderDetail',
    name: 'FoodOrderDetail',
    component: FoodOrderDetail,
  },


  {
    path: '/foodSellerInfo',
    name: 'FoodSellerInfo',
    component: FoodSellerInfo,
  },
  {
    path: '/foodSellerInfoTwo',
    name: 'FoodSellerInfoTwo',
    component: FoodSellerInfoTwo,
  },
  {
    path: '/foodSearch',
    name: 'FoodSearch',
    component: FoodSearch,
  },
  {
    path: '/foodOrderIfo',
    name: 'FoodOrderIfo',
    component: FoodOrderIfo,
  },
  {
    path: '/carDetails',
    name: 'CarDetails',
    component: CarDetails,
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: ConfirmOrder,
  },
  {
    path: '/selectCar',
    name: 'SelectCar',
    component: SelectCar,
  },
  {
    path: '/carInfo',
    name: 'CarInfo',
    component: CarInfo,
  },
  {
    path: '/select',
    name: 'Select',
    component: Select,
  },
  {
    path: '/movieDetails',
    name: 'MovieDetails',
    component: MovieDetails,
  },
  {
    path: '/movieChannel',
    name: 'MovieChannel',
    component: MovieChannel,
  },
  {
    path: '/moviePlayers',
    name: 'MoviePlayers',
    component: MoviePlayers,
  },
  {
    path: '/movieAllComment',
    name: 'MovieAllComment',
    component: MovieAllComment,
  },
  {
    path: '/movieSeries',
    name: 'MovieSeries',
    component: MovieSeries,
  },
  {
    path: '/movieEducation',
    name: 'MovieEducation',
    component: MovieEducation,
  },
  {
    path: '/ticketSearchDetails',
    name: 'TicketSearchDetails',
    component: TicketSearchDetails,
  },
  {
    path: '/ticketFillOrder',
    name: 'TicketFillOrder',
    component: TicketFillOrder,
  },
  {
    path: '/ticketMap',
    name: 'TicketMap',
    component: TicketMap,
  },
  {
    path: '/searchTicketList',
    name: 'SearchTicketList',
    component: SearchTicketList,
  },
  {
    path: '/seletePlayDate',
    name: 'SeletePlayDate',
    component: SeletePlayDate,
  },
  {
    path: '/selectTourist',
    name: 'SelectTourist',
    component: SelectTourist,
  },
  {
    path: '/addTourist',
    name: 'AddTourist',
    component: AddTourist,
  },
  {
    path: '/payOrder',
    name: 'PayOrder',
    component: PayOrder,
  },
  {
    path: '/myOrderDetails',
    name: 'MyOrderDetails',
    component: MyOrderDetails,
  },
  {
    path: '/myFoodOrderDetails',
    name: 'MyFoodOrderDetails',
    component: MyFoodOrderDetails,
  },
  {
    path: '/myCarOrderDetails',
    name: 'MyCarOrderDetails',
    component: MyCarOrderDetails,
  },
  {
    path: '/fillOrder',
    name: 'FillOrder',
    component: FillOrder,
  },
  {
    path: '/searchCity/:id',
    name: 'SearchCity',
    component: SearchCity,
  },
  {
    path: '/travelNotes',
    name: 'TravelNotes',
    component: TravelNotes,
  },
  {
    path: '/breachResponsibility',
    name: 'BreachResponsibility',
    component: BreachResponsibility,
  },
  {
    path: '/specialLimit',
    name: 'SpecialLimit',
    component: SpecialLimit,
  },
  {
    path: '/securityTips',
    name: 'SecurityTips',
    component: SecurityTips,
  },
  {
    path: '/themeOfPlay',
    name: 'ThemeOfPlay',
    component: ThemeOfPlay,
  },
  {
    path: '/businessInfo',
    name: 'BusinessInfo',
    component: BusinessInfo,
  },
  {
    path: '*',
    hidden: true,
    redirect: {path: '/'}
  }]
