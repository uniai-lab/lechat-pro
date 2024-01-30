<template >
  <div class="flex flex-col h-screen bg-gray-000 dark bg " @click="closeProfile()">
    <!-- <div  v-if="visible" style="width: 100vw;position: absolute;height: 100vh;z-index: 999;"> -->
    <login-modal @custom-event="handleCustomEvent" style="position: absolute;height: 100vh;z-index: 999;" v-if="visible"
      @hideModal="clickConfig">
    </login-modal>
    <a-float-button v-if="!ifphone" @click="cleanchat" type="default" style="margin-bottom:60px;margin-right: 0px;">

      <template #icon>
        <ClearOutlined />
      </template>
    </a-float-button>
    <a-float-button v-if="!ifphone" @click="showface" type="default" style="margin-bottom:130px;margin-right: 0px;">

      <template #icon>
        <!-- <RobotOutlined /> -->

        <a-icon :style="{ fontSize: '20px' }">

          <svg t="1706152318980" class="icon" viewBox="0 0 1117 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="6413" width="20" height="20">
            <path
              d="M263.214545 180.363636h-209.454545a38.4 38.4 0 0 1-41.890909-38.4 38.4 38.4 0 0 1 38.4-37.701818h212.945454a37.701818 37.701818 0 0 1 37.701819 37.701818c0 20.945455-16.756364 38.027636-37.701819 38.4z m810.589091 0H505.483636a38.4 38.4 0 0 1-37.701818-38.4 37.701818 37.701818 0 0 1 37.701818-37.701818h568.32c20.945455 0 38.027636 16.756364 38.4 37.701818 0 21.224727-17.221818 38.4-38.4 38.4z"
              fill="#323333" p-id="6414"></path>
            <path
              d="M388.887273 281.6a139.636364 139.636364 0 1 1 0-279.272727 139.636364 139.636364 0 0 1 0 279.272727z m0-192.698182A53.061818 53.061818 0 0 0 335.127273 141.963636a53.76 53.76 0 1 0 106.821818 0c0-29.323636-23.738182-53.061818-53.061818-53.061818z m-125.672728 820.363637h-209.454545a38.4 38.4 0 0 1-38.4-37.701819 38.4 38.4 0 0 1 38.4-38.4h209.454545c20.945455 0.372364 37.701818 17.454545 37.701819 38.4a37.701818 37.701818 0 0 1-37.701819 37.701819z m810.589091 0H505.483636a37.701818 37.701818 0 0 1-37.701818-37.701819c0-20.945455 16.756364-38.027636 37.701818-38.4h568.32c21.224727 0 38.4 17.221818 38.4 38.4a38.4 38.4 0 0 1-38.4 37.701819z"
              fill="#323333" p-id="6415"></path>
            <path
              d="M388.887273 1010.501818a139.636364 139.636364 0 1 1 0-279.272727 139.636364 139.636364 0 0 1 0 279.272727z m0-192a53.061818 53.061818 0 1 0 0 106.123637 53.061818 53.061818 0 0 0 0-106.123637z m472.669091-272.290909h209.454545a38.4 38.4 0 1 0 0-76.101818h-209.454545a38.4 38.4 0 1 0 0 76.101818z m-811.287273 0h568.32a38.4 38.4 0 0 0 0-76.101818H50.269091a38.4 38.4 0 1 0 0 76.101818z"
              fill="#323333" p-id="6416"></path>
            <path
              d="M596.247273 512a139.636364 139.636364 0 1 1 279.272727 0 139.636364 139.636364 0 0 1-279.272727 0z m85.876363 0a53.76 53.76 0 1 0 107.52 0 53.76 53.76 0 0 0-107.52 0z"
              fill="#323333" p-id="6417"></path>
          </svg>
        </a-icon>
      </template>
    </a-float-button>

    <!-- 密码 -->

    <div>

      <a-modal v-model:open="pwvisible" :footer="null" destroyOnClose="true" title="修改密码" @ok="handlepwOk">

        <a-form style="margin-top: 32px;" name="custom-validation" ref="formRef" :model="formStatepw" :rules="pwrules"
          v-bind="layout" @finish="handleFinish" @finishFailed="handleFinishFailed">
          <a-form-item has-feedback label="新的密码" name="pass">
            <a-input-password v-model:value="formStatepw.pass" type="password" autocomplete="off" />
          </a-form-item>
          <a-form-item has-feedback label="重复密码" name="checkPass">
            <a-input-password v-model:value="formStatepw.checkPass" type="password" autocomplete="off" />
          </a-form-item>

        </a-form>
        <div style="width: 100%;" class="flex justify-center mt-7 mb-9">
          <div @click="sevepw()"
            class="flex justify-center  py-2    text-gray-100 bg-gray-900 hover:bg-gray-700 hover:text-gray-100   rounded-md"
            style="width: 120px;">确定</div>
        </div>
      </a-modal>
    </div>
    <!-- </div> -->
    <!-- <div v-if="ifphone" @click="cleanchat"
          class="flex justify-center items-center ml-2 px-2 rounded-md flex-row text-gray-100 bg-gray-900  hover:bg-gray-600 hover:text-gray-100 ">
          <DeleteOutlined :style="{ fontSize: '24px' }" /> -->
    <a-modal v-model:open="openfase" :footer="null" :confirm-loading="confirmLoading" title="期望角色" @ok="facehandleOk">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="角色">
          <a-input :placeholder="'律师？或者其他职业'" v-model:value="formState.name" />
        </a-form-item>



        <a-form-item label="你的要求">
          <a-textarea :rows='7' :placeholder="'请输入您的具体需求'" v-model:value="formState.desc" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 10 }">
          <!-- <a-button style="margin-right: 10px">取消</a-button> -->
          <a-button style="background-color: black;" type="primary" @click="onSubmit">保存</a-button>

        </a-form-item>
      </a-form>
    </a-modal>


    <a-drawer title="编辑个人资料" :closable="true" :width="320" :visible="msgvisible" :body-style="{ paddingBottom: '80px' }"
      @close="onmsgClose">
      <a-form :model="form" :rules="rules" layout="vertical">

        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="头像" name="avatar">
              <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
                :show-upload-list="false" :customRequest="noup" :before-upload="beforeUpload" @change="handleChange">
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="用户名" name="name">
              <a-input v-model:value="form.name" placeholder="请输入用户名" />
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="手机号" name="phone">
              <div style="display: flex;flex-direction: row;">
                <a-input style="width: 66%;" :disabled="true" v-model:value="form.phone" placeholder="暂未绑定" />
                <div v-if="form.phone == ''"
                  class="ml-auto px-3 py-2  cursor-pointer text-gray-100 bg-gray-900 hover:bg-gray-700 hover:text-gray-100   rounded-md"
                  @click="bindphone()">
                  <div>前往绑定</div>
                </div>
              </div>
            </a-form-item>

          </a-col>

        </a-row>
        <!-- <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Description" name="description">
              <a-textarea v-model:value="form.description" :rows="4" placeholder="please enter url description" />
            </a-form-item>
          </a-col>
        </a-row> -->
      </a-form>

      <div style="width: 100%;" class="flex justify-center mt-20">
        <div @click="sevemsg()"
          class="flex justify-center  py-2    text-gray-100 bg-gray-900 hover:bg-gray-700 hover:text-gray-100   rounded-md"
          style="width: 120px;">保存</div>
      </div>
    </a-drawer>



    <div
      class="flex flex-row flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bg-gray-950  justify-between items-center"
      style="align-items: center; height: 60px;z-index: 999;">
      <div class="flex flex-row text-2xl font-bold text-zinc-50">LeChat
        <div class="flex flex-row ml-1 bg-gray-600 px-1 rounded-md  justify-between items-center text-sm "
          style="height: 20px;">pro</div>
      </div>
      <div v-if="ifphone" class="ml-4 text-sm text-zinc-200">
        基于Uni-AI的自然语言模型对话
      </div>
      <!-- <div class="ml-2 text-xs text-zinc-100 text-gray-100"> V1.0.0</div> -->

      <div v-if="!iflogin"
        class="ml-auto px-3 py-2  cursor-pointer text-gray-100 bg-gray-700 hover:bg-white hover:text-gray-900   rounded-md"
        @click="clickConfig()">
        <div>登陆</div>
      </div>

      <div @click.stop="showProfile()" v-else class="ml-auto" style="align-items: end;">
        <!-- <img
          class="ml-auto  text-sm cursor-pointer text-gray-100 bg-gray-700 hover:bg-gray-400 hover:text-gray-900   rounded-md"
          style="height: 36px;width: 36px;border-radius: 50%; display: flex;flex-direction: column;
        justify-content: center;align-items: center;" :src="userinfo.avatar" alt=""> -->
        <div class=" text-l ml-2 text-gray-100 hover:bg-gray-100 hover:text-gray-900 px-2 py-1 rounded-md   ">{{
          userinfo.name }}</div>
      </div>

      <div v-if="iflogin && ifphone" @click.stop="showchargeModal" style="line-height: 0.7rem;"
        class="px-3 py-2 ml-1 text-sm cursor-pointer text-gray-900 bg-white hover:bg-gray-100 hover:text-gray-900 rounded-md gold-button">
        充值
      </div>
      <div v-if="iflogin && !ifphone" @click.stop="showchargeModal"
        class="flex justify-center items-center ml-1  rounded-md flex-row text-gray-100 bg-gray-900  hover:bg-gray-600 hover:text-gray-100 ">

        <WalletOutlined style="font-size: 22px;" />
      </div>


    </div>
    <!-- 充值弹框 -->


    <!-- <a-button type="primary" @click="showchargeModal">Open Modal</a-button> -->
    <a-modal :footer="null" v-model:open="chargeopen" title="充值" @ok="handchargeleOk">
      <!-- <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p> -->
      <div style=" 
       padding: 20px ;">
        <a-row :gutter="[8, 8]" :wrap="true">
        <div>当前暂未正式开通充值服务，如有需要请联系 AI乐聊 微信小程序客服。</div>
          <!-- <a-col v-for="item in shoplist" @click="choseItem(item)" :xs="24" :sm="8">
            <a-card style=" height: 160px;
            " hoverable :title="item.title" size="small" :bordered="true">
              <div v-for="role in item.rolelist">{{ role }}</div>
              <template #extra>
                <div style="color: rgb(237, 116, 17);">{{ item.price }}</div>
              </template>

            </a-card>
          </a-col> -->

        </a-row>
      </div>

    </a-modal>

    <!-- 弹出框 -->
    <div class="profile-overlay" v-if="isProfileOpen" @click="closeProfile()">
      <!-- <div class="profile-dialog">
        <img style="height: 40px;width:40px;margin-bottom: 20px;" :src="userinfo.avatar" alt="" />
        <div class=" text-l ">{{ userinfo.name }}</div>

        <p class=" text-sm ">剩余次数:{{ userinfo.chance.totalChatChance }}</p>
        <button style="margin-top: 26px;"
          class="text-gray-100 text-sm  px-2 py-1 bg-gray-900 hover:bg-gray-700 hover:text-gray-100  rounded-md "
          @click.stop="logout()">退出登录</button>
      </div> -->
      <a-card hoverable style="width: 300px">
        <template #cover>
          <img alt="example" src="https://openai-1259183477.cos.ap-shanghai.myqcloud.com/WechatIMG925.jpg" />
        </template>
        <template #actions>
          <!-- <setting-outlined  key="setting"   /> -->
          <!-- <KeyOutlined @click.stop="showpwModal()" /> -->
          <!-- <edit-outlined @click="changeuserinfo()" /> -->
          <LogoutOutlined @click.stop="logout()" />

        </template>
        <a-card-meta :title="userinfo.name" :description="'剩余次数:' + userinfo.chance.totalChatChance">

          <template #avatar>
            <a-avatar :src="userinfo.avatar" />
          </template>
        </a-card-meta>
      </a-card>
    </div>

    <a-drawer title="文件列表" :closable="true" :placement="placement" :open="open" @close="onClose"
      :style="{ position: 'absolute' }">
      <!-- <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p> -->
      <template #footer>
        <div class="flex flex-row content-center justify-center items-center text-gray-500 ">
          <a href="http://www.uniai.us">©️中科苏州智能计算技术研究院</a>
        </div>
      </template>
    </a-drawer>
    <div class="flex-1 mx-2 pb-2  text-gray-100  content-center "
      style="position: fixed;top: 60px;left: 0px;right: 0px;bottom:70px;overflow-y: scroll;" ref="chatListDom">
      <div class="loader-container " v-show="upSending">
        <svg class="asvg" viewBox="0 0 80 80" width="200" height="200">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#000"></stop>
              <stop offset="33%" stop-color="#666"></stop>
              <stop offset="66%" stop-color="#999"></stop>
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="30" style="stroke-width: 5px;"></circle>
          <circle cx="40" cy="40" r="25" style="stroke:url(#gradient); stroke-width: 5px;" class="progress"></circle>
        </svg>
      </div>
      <div class="group  flex flex-col mt-2 px-4 py-3  text-gray-900 hover:bg-gray-100 rounded-lg"
        v-for="(item, index) of achat">


        <div  class="flex flex-row justify-between items-center   " style="">


          <div v-if="item.role != 'assistant'" class="flex flex-row justify-between items-center  ">
            <div 
              style="height: 44px; width: 44px;border-radius: 50%;font-size: 18px; margin-left:12px ;"
            :class="index == achat.length - 2 ? 'flex flex-row justify-center items-center   bg-gray-900 text-gray-100  ' : 'flex flex-row justify-center items-center   bg-gray-600 text-gray-100'"
             
              >Me</div>
            <!-- <div class="font-bold " style="margin-left:12px ;">{{ `${item.role}` }}
            </div> -->
          </div>
          <div v-if="item.role == 'assistant'&&!sending" class="flex flex-row justify-between items-center  "> <img
            :style="index == achat.length - 1 ? 'height: 64px;   filter: grayscale(0.9) brightness(0.6) contrast(900%)  ' : 'height: 64px;   filter: grayscale(0.9) brightness(0.8) contrast(300%) '"
            
              :src="index == achat.length - 1 ? 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/after.png' : 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/old.png'" />
               <div  class="font-bold mr-1 "> LeChat</div>
              <img :src="srcMap[item.model]"  style="height: 16px;">
            
              <div class=" ml-1 ">{{ ` ${item.subModel}` }}

            </div>
          </div>

          <div v-if="item.role == 'assistant'&&sending" class="flex flex-row justify-between items-center  "> <img
            :style="index == achat.length - 1 ? 'height: 64px;   filter: grayscale(0.9) brightness(0.9) contrast(900%)  ' : 'height: 64px;   filter: grayscale(0.9) brightness(0.9) contrast(300%) '"

            
            :src="index == achat.length - 1 ? 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/loading.png' : 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/old.png'" />
            
            <div  class="font-bold mr-1 "> LeChat</div>
              <img :src="srcMap[item.model]"  style="height: 16px;">
            
              <div class=" ml-1 ">{{ ` ${item.subModel}` }}
            </div>
          </div>

          <Copy class="invisible group-hover:visible" :content="item.content" />
        </div>
        <div>
          <MdPreview v-if="item.content" :modelValue="item.content"
            style="padding: 0px;background-color: rgba(0,0,0,0);" />

          <Loding v-else />

          <!-- <component :is="component"></component> -->

          <!-- <VueComposition :tree="item.content"></VueComposition> -->


        </div>

      </div>

    </div>
    <div v-if="sending"
      style="z-index: 999 ;background-color: (0,0,0,0); left: 0px;right: 0px; position: fixed;bottom:70px;"
      @click="stopmsg"
      class="flex-1 flex-row  mb-2 my-4  text-gray-100  text-slate-600 leading-relaxed flex justify-center items-center ">
      <div class="stop py-1 px-9 flex justify-center items-center  flex-row ">
        <LoadingOutlined />
        <div class="ml-2">
          停止响应

        </div>
      </div>

    </div>
    <div class="  bottom-0 w-full p-4 bg-gray-100" style="position: fixed; height: 70px;">


      <div class="flex  flex-row ">

        <div @click="showfilelist"
          class="flex justify-center items-center ml-0 px-2   rounded-md flex-row text-gray-900 bg-gray-100  hover:bg-gray-300 hover:text-gray-900 ">
          <MenuUnfoldOutlined :style="{ fontSize: '20px' }" />

        </div>


        <Cascader v-if="ifphone" style="width: auto; min-width: 1px;" :allowClear="false" :defaultValue="commommodel"
          class="mr-0 p-1" expandTrigger="hover" @change="modelOnChange" :options="options" />

        <div v-if="!ifphone"
          class="flex justify-center items-center ml-0 px-2 mr-1  rounded-md flex-row text-gray-900 bg-gray-100  hover:bg-gray-300 hover:text-gray-900 ">
          <a-cascader placeholder="Please select" :v-model="commommodel" :defaultValue="commommodel" :options="options"
            @change="modelOnChange">
            <GlobalOutlined :style="{ fontSize: '20px' }" />

          </a-cascader>


        </div>
        <div @click="showface" v-if="ifphone"
          class="flex justify-center items-center ml-0 px-2 mr-1  rounded-md flex-row text-gray-900 bg-gray-100  hover:bg-gray-300 hover:text-gray-900 ">
          <!-- <RobotOutlined :style="{ fontSize: '20px' }" /> -->
          <a-icon :style="{ fontSize: '20px' }">

            <svg t="1706152318980" class="icon" viewBox="0 0 1117 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="6413" width="20" height="20">
              <path
                d="M263.214545 180.363636h-209.454545a38.4 38.4 0 0 1-41.890909-38.4 38.4 38.4 0 0 1 38.4-37.701818h212.945454a37.701818 37.701818 0 0 1 37.701819 37.701818c0 20.945455-16.756364 38.027636-37.701819 38.4z m810.589091 0H505.483636a38.4 38.4 0 0 1-37.701818-38.4 37.701818 37.701818 0 0 1 37.701818-37.701818h568.32c20.945455 0 38.027636 16.756364 38.4 37.701818 0 21.224727-17.221818 38.4-38.4 38.4z"
                fill="#323333" p-id="6414"></path>
              <path
                d="M388.887273 281.6a139.636364 139.636364 0 1 1 0-279.272727 139.636364 139.636364 0 0 1 0 279.272727z m0-192.698182A53.061818 53.061818 0 0 0 335.127273 141.963636a53.76 53.76 0 1 0 106.821818 0c0-29.323636-23.738182-53.061818-53.061818-53.061818z m-125.672728 820.363637h-209.454545a38.4 38.4 0 0 1-38.4-37.701819 38.4 38.4 0 0 1 38.4-38.4h209.454545c20.945455 0.372364 37.701818 17.454545 37.701819 38.4a37.701818 37.701818 0 0 1-37.701819 37.701819z m810.589091 0H505.483636a37.701818 37.701818 0 0 1-37.701818-37.701819c0-20.945455 16.756364-38.027636 37.701818-38.4h568.32c21.224727 0 38.4 17.221818 38.4 38.4a38.4 38.4 0 0 1-38.4 37.701819z"
                fill="#323333" p-id="6415"></path>
              <path
                d="M388.887273 1010.501818a139.636364 139.636364 0 1 1 0-279.272727 139.636364 139.636364 0 0 1 0 279.272727z m0-192a53.061818 53.061818 0 1 0 0 106.123637 53.061818 53.061818 0 0 0 0-106.123637z m472.669091-272.290909h209.454545a38.4 38.4 0 1 0 0-76.101818h-209.454545a38.4 38.4 0 1 0 0 76.101818z m-811.287273 0h568.32a38.4 38.4 0 0 0 0-76.101818H50.269091a38.4 38.4 0 1 0 0 76.101818z"
                fill="#323333" p-id="6416"></path>
              <path
                d="M596.247273 512a139.636364 139.636364 0 1 1 279.272727 0 139.636364 139.636364 0 0 1-279.272727 0z m85.876363 0a53.76 53.76 0 1 0 107.52 0 53.76 53.76 0 0 0-107.52 0z"
                fill="#323333" p-id="6417"></path>
            </svg>
          </a-icon>
        </div>
        <textarea class="input" rows="1" :type="'text'" @keydown="keydownHandle"
          :placeholder="!iflogin ? '请先登录' : '请输入(剩余对话次数' + userinfo.chance.totalChatChance + ')'" v-model="value" />
        <div
          class=" flex justify-center items-center rounded-md flex-row text-gray-100 bg-gray-900  hover:bg-gray-600 hover:text-gray-100  "
          @click="sendMessage()">
          <SendOutlined class=" pl-3 pr-2 pb-2" rotate="-40" v-if="!sending" :style="{ fontSize: '24px' }" />
          <LoadingOutlined class="px-2.5 py-1" v-if="sending" :style="{ fontSize: '24px' }" />

          <!-- {{ sending ? '发送中...' : '发送' }} -->
        </div>
        <div v-if="ifphone" @click="cleanchat"
          class="flex justify-center items-center ml-2 px-2 rounded-md flex-row text-gray-100 bg-gray-900  hover:bg-gray-600 hover:text-gray-100 ">
          <DeleteOutlined :style="{ fontSize: '24px' }" />

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from "@/types";
import { ref, watch, watchEffect, nextTick, computed, onMounted, onUpdated } from "vue";
import { EventSourceParserStream } from 'eventsource-parser/stream'
import { chat } from "@/libs/gpt";
import cryptoJS from "crypto-js";
import Loding from "@/components/Loding.vue";
import Copy from "@/components/Copy.vue";
import { md } from "@/libs/markdown";
import LoginModal from '@/components/LoginModal.vue';
import { http, sse } from '@/common/request.js';
import { msgtemplate } from '@/common/msg.js';

