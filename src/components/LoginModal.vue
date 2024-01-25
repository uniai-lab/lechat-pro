<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 "
    v-if="porps.visible" id="login-modal">
    <div id="captcha"></div>

    <!-- 模态框 -->
    <div class="bg-white rounded-md shadow-md p-4">
      <!-- 头部 -->
      <div class="flex justify-center items-center mb-4" style="position: relative;">
        <h2 class="text-lg font-medium">登录</h2>
        <button class="text-gray-700 hover:text-gray-900 " style="position: absolute; left:0px;" @click="back"
          v-if="type == 'code'"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>


        </button>
        <button v-if="type != 'code'" :data-id="type" class="text-gray-700 hover:text-gray-900 "
          style="position: absolute; right:30px;" @click="changetype('code')"><svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
          </svg>

        </button>
        <button class="text-gray-700 hover:text-gray-900 " style="position: absolute; right: 0;" @click="hideModal"><svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>
      <!-- 表单 -->
      <form v-if="type == 'phone'" style="width: 310px;">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="phone-number">手机号</label>
          <input v-model="info.phone"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone-number" type="tel" placeholder="请输入手机号码">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="verification-code">验证码</label>
          <div class="flex items-center justify-between">
            <input v-model="info.code" maxlength="6" 
              class="appearance-none border  rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/5"
              id="verification-code" type="text" placeholder="请输入验证码">
            <button @click="getCode" :disabled="!loginflag"
              class="bg-gray-900  disabled:bg-gray-600  hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-2/5 ml-2"
              :class="loginflag ? '' : 'bg-gray-600 text-mini'" type="button">{{ getCodetitle }}</button>
          </div>
        </div>
        <!-- <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="password">密码</label>
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="请输入密码">
      </div> -->
        <div class="flex justify-center items-center mt-7 mb-7 " style="position: relative;">
          <button @click="beforelogin"
            class="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 px-10 rounded focus:outline-none focus:shadow-outline"
            type="button">登录</button>
          <!-- <a class="text-gray-900 hover:text-gray-600" href="#" style="position: absolute;right: 0;">忘记密码？</a> -->
        </div>
        <div class="flex justify-center   items-center mt-9 mb-0  " :data-id="type" @click="changetype('password')">
          <div class="flex    justify-center items-center flex-col">
            <div class="flex   justify-center items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>

            </div>
            <div class="flex mt-2 text-xs justify-center items-center text-gray-700 ">
              密码登陆
            </div>
          </div>
          <!-- <div class="flex   justify-center items-center flex-col">
            <div class="flex   justify-center items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>

            </div>
            <div class="flex mt-2 text-xs justify-center items-center text-gray-700 ">
              密码登陆
            </div>
          </div> -->

        </div>
      </form>

      <!-- 表单 -->
      <form v-if="type == 'password'" class="w-max" style="width: 310px;">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="phone-number">手机号</label>
          <input v-model="info.phone"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone-number" type="tel" placeholder="请输入手机号码">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="verification-code">密码</label>
          <div class="flex items-center justify-between">
            <input
              class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="verification-code" type="text" placeholder="请输入密码">

          </div>
        </div>
        <!-- <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="password">密码</label>
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="请输入密码">
      </div> -->
        <div class="flex justify-center items-center mt-7 mb-7 " style="position: relative;">
          <button
            class="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 px-10 rounded focus:outline-none focus:shadow-outline"
            type="submit">登录</button>
          <!-- <a class="text-gray-900 hover:text-gray-600" href="#" style="position: absolute;right: 0;">忘记密码？</a> -->
        </div>
        <div class="flex justify-center   items-center mt-9 mb-0  " :data-id="type" @click="changetype('phone')">
          <div class="flex    justify-center items-center flex-col">
            <div class="flex   justify-center items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>

            </div>
            <div class="flex mt-2 text-xs justify-center items-center text-gray-700 ">
              手机验证
            </div>
          </div>
          <!-- <div class="flex   justify-center items-center flex-col">
            <div class="flex   justify-center items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>

            </div>
            <div class="flex mt-2 text-xs justify-center items-center text-gray-700 ">
              密码登陆
            </div>
          </div> -->

        </div>
      </form>


      <!-- code -->

      <form v-if="type == 'code'">


        <div class="mb-4">
          <div class="flex items-center justify-center p-4">
            <!-- <img style="width: 260px;"
              src="https://img2.baidu.com/it/u=2020520018,1139302565&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800" alt="">
             -->
            <Flex gap="middle"  wrap="wrap">
              <!-- <QRCode :value='codevalue' status="loading" /> -->
              <QRCode size="220" :value='codevalue' :status="codesstatus" :onRefresh='codeRefresh' />
                <!-- <QRCode :value='codevalue' status="scanned" /> -->
            </Flex>
          </div>
          <label  @click="codeRefresh" class=" w-full text-gray-600  mb-2 flex items-center justify-center" for="verification-code">点击刷新</label>

        </div>


      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, onMounted, nextTick } from 'vue';
import { http } from '@/common/request.js';
import { DocFail } from '@icon-park/vue-next';
import { MessageApi } from 'vue3-dxui'
import { Flex, QRCode } from 'ant-design-vue';
const tisShow = ref(false);
const lefttime = ref(0);
const codevalue = ref('https://ant.design');
const tisContent = '对话次数每7天重置，可通过完成任务获取额外的对话次数，额外对话次数不会被重置。';
const userinfo = reactive({});
const config = reactive({});
const label = [];
const showTooltip = ref(false);
const hideScreenCove = ref(true);
const getCodetitle = ref('获取验证码');
const codesstatus = ref('expired');

