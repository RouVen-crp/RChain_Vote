<template>
    <v-app id="inspire">
      <v-content>
        <v-container class="fill-height" fluid align-self="center">
          <v-row justify="center">
            <v-col cols="14" sm="20" md="8" >
              <v-card class="elevation-6">
                <v-window v-model="step">
                  <v-window-item :value="1">
                    <v-row>
                      <v-col cols="12" md="8">
                        
                        <v-card-text class="mt-12">
                          <h1
                            class="text-center display-2 teal--text text--accent-3"
                          >Sign in</h1>
                          <div class="text-center mt-4">
                            <!-- <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon></v-icon>
                            </v-btn>
  
                            <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon>fab fa-google-plus-g</v-icon>
                            </v-btn>
                            <v-btn class="mx-2" fab color="black" outlined>
                              <v-icon>fab fa-linkedin-in</v-icon>
                            </v-btn> -->
                          </div>
                          <v-form>
                            <v-text-field
                              label="Username"
                              name="Username"
                              prepend-icon="email"
                              type="text"
                              color="teal accent-3"
                            />
  
                            <v-text-field
                              id="password"
                              label="Password"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              color="teal accent-3"
                            />
                          </v-form>
                          <!-- <h3 class="text-center mt-4">Forgot your password ?</h3> -->
                        </v-card-text>
                        <div class="text-center mt-3">
                          <v-btn rounded color="teal accent-3" @click="Logged()" >SIGN IN</v-btn>
                        </div>
                      </v-col>
                      <v-col cols="12" md="4" class="teal accent-3">
                        <v-card-text class="white--text mt-12">
                          <h1 class="text-center display-1">Sir, this way!</h1>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
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
                        <div class="text-center">
                          <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                        </div>
                      </v-col>
  
                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                          <div class="text-center mt-4">
                            
                          </div>
                          <v-form>
                            <v-text-field
                              label="Userame"
                              name="Userame"
                              prepend-icon="person"
                              type="text"
                              color="teal accent-3"
                            />
                            <v-text-field
                              label="PublicKey"
                              name="PublicKey"
                              prepend-icon="email"
                              type="text"
                              color="teal accent-3"
                            />
  
                            <v-text-field
                              id="password"
                              label="Password"
                              name="password"
                              prepend-icon="lock"
                              type="password"
                              color="teal accent-3"
                            />
                          </v-form>
                        </v-card-text>
                        <div class="text-center mt-n5">
                          <v-btn rounded color="teal accent-3" dark>SIGN UP</v-btn>
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
  
  <script>
  export default {
    data: () => ({
      step: 1
    }),
    methods: {
        Logged() {
            this.$router.push({ path: '/MainPage' })
        }
    },
    props: {
      source: String
    },
    
  };
  </script>