import { Loading, Seedling } from "@icon-park/vue-next";
import { MessageApi } from 'vue3-dxui'
import { Cascader } from 'ant-design-vue';
import { Space } from 'ant-design-vue';

import { LoadingOutlined, SendOutlined, WalletOutlined, KeyOutlined, GlobalOutlined, SettingOutlined, EditOutlined, EllipsisOutlined, LogoutOutlined, RobotOutlined, ClearOutlined, MenuUnfoldOutlined, SmileOutlined } from '@ant-design/icons-vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import type { DrawerProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { reactive, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import type { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import VueComposition from '../components/vue-composition.vue';
import VueLegacy from '../components/vue-legacy.vue';


var srcMap = {
            'openai': 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/Frame%201019.png',
            'iflytek': 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/Frame%201021.png',
            'baidu': 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/baidu.png',
            'glm': 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/Frame%201022.png',
            'google': 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/google.png',
            
            
        };
interface FormStatepw {
  pass: string;
  checkPass: string;
  age: number | undefined;
}
const pwvalidateStatus = ref('false');
const formRef = ref();
const formStatepw: UnwrapRef<FormStatepw> = reactive({
  pass: '',
  checkPass: '',
  age: undefined,
});
let checkAge = async (rule: RuleObject, value: number) => {
  if (!value) {
    return Promise.reject('Please input the age');
  }
  if (!Number.isInteger(value)) {
    return Promise.reject('Please input digits');
  } else {
    if (value < 18) {
      return Promise.reject('Age must be greater than 18');
    } else {
      return Promise.resolve();
    }
  }
};
let validatePass = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请输入新的密码');
  } else {
    if (formStatepw.checkPass !== '') {
      formRef.value.validateFields('checkPass');
    }
    return Promise.resolve();
  }
};
let validatePass2 = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请再次输入密码');
  } else if (value !== formStatepw.pass) {
    return Promise.reject("两次输入的密码不一致");
  } else {
    return Promise.resolve();
  }
};

