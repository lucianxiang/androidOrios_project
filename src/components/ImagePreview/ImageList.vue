<template>
  <div>
    <div id="wrap" v-show="isShow">
      <header>
        <div class="closeICon" @click="closeImage"><i></i></div>
        <strong>{{imageIndex + 1}}/{{defaulteImage.length}}</strong>
      </header>
      <section>
        <swiper style="position: relative;width: 100%;height: 100%;" height="100%" loop v-model="imageIndex">
          <swiper-item
            class="swiper-demo-img"
            v-for="item,index in defaulteImage"
            :key="index"
          >
            <img
              class="imgClass"
              :src="item"
            >
          </swiper-item>
        </swiper>
        <ul class="titleList">
          <li
            v-for="item,index in images"
            :class="{active: index == activeIndex}"
            @click="changeImage(item,index)"
          >{{item.ht_hi_ImageTypeName}}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Swiper, SwiperItem} from 'vux'

  export default {
    components: {
      Swiper,
      SwiperItem,
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      data: {
        default: () => []
      },
    },
    computed: Object.assign({}, mapGetters([
      ''
    ])),
    created() {
      if (this.data) {
        this.images = this.data;
        if (this.value) {
          this.isShow = this.show
        }
      }
    },
    watch: {
      data(arr) {
        this.images = arr
        this.defaulteImage = this.images[0].imageList;
      },
      isShow(val) {
        if (val) {
          this.$emit('input', true)
        }
      },
      value(val) {
        this.isShow = val
      }
    },
    data() {
      return {
        defaulteImage: [],
        images: [],
        isShow: false,
        imageIndex: 0,
        activeIndex: 0,
      }
    },
    methods: {
      closeImage() {
        this.isShow = false;
        this.$emit('input', false)
      },
      changeImage(item, index) {
        this.imageIndex = 0;
        this.defaulteImage = item.imageList;
        this.activeIndex = index;
      }
    },
    mounted() {

    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;

  #wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #000;
    z-index: 100000;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 88/@r;
  }

  .closeICon {
    width: 50/@r;
    height: 50/@r;
    padding: 10/@r;
    position: absolute;
    left: 30/@r;
    top: 19/@r;
  }

  .closeICon i {
    display: block;
    width: 30/@r;
    height: 30/@r;
    background: url("../../assets/img/home/closeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  header strong {
    display: block;
    text-align: center;
    color: #fff;
    line-height: 88/@r;
    font-size: 30/@r;
    font-family: "微软雅黑";
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .imgClass {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-60%);
  }

  .titleList {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100000;
    color: #fff;
    padding-bottom: 10/@r;
  }

  .titleList > li {
    float: left;
    width: 25%;
    text-align: center;
    padding: 0 10/@r;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 28/@r;
    line-height: 2;
    font-family: "微软雅黑";
    border-bottom: 1/@r solid transparent;
  }

  .titleList > li.active {
    border-color: #fff;
  }

</style>
