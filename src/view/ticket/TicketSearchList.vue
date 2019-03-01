<template>
  <div>
    <div id="wrap">
      <section>
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <ul class="tourList" id="ticketList">
            <li class="clearfix"
                v-for="item,index in ticketListPageList"
                @click="goTicketDetails(item,index)"
                :class="{active: item.activeState}"
            >
              <div class="imgCase">
                <img v-lazy="item.imgData[0]" alt="" :key="item.imgData[0]">
              </div>
              <div class="tourIntroduce">
                <div class="tourIntroduceBox">
                  <strong>{{item.tm_ts_Name}}</strong>
                  <span>地址: {{item.tm_ts_Address}}</span>
                  <div class="priceBox clearfix">
                    <span class="price">￥<em>{{item.tm_ts_SuggestPrice}}</em><i>起</i></span>
                    <span class="satisfaction">{{item.Percentage}}%满意 |<em> {{item.comment}}条</em>评论</span>
                  </div>
                </div>
              </div>
            </li>
            <li v-show="!ticketListPageList.length" class="showData">暂无更多数据</li>
          </ul>
        </mescroll-vue>
      </section>
    </div>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'
  // 引入mescroll的vue组件
  import MescrollVue from 'mescroll.js/mescroll.vue'

  export default {
    computed: mapGetters([
      'cityObj',
      'ticketScrollTop'
    ]),
    components: {
      Toast,
      MescrollVue
    },
    props: ['keyword', 'keyNum'],
    data() {
      return {
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10 //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
          toTop: {
            //回到顶部按钮
            src: "https://raw.githubusercontent.com/mescroll/mescroll/master/vue-demo/static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
            offset: 1000 //列表滚动1000/@r才显示回到顶部按钮
          },
          lazyLoad: {
            use: true,
            attr: 'imgurl',
            showClass: 'mescroll-lazy-in',
            delay: 500,
            offset: 200
          }
        },
        ticketListPageList: [],
        showErr: false,
        errCon: '',
        tourId: '',
        rowsNum: 10,
        options: {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "token": "",
          "tm_ts_Name": '',//景点名称中的关键字
          "tm_ts_ThemeTypeID": "",//主题编码
          "tm_ts_ProviceID": "",//省编码
          "tm_ts_CityID": "",//市编码
          "page": 1,  //页码
          "rows": 10 //条数
        }
      }
    },
    created() {
      this.$nextTick(() => {
        if (this.ticketScrollTop && this.ticketScrollTop.page) {
          this.mescroll.setPageNum(this.ticketScrollTop.page);
        }
      })
    },
    watch: {
      keyword() {
        if (this.keyNum == 2) {
          this.initData()
            .then(data => {
              this.ticketListPageList = data
            }, err => {
              this.showErr = true;
              this.errCon = err;
            })
        }
      },
      keyNum() {
        if (this.keyNum == 2) {
          this.rowsNum = 10;
          this.initData()
            .then(data => {
              this.ticketListPageList = data
            }, err => {
              this.showErr = true;
              this.errCon = err;
            })
        }
      }
    },
    methods: {
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.$emit('getTicketMescroll', mescroll)
        this.mescroll = mescroll
      },
      //上拉加载
      upCallback(page, mescroll) {
        this.options.page = page.num;
        this.options.tm_ts_Name = this.keyword ? this.keyword : '';
        this.options.tm_ts_CityID = this.keyword ? "" : this.cityObj.sm_af_AreaID;
        this.$store.dispatch('initTicketListPage', this.options)
          .then((arr) => {
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.ticketListPageList = []
            // 把请求到的数据添加到列表
            this.ticketListPageList = this.ticketListPageList.concat(arr)
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              if (this.ticketScrollTop && this.ticketScrollTop.page) {
                let i = this.getIndex(this.ticketListPageList) % 10;
                let ul = document.querySelector('#ticketList');
                let lis = ul.querySelectorAll('li');
                if (lis[i] && lis[i].offsetTop) {
                  mescroll.scrollTo(lis[i].offsetTop, 0);
                  this.$store.commit('clearTicketScrollTop');
                }
              }
              mescroll.endSuccess(arr.length);

            })
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      },
      getIndex(arr){
        for(var i=0;i<arr.length;i++){
          if(arr[i].tm_ts_Code == this.ticketScrollTop.id){
            return i
          }
        }
      },
      //初始化数据
      initData(num) {
        let getTourSiteList = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "token": "",
          "tm_ts_Name": this.keyword ? this.keyword : '',//景点名称中的关键字
          "tm_ts_ThemeTypeID": "",//主题编码
          "tm_ts_ProviceID": "",//省编码
          "tm_ts_CityID": this.keyword ? "" : this.cityObj.sm_af_AreaID,//市编码
          "page": 1,  //页码
          "rows": this.rowsNum //条数
        };
        return this.$store.dispatch('initTicketListPage', getTourSiteList)
      },
//      跳转
      goTicketDetails(item, index) {
        this.$store.commit('ticketScrollTop', {
          id: item.tm_ts_Code,
          page:item.page,
          rows: this.options.rows
        });
        this.$router.push({name: 'TicketSearchDetails', query: {id: item.tm_ts_Code}});
      },
    },
    mounted() {
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  .mescroll {
    position: fixed;
    top: 180/@r;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    height: auto;
  }

  .tourList > li {
    border-bottom: 1/@r solid #ccc;
    padding: 10/@r 30/@r;
  }

  .tourList > li.active {
    background-color: #f1f1f1;
  }

  .tourList > li.active .tourIntroduceBox > strong {
    color: red;
  }

  .imgCase {
    float: left;
    position: relative;
  }

  .imgCase > img {
    width: 160/@r;
    height: 200/@r;
  }

  .imgCase > i {
    position: absolute;
    top: 9/@r;
    left: 0;
    font-size: 25/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    background-color: #53b27c;
    color: #fff;
    padding: 0 5/@r;
  }

  .tourIntroduce {
    overflow: hidden;
    padding-left: 20/@r;
  }

  .tourIntroduceBox {
    float: left;
    width: 100%;
  }

  .tourIntroduceBox > strong {
    font-size: 30/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #333;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .tourIntroduceBox > span {
    display: block;
    font-size: 25/@r;
    line-height: 38/@r;
    font-family: "微软雅黑";
    color: #666;
  }

  .priceBox {
    padding-top: 10/@r;
    font-size: 25/@r;
    line-height: 45/@r;
    font-family: "微软雅黑";
  }

  .priceBox > .price {
    float: left;
    color: #f80;
  }

  .priceBox > .price > em {
    font-size: 40/@r;
  }

  .priceBox > .satisfaction {
    float: left;
    margin-left: 20/@r;
    color: #666;
  }

  .priceBox > .satisfaction > em {
    color: #f80;
  }

  ul > .showData {
    font-size: 30/@r;
    line-height: 60/@r;
    font-family: "微软雅黑";
    color: #fc7b69;
    text-align: center;
    border-bottom: none;
  }
</style>