const pwrules = {
  pass: [
    {
      required: true,
      validator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)) {
            reject(new Error('必须包含字母和数字，不少于八位'));
          } else {
            resolve();
          }
        });
      },
      trigger: 'change'
    }
  ],
  checkPass: [{ validator: validatePass2, trigger: 'change' }],

};
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const handleFinish = (values: FormState) => {
  // console.log(values, formState);
};
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
  // console.log(errors);
};
const resetForm = () => {
  formRef.value.resetFields();
};



interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  type?: string;
  size: number;
  originFileObj: any;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
const form = reactive({
  name: '',
  phone: ''

});
// 修改密码
const pwvisible = ref<boolean>(false);

const showpwModal = () => {
  pwvisible.value = true;
};

const handlepwOk = (e: MouseEvent) => {
  // console.log(e);
  pwvisible.value = false;
};
const sevepw = () => {

  // console.log(formStatepw.checkPass);
  // console.log(formStatepw.pass);

  // console.log(pwvalidateStatus.value);

}


//头像上传

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}


const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');

const handleChange = (info: FileInfo) => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }

};
const noup = () => {

}
const beforeUpload = (file: FileItem) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


const rules = {
  name: [{ required: false, message: 'Please enter user name' }],

  // description: [{ required: false, message: 'Please enter url description' }],
};

