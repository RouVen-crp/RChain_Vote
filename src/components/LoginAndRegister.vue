<template>
    <v-app >
      <v-content class="fill-height" align-self="center" :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
        <v-container fluid align-self="center" class="transparent-container">
          <v-row justify="center" class="transparent-container">
            <v-col cols="14"  md="8" align-self="center" class="transparent-container">
              <v-card class="elevation-6 transparent-container">
                <v-window v-model="step" class="transparent-container">
                  <v-window-item :value="1" class="transparent-container">
                    <v-row>
                      <v-col cols="12" md="8">
                        
                        <v-card-text class="mt-12">
                          <h1
                            class="text-center display-2"
                          >Sign in</h1>
                          <div class="text-center mt-12">

                          </div>
                          <v-form>
                            <v-text-field
                              label="Username"
                              name="Username"
                              prepend-icon="email"
                              type="text"
                              color="teal accent-3"
                              v-model="LoginUserName"
                            />
  
                            <v-text-field
                              id="password"
                              label="Password"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              color="teal accent-3"
                              v-model="LoginPassword"
                            />
                          </v-form>
                          <!-- <h3 class="text-center mt-4">Forgot your password ?</h3> -->
                        </v-card-text>
                        <div class="text-center">
                          <v-btn rounded size="large" color="teal accent-3" @click="login">SIGN IN</v-btn>
                          <div class="text-center mt-12">

                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" md="3" class="teal accent-3">
                        <v-card-text class="white--text mt-8">
                          <h1 class="text-center display-1">Sir, this way!</h1>
                        </v-card-text>
                        <div class="text-center mt-8" >
                          <v-btn size="large" rounded outlined dark @click="step++">SIGN UP</v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-window-item>
                  <v-window-item :value="2">
                    <v-row class="fill-height">
                      <v-col cols="12" md="4" class="teal accent-3">
                        <v-card-text class="white--text mt-12">
                          <h1 class="text-center display-1">Welcome Back!</h1>
                        </v-card-text>
                        <div class="text-center mt-8">
                          <v-btn size="large" rounded outlined dark @click="step--">SIGN IN</v-btn>
                        </div>
                      </v-col>
  
                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                          <div class="text-center mt-12">
                            
                          </div>
                          <v-form>
                            <v-text-field
                              label="Userame"
                              name="Userame"
                              type="text"
                              color="teal accent-3"
                              v-model="UserName"
                            />
                            <v-text-field
                              label="PublicKey"
                              name="PublicKey"
                              type="text"
                              color="teal accent-3"
                            />
  
                            <v-text-field
                              id="password"
                              label="Password"
                              name="password"
                              color="teal accent-3"
                              v-model="PassWord"
                            />
                          </v-form>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn @click="register" rounded color="teal accent-3" dark size="large">SIGN UP</v-btn>
                          <div class="text-center mt-10">

                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-window-item>
                </v-window>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </template>
  
  <style>
  body {
    background-image: url('img\h1.jpg');
    background-size: cover; /* 或者 'contain'，根据需要选择 */
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>

<style scoped>
.transparent-container {
  background: rgba(255, 255, 255, 0); /* 调整最后一个值 (0.5) 以改变透明度，范围是 0（完全透明）到 1（完全不透明） */
}
</style>

  <script>
  import {get} from "@/router/axiosuse";
  import {post} from "@/router/axiosuse";
  export default {
    data: () => ({
      imageUrl: 'img\h1.jpg',
      step: 1
    }),
    methods: {
        Logged() {
            this.$router.push({ path: '/MainPage' })
        },
        login(){
          console.log("login")
          post(
            '/login',
            {
              ID:this.LoginUserName,
              password:this.LoginPassword,

            },
          ).then(res =>{
            console.log(res.data);
            alert(res.data);
            if(res.data!="passwordfault"&&res.data!="id not cunzai"){
              
              this.$router.push({ path: '/MainPage' })
            }
            else{
              alert(res.data);
            }
          })
        },
        register(){
          console.log("register")
          post(
            '/Register',
            {
              ID:this.UserName,
              password:this.PassWord,

            },
          ).then(res =>{
            console.log(res.data);
           
            alert(res.data);
           
            console.log(typeof res.data);
            
          })
        }
      
    },
    props: {
      source: String
    },
    
  };
  </script>