const info = reactive({
  phone: '',
  code: ''
});
const errorType = 'border-bottom';
const tips = '';
const value = '';
const loginflag = ref(true);
const rules = reactive({
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: ['change', 'blur']
    },
    {
      validator: (rule, value, callback) => {
        return uni.$u.test.mobile(value);
      },
      message: '手机号码不正确',
      trigger: ['change', 'blur']
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: ['change', 'blur']
    },
    {
      len: 6,
      message: '请输入正确的验证码',
      trigger: ['change', 'blur']
    }
  ]
});

const captchaObj = reactive({});

const emit = defineEmits(['hideModal', 'customEvent'])
const porps = defineProps({ visible: { type: Boolean } });
const visible = porps.visible
console.log(porps.visible)

const type = ref('phone')

function back() {
  type.value = 'phone'
}
function changetype(e) {
  console.log(e)

  type.value = e
}
// function changetype() {
// type.value='password'
// }
const hideModal = () => {
  emit('hideModal');
};

onMounted(
  () => {
    var script = document.createElement('script');
    script.src = "https://static.geetest.com/v4/gt4.js";
    document.body.appendChild(script);
    script.onload = script.onreadystatechange = () => {
      initGeetest4({
        captchaId: 'b0a78ab0191bd4361905eba5b2209be5',
        product: 'bind'
      }, (captcha) => {
        captcha.appendTo("#captcha"); // 调用appendTo将验证码插入到页的某一个元素中，这个元素用户可以自定义

        captchaObj.value = captcha
        captcha.onSuccess(async () => { // web端的回调
          var result = await captcha.getValidate();
          aftersuccess(result)
        });
      });
    };

  }

)
function changelefttime() {
  // while (
  //   lefttime.value > 0
  // ){
  let timer = 0
  return () => {
    timer = setInterval(() => {
      lefttime.value -= 1
      getCodetitle.value = lefttime.value + 'S后重试'

      if (lefttime.value <= 0) {
        getCodetitle.value = '重新发送'
        loginflag.value = true

        clearInterval(timer)
      }
    }, 1000);
  }
}
function getCode() {
  // if (this.$refs.uCode.canGetCode) {
  //   this.$refs.uForm.validateField('phone', flag => {
  //     if (flag.length) uni.$u.toast(flag[0].message)
  //     else 
  //   })
  // } else {
  //   uni.$u.toast('倒计时结束后再发送');
  // }


  if (validatePhone(info.phone)) {

    captchaObj.value.showCaptcha();


  } else {
    MessageApi.open({
      type: 'error',
      duration: 3000,
      content: '手机号格式错误'
    })
  }
}
function validatePhone(phone) {
  console.log(phone)
  const regex = /^1[3456789]\d{9}$/; // 手机号正则表达式
  return regex.test(phone);
}
async function aftersuccess(result) {
  const header = {}
  for (let i of Object.keys(result)) {
    header[i.replace('_', '-')] = result[i]
  }


  try {
    // uni.showLoading({
    //   title: '正在获取验证码'
    // })
    console.log('正在获取验证码')

    await http('get-sms-code', {
      phone: info.phone
    }, 'POST', header)
    MessageApi.open({
      type: 'success',
      duration: 3000,
      content: '验证码已发送'
    })
    // getCodetitle.value = '发送成功'
    loginflag.value = false
    lefttime.value = 46
    changelefttime()()
    // setTimeout
    //   (() => {
    //     getCodetitle.value = '重新获取'
    //     loginflag.value = true
    //   }, 35000)
    // 通知验证码组件内部开始倒计时
    // uni.$u.toast('验证码已发送');
    // this.$refs.uCode.start();
  } catch (error) {
    // uni.$u.toast('验证码发送失败');
    console.log('验证码发送失败', error)
    alert('验证码发送失败')

  } finally {
    // uni.hideLoading();
    console.log('验证码发送')


  }


}
async function submit() {
  // uni.showLoading({
  //   title: '登录中'
  // })
  try {
    // const fid = this.$f.get('fid') || 0
  
    const data = await http('login', {
      phone:info.phone,
      code:info.code,

    }, 'POST')
    const res = await data.json()
    console.log(res)
    if (res.status == 1) {
      localStorage.setItem('id', res.data.id)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('phone', res.data.phone)
      localStorage.setItem('name', res.data.name)
      localStorage.setItem('username', res.data.username)
      console.log('监听到登录');

      
      // iflogin.value = true
      emit('customEvent', '参数1', '参数2');
      hideModal()
      // MessageApi.open({
      //   type: 'success',
      //   duration: 3000,
      //   content: '登录成功'
      // })
    }
    else {

      MessageApi.open({
        type: 'error',
        duration: 3000,
        content: res.msg
      })
    }


    // uni.switchTab({
    //   url: '/pages/index/index'
    // })

  } catch (error) {
    //2/17
    // uni.$u.toast('登录失败');
    console.log('登录失败', error)
    MessageApi.open({
      type: 'error',
      duration: 3000,
      content: '登录失败'
    })
  } finally {
    // uni.hideLoading()
    // console.log('登录')

  }
}
async function beforelogin() {
  let flag = false
  if (validatePhone(info.phone)) {
    await submit()

  } else {
    MessageApi.open({
      type: 'error',
      duration: 3000,
      content: '手机号格式错误'
    })
  }



}
 function codeRefresh() {
  const randomInteger = Math.floor(Math.random() * 10) + 1;
  codevalue.value=randomInteger+'sss'
  codesstatus.value='active'
  console.log('codevalue', codevalue.value)
}
</script>

<style scoped>
/* 样式代码 */
</style>