const msgvisible = ref<boolean>(false);

const showmsgDrawer = () => {
  msgvisible.value = true;
};

const onmsgClose = () => {
  msgvisible.value = false;
};



const placement = ref<DrawerProps['placement']>('left');
const open = ref<boolean>(false);

const confirmLoading = ref<boolean>(false);
const ifusersend = ref(false)
const iffirstloud = ref(true)
// 声明一个apiKey变量，用于存储API密钥
let apiKey = "";
// 声明一个isConfig变量，用于存储配置是否打开的布尔值
let isConfig = ref(true);
// 声明一个isTalking变量，用于存储是否处于聊天状态的布尔值
let isTalking = ref(false);
// 声明一个messageContent变量，用于存储消息内容
let messageContent = ref("");
// 声明一个unload变量，用于存储是否卸载的布尔值
let unload = ref(false);
// 声明一个isProfileOpen变量，用于存储是否打开配置的布尔值
let isProfileOpen = ref(false)
// 声明一个visible变量，用于存储是否可见的布尔值
const visible = ref(false)
// 声明一个chatListDom变量，用于存储聊天列表DOM元素
const chatListDom = ref<HTMLDivElement>();

// 声明一个decoder变量，用于存储文本解码器
const decoder = new TextDecoder("utf-8");
// 声明一个roleAlias变量，用于存储角色别名
const roleAlias = { user: "ME", assistant: "LeChat", system: "System" };
// 声明一个sending变量，用于存储是否正在发送消息的布尔值
const sending = ref(false);
// 声明一个dialogId变量，用于存储对话ID
const dialogId = ref(0);
// 声明一个showRetry变量，用于存储是否显示重试按钮的布尔值
const showRetry = ref(false);
// 声明一个userinfo变量，用于存储用户信息
const userinfo = ref({ chance: { totalChatChance: 0 } });
// 声明一个upSending变量，用于存储是否正在上传消息的布尔值
const upSending = ref(false);
// 声明一个value变量，用于存储输入框的值
let value = ref("");
// 声明一个achat变量，用于存储聊天信息
const achat = ref<Chat[]>([]);
// 声明一个config变量，用于存储配置信息
const config = ref();
// 声明一个buttonText变量，用于存储按钮文本
const buttonText = ref("");
// 声明一个fristLoad变量，用于存储是否第一次加载的布尔值
const fristLoad = ref(true);
// 声明一个iflogin变量，用于存储是否登录的布尔值
const iflogin = ref(false)
// 声明一个ifuserup变量，用于存储是否用户上传的布尔值
const ifuserup = ref(false)
// 声明一个isModalOpen变量，用于存储是否打开模态的布尔值
const isModalOpen = ref(false)
// 声明一个setIsModalOpen变量，用于存储是否设置模态的布尔值
const setIsModalOpen = ref(false)
interface FormState {
  name: string;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});
const onSubmit = () => {
  // console.log('submit!', toRaw(formState));
  // console.log(toRaw(formState).desc);
  // 设置缓存
  localStorage.setItem('role', toRaw(formState).name);
  localStorage.setItem('prompt', toRaw(formState).desc);

  // confirmLoading.value = true;
  openfase.value = false;
  MessageApi.open({
    type: 'success',
    duration: 3000,
    content: '保存成功'
  })
  // confirmLoading.value = false;
  // setTimeout(() => {
  //   openfase.value = false;
  //   confirmLoading.value = false;
  // }, 2000);

};
const labelCol = { style: { width: '70px' } };
const wrapperCol = { span: 19 };
const openfase = ref(false)
interface Option {
  value: string; //得到的
  label: string; //看到的
  disabled?: boolean;
  children?: Option[];
}

const shoplist = ref(
  [
    {
      id: 1,
      price: '1元',
      title: '首充一元',
      rolelist: [
        '支持科大讯飞模型', '国内模型次数可用'
      ],


    },
    {
      id: 2,
      price: '1元',
      title: '十元充值',
      rolelist: [
        '支持科大讯飞模型', '国内模型次数可用'
      ]
    }, {
      id: 3,
      price: '1元',
      title: '五十元充值',
      rolelist: [
        '支持科大讯飞模型', '国内模型次数可用', 'gpt4模型可用'
      ]
    }, {
      id: 4,
      price: '1元',
      title: '月度会员',
      rolelist: [
        '支持科大讯飞模型', '国内模型次数可用', 'gpt4模型可用'

      ]
    }, {
      id: 5,
      price: '1元',
      title: '季度会员',
      rolelist: [
        '支持科大讯飞模型', '国内模型次数可用', 'gpt4模型可用'

      ]
    }, {
      id: 6,
      price: '1元',
      title: '年度会员',
      rolelist: [
        '支持科大讯飞模型', '国内模型次数可用', 'gpt3.5模型可用', 'gpt4模型可用'

      ]
    }
  ]

)
const options: Option[] = ref([
  {
    value: 'iflytek',
    label: 'iflytek',
    disabled: false,
    children: [
      {
        value: 'v3.1',
        label: 'v3.1',

      },
    ],
  },
  {
    value: 'openai',
    label: 'openai',
    children: [
      {
        value: 'gpt-3.5-turbo',
        label: 'gpt-3.5-turbo',

      },
      {
        value: 'gpt-4',
        label: 'gpt-4',

      },

    ],
  }

]);
const couldcontinue = ref(true)

const commommodel = ref(['iflytek', 'v3.1'])
interface Chat {


  content: string
  dialogId: number
  resourceId: number | null
  chatId: number | null
  model: string | null
  subModel: string | string | null
  role: string
  avatar: string | null
  isEffect: boolean

}
type Response = {

  achat: Chat[];

};
const ifphone = ref(false)
const chargeopen = ref(false);
const showchargeModal = () => {
  chargeopen.value = true;
};
const handchargeleOk = e => {
  // console.log(e);
  chargeopen.value = false;
};
const type = ref('composition');
const component = computed(
  () =>
  ({
    composition: VueComposition,
    legacy: VueLegacy,
  }[type.value])
);
onMounted(async () => {
  console.log(`
 ██╗      ████████╗  ███████╗██╗  ██╗ █████╗████████╗
 ██║      ██╔═════╝  ██╔════╝██║  ██║██╔══██╗  ██╔══╝
 ██║      ████████╗  ██║     ███████║███████║  ██║
 ██║      ██╔═════╝  ██║     ██╔══██║██╔══██║  ██║
 ████████╗████████╗  ███████╗██║  ██║██║  ██║  ██║
 ╚═══════╝╚═══════╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═╝
`);
  console.log(
    "%cUni-AI  \n%cWelcome to join us\nwww.uniai.us\n%c© 2024 中科苏州智能计算技术研究院. All Rights Reserved.  \n\n%c ",
    'font-family: "微软雅黑", sans-serif;font-size:50px;color: #2f3542;-webkit-text-fill-color: #2f3542;-webkit-text-stroke: #2f3542;text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3)',
    "font-family: '微软雅黑';color: #9C27B0;font-size:  20px;",
    "font-family: '微软雅黑';color: #9C27B0;font-size: 12px;",
    "color: red;font-size: 14px;"
  );
  //获取屏幕宽高
  const screenWidth = document.body.clientWidth;
  const screenHeight = document.body.clientHeight;
  if (screenHeight <= screenWidth) {
    ifphone.value = true
  }

  if (localStorage.getItem("role")) {
    formState.name = localStorage.getItem("role") as string
  }
  if (localStorage.getItem("prompt")) {
    formState.desc = localStorage.getItem("prompt") as string
  }


  const data = await http('config', {}, 'GET')
  const res = await data.json()
  if (res.status === 1) {
    // console.log(res.data)
    localStorage.setItem('config', JSON.stringify(res.data))

  }

  if (localStorage.getItem("token")) {
    iflogin.value = true;


    await getUserInfo()
    await init()


  } else {
    iflogin.value = false;
    achat.value = [
      {
        avatar: "",

        chatId: 0,

        content: `你好，我是LeChat，我可以提供一些常用服务和信息，例如：

1. 翻译：我可以把中文翻译成英文，英文翻译成中文，还有其他一些语言翻译，比如法语、日语、西班牙语等。

2. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面，我可以尽可能为你提供帮助。

3. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。

请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,

        dialogId: 0,

        isEffect: true,
        model: commommodel.value[0],

        resourceId: null,

        role: "assistant",

        subModel: commommodel.value[1],
      }
    ]
  }

  chatListDom.value?.scrollTo({
    top: chatListDom.value.scrollHeight,
    behavior: 'smooth' // 可选，使滚动平滑进行
  });




  if (chatListDom.value) {
    chatListDom.value.addEventListener('scroll', function () {
      if (chatListDom.value?.scrollTop === 0 && iflogin.value && clock == false) {
        // 到达顶部

        // console.log('滚动到顶部');

        refreshData();
      }
    });
  }

  iffirstloud.value = false

  // console.log(iflogin.value)
});

onUpdated(async () => {
  // console.log(ifusersend.value, iffirstloud.value)
  if (ifusersend.value || iffirstloud.value) {
    chatListDom.value?.scrollTo({
      top: chatListDom.value.scrollHeight,
      behavior: 'smooth' // 可选，使滚动平滑进行
    });
  }


})


const handleOk = () => {
  isModalOpen.value = false;

};

const handleCancel = () => {
  isModalOpen.value = false;

};
const showfilelist = () => {
  open.value = true;
}
const onClose = () => {
  open.value = false;
};
const modelOnChange = (value: string[]) => {

  commommodel.value = value
  // console.log(value)
};
var clock = false


const refreshData = async () => {
  if (achat.value.length == 0) return (upSending.value = false)

  ifuserup.value = true
  const nowList = achat.value[0]
  clock = true

  let data = await getListChat(nowList.chatId, 10)
  // console.log(data);
  if (data.length == 0) {
    MessageApi.open({
      type: 'error',
      duration: 3000,
      content: '暂无更多'
    })
  }

  // console.log(data);
  for (const i in data) {
    dialogId.value = data[i].dialogId
    // data[i].marked = marked(data[i].content, 'markdown', {
    //  theme: data[i].type ? 'dark' : 'light'
    // })
  }
  for (const item of data.reverse()) achat.value.unshift(item)
  setTimeout(() => {
    upSending.value = false
  }, 1000)
  clock = false
  // ifuserup.value = false

}


const clickConfig = () => {
  if (!isConfig.value) {
    clearMessageContent();

    visible.value = !visible.value
    // console.log(visible.value)
  } else {
    clearMessageContent();
    visible.value = !visible.value
    // console.log(visible.value)

  }
  switchConfigStatus();
};

const getSecretKey = () => "lianginx";




const switchConfigStatus = () => (isConfig.value = !isConfig.value);
//登录监听
const handleCustomEvent = async (options: any, param2: any) => {
  // options.value = options;

  // console.log('xsdsdsdsds',options);

  await getUserInfo()
  await init()
  iflogin.value = true
  chatListDom.value?.scrollTo({
    top: chatListDom.value.scrollHeight,
    behavior: 'smooth' // 可选，使滚动平滑进行
  });
}
const clearMessageContent = () => (messageContent.value = "");
const { confirm } = Modal
const cleanchat = async () => {

  // isModalOpen.value=true
  // console.log(123);
  if (
    !iflogin.value
  ) {
    // console.log('请先登录')
    // visible.value = true
    value.value = ''
    clickConfig()
    return 0
  } else {
    confirm({
      title: '您正在删除之前的聊天记录',

      content: '删除后无法撤回',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        sendDelmsg()
      },
      onCancel() {
        // console.log('Cancel');

      },

    })
  }

}

const sendDelmsg = async () => {

  try {
    const data = await http('del-dialog', {}, 'GET')
    const res = await data.json()
    // console.log(res)
    if (res.status == 1) {
      // userinfo.value = res.data
      // localStorage.setItem('userinfo', JSON.stringify(res.data))
      // console.log('删除成功');
      MessageApi.open({
        type: 'success',
        duration: 4000,
        content: '删除成功'
      })

      achat.value = [
        {
          avatar: "",

          chatId: 0,

          content: `你好，LeChat，我可以提供一些常用服务和信息，例如：

1. 翻译：我可以把中文翻译成英文，英文翻译成中文，还有其他一些语言翻译，比如法语、日语、西班牙语等。

2. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面，我可以尽可能为你提供帮助。

3. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。

请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,

          dialogId: 0,

          isEffect: true,

          model: commommodel.value[0],

          resourceId: null,

          role: "assistant",

          subModel: commommodel.value[1],
        }
      ]
    }
    else {

      MessageApi.open({
        type: 'success',
        duration: 4000,
        content: '删除失败'
      })

      // clearinfo()
      // closeProfile()
    }

  } catch (e) {

    // clearinfo()
    // closeProfile()
  }




  // console.log('OK');
}




function keydownHandle(event) {
  // console.log(event);

  if (event.keyCode === 13 && !event.ctrlKey && !event.metaKey) {
    // 如果只按下了Enter键，则执行事件a的逻辑
    // 这里可以添加事件a的处理逻辑
    event.stopPropagation()
    event.preventDefault()
    sendMessage()
  } else if (event.keyCode === 13 && (event.ctrlKey || event.metaKey)) {
    // 如果同时按下了Ctrl键和Enter键，则执行事件b的逻辑
    // 这里可以添加事件b的处理逻辑
    insertNewLine(event)
  }
}

// 换行
function insertNewLine(event) {
  // 检查是否按下了Ctrl键和Enter键
  if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
    // 在输入框中插入换行字符
    value.value += '\n'
    // toBottom()
  }
}

const stopmsg = async () => {
  couldcontinue.value = false
}
// 发送消息
const sendMessage = async () => {
  ifusersend.value = true
  if (
    !iflogin.value
  ) {
    // console.log('请先登录')
    // visible.value = true
    value.value = ''
    clickConfig()
    return 0
  }
  if (sending.value) return 0
  try {

    couldcontinue.value = true
    // check input
    ifuserup.value = false
    // console.log(ifuserup.value)

    if (!value.value.trim()) return
    if (!userinfo.value.chance.totalChatChance) throw new Error('对话次数用尽')
    if (sending.value) return
    // const check = await this.getChat()
    // if (check && check.dataId === 0) throw new Error('当前有流对话尚未结束')

    const input = value.value
    value.value = ''
    sending.value = true
    //用户
    achat.value.push({
      avatar: userinfo.value.avatar || config.value.DEFAULT_AVATAR_USER,
      content: input,
      role: 'user',
      dialogId: dialogId.value,
      userId: userinfo.value.id,
      chatId: 0,
      type: true
    })
    achat.value.push({
      avatar: userinfo.value.avatar || config.value.DEFAULT_AVATAR_USER,
      content: '',
      role: 'assistant',
      dialogId: dialogId.value,
      userId: userinfo.value.id,
      chatId: 0,
      type: true,
      model: commommodel.value[0],

      resourceId: null,

      role: "assistant",

      subModel: commommodel.value[1],

    })

    chatListDom.value?.scrollTo({
      top: chatListDom.value.scrollHeight,
      behavior: 'smooth' // 可选，使滚动平滑进行
    });




    //  window.scrollTo(0, document.body.scrollHeight);

    // this.scrollToBottom(200)

    await getChatStream(input)
    await getUserInfo()


  } catch (e) {

    // console.log(e);

    MessageApi.open({
      type: 'error',
      duration: 3000,
      content: e
    })

    if (buttonText.value == 'text') {

      sending.value = false
    }

  } finally {


    sending.value = false
  }
  ifusersend.value = false
}
let render
const getChatStream = async (input = '') => {
  //创建sse流式传输
  const response = await sse('chat-stream', {
    input,
    sse: true,
    dialogId: dialogId.value,
    provider: commommodel.value[0],
    model: commommodel.value[1],
    role: formState.name,
    prompt: formState.desc
  })


  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new EventSourceParserStream())
    .getReader()





  // achat.value.pop()
  //循环读取后续数据
  while (true) {

    chatListDom.value?.scrollTo({
      top: chatListDom.value.scrollHeight,
      behavior: 'smooth' // 可选，使滚动平滑进行
    });;

    sending.value = true
    const onceData = await reader.read()
    const res = JSON.parse(onceData.value.data)
    // console.log("status", res.status)
    const data = res.data
    let end
    if (couldcontinue.value == true) {
      if (res.status === 1) {

        if (achat.value.length == 0) {
          end = achat.value.length
        } else {
          end = achat.value.length - 1

        }

        if (!data) break
        if (data.dialogId !== dialogId.value) break

        // achat.value[end] = data
        if (achat.value[end].chatId === 0) achat.value[end] = data
        if (achat.value[end].chatId !== data.chatId) achat.value.push(data)
        if (onceData.done) break
        if (data.chatId > 0) break
      } else {

        achat.value.pop()

        throw new Error(res.msg)

      }
    } else {
      MessageApi.open({
        type: 'success',
        duration: 3000,
        content: '回答终止'
      })
      break
    }
    chatListDom.value?.scrollTo({
      top: chatListDom.value.scrollHeight,
      behavior: 'smooth' // 可选，使滚动平滑进行
    });
  }
  chatListDom.value?.scrollTo({
    top: chatListDom.value.scrollHeight,
    behavior: 'smooth' // 可选，使滚动平滑进行
  });

}

const showProfile = () => {
  isProfileOpen.value = true;
};
const closeProfile = () => {
  isProfileOpen.value = false;
};
const getUserInfo = async () => {
  try {
    const data = await http('userinfo', {}, 'GET')
    const res = await data.json()
    // console.log(res)
    if (res.status == 1) {
      userinfo.value = res.data
      localStorage.setItem('userinfo', JSON.stringify(res.data))
      // console.log(res.data.models)
      options.value = res.data.models

      if (res.data.avatar) imageUrl.value = res.data.avatar

      if (res.data.name) form.name = res.data.name

      if (res.data.phone) form.phone = res.data.phone


    }
    else {

      clearinfo()
      closeProfile()
    }

  } catch (e) {

    clearinfo()
    closeProfile()
  }


}
const logout = async () => {

  // window.scrollTo(0, document.body.scrollHeight);
  clearinfo()
  MessageApi.open({
    type: 'success',
    duration: 3000,
    content: '退出成功'
  })
}

const clearinfo = async () => {
  localStorage.clear()

  closeProfile()
  iflogin.value = false;
  achat.value = [
    {
      avatar: "",

      chatId: 0,

      content: `你好，我是LeChat，我可以提供一些常用服务和信息，例如：

1. 翻译：我可以把中文翻译成英文，英文翻译成中文，还有其他一些语言翻译，比如法语、日语、西班牙语等。

2. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面，我可以尽可能为你提供帮助。

3. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。

请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,

      dialogId: 0,

      isEffect: true,
      model: commommodel.value[0],

      resourceId: null,

      role: "assistant",

      subModel: commommodel.value[1],
    }
  ]
  dialogId.value = 0
}
const getListChat = async (lastId = 0, pageSize = 10) => {

  let data = []
  try {

    if (upSending.value) return

    upSending.value = true
    // console.log(123)
    const adata = await http('list-chat', {
      dialogId: dialogId.value,
      lastId,
      pageSize
    }, 'POST')
    const res = await adata.json()
    if (res.status == -1) {
      MessageApi.open({
        type: 'error',
        duration: 3000,
        content: '登陆失效，请重新登陆'
      })
      clearinfo()
      data = []
    } else {
      data = res.data

    }

    // console.log(data)

    // console.log(adata)
  } finally {
    upSending.value = false
  }
  return data

}
const init = async () => {
  iffirstloud.value = true
  try {
    achat.value = []

    const data = await getListChat()
    // console.log(data)
    if (data.length === 0) {
      achat.value = [
        {
          avatar: "",

          chatId: 0,

          content: `你好，我是LeChat，我可以提供一些常用服务和信息，例如：

1. 翻译：我可以把中文翻译成英文，英文翻译成中文，还有其他一些语言翻译，比如法语、日语、西班牙语等。

2. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面，我可以尽可能为你提供帮助。

3. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。

请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,

          dialogId: 0,

          isEffect: true,

          model: commommodel.value[0],

          resourceId: null,

          role: "assistant",

          subModel: commommodel.value[1],
        }
      ]
    }
    for (const item of data) {
      // console.log(item)
      dialogId.value = item.dialogId
      achat.value.push(item)
    }
    // console.log(achat.value)

    window.scrollTo(0, document.body.scrollHeight);

    // loopChat()
  } catch (e) {
    // uni.showToast({
    //   title: e.message,
    //   duration: 3000,
    //   icon: 'none'
    // })
    // console.log(e)
  }
  // console.log(123, achat.value)
  finally {
    iffirstloud.value = false
  }

}
const showface = async () => {

  openfase.value = true;



}
const facehandleOk = async (e: MouseEvent) => {
  // console.log(e);


  confirmLoading.value = true;
  setTimeout(() => {
    openfase.value = false;
    confirmLoading.value = false;
  }, 2000);
};
// watch(achat.value, () => nextTick(() => scrollToBottom()));

//用户信息板块
const changeuserinfo = () => {
  // console.log(12);
  showmsgDrawer()
}

//保存信息
const sevemsg = async () => {
  // console.log(imageUrl.value, form.name)
}


//商店

const choseItem = (e) => {
  console.log(e);

}

</script>

<style scoped>
pre {
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
    "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
    "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
    SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}

.profile-overlay {
  z-index: 999;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-dialog {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);

  /* top: 0; */
  /* left: 0; */
  right: 60px;
  top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  /* background-color: rgba(0, 0, 0, 0.5); */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  padding: 20px;
  border-radius: 4px;
  text-align: center;
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 100%; */
}

.asvg {
  width: 40px;
  height: 40px;
  animation: rotate 1s linear infinite;
}

circle {
  fill: none;
  stroke-width: 8;
  stroke-dasharray: 88;
  stroke-dashoffset: 88;
  transform-origin: center;
  transition: stroke-dashoffset 0.5s ease-in-out;
}

.progress {
  stroke-dashoffset: 0;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

textarea {
  resize: none;
}

.stop {

  background-color: rgba(41, 41, 41, 0.811);
  /* width: 300px; */
  font-size: 15px;
  border-radius: 6px;
  color: white;
}

.bg {}
</style>

