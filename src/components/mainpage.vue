<template>
    <v-app id="inspire">

      <!-- navigation-drawer是左侧导航栏 -->

      <v-navigation-drawer v-model="drawer"
      >
        <v-card
          class="pa-4"
          variant="tonal"
        >
          <v-avatar
            class="mb-4"
            color="grey-darken-1"
            size="64"
          >
        </v-avatar>  
  
          <div>Username here</div>
        </v-card>
  
        <v-divider></v-divider>
  
        <v-list>
        
          <v-list-item
          prepend-icon="mdi-send"
          title="Log Out"
          link
          @click="LogOut()"
          >
          </v-list-item> 

          <v-list-item
            prepend-icon="mdi-send"
            title="Make an Agenda"    
            link>

            <v-dialog
            v-model="dialognewagenda"
            activator="parent"
            persistent
            width="1024">
  
            <v-card>
              <v-card-title>
                <span class="text-h5">Make an Agenda! </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
  
                    <!-- <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                      readonly
                      >
                    </v-text-field>
                    </v-col> -->
  
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Name of your new Agenda*"
                        hint="example: Please vote for Joe Biden!"
                        required
                        clearable
                        v-model="NameOf_NewAgenda"
                      ></v-text-field>
                    </v-col>
  
  
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Number of Votes in your new Agenda*"
                        required
                        clearable
                      ></v-text-field>
                    </v-col>
                    
                  </v-row>
                </v-container>
                <small>*indicates required info</small>
              </v-card-text>
              
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  :ripple="{ class: 'text-red' }"
                  @click="dialognewagenda = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue-darken-4"
                  :ripple="{ class: 'text-green' }"
                  @click="submitAgenda()"
                >
                  Submit
                </v-btn>  
                
            </v-card>
             
          </v-dialog>

            </v-list-item>
                 
        <v-list-item
        prepend-icon="mdi-alert-octagon"
        title="Help"
        link
        >
        </v-list-item>

        </v-list>
      </v-navigation-drawer>

      <!-- v-main是中间的主体部分 -->
      <v-main>
        <v-container
          class="py-8 px-6"
          fluid
          v-model="AContainer"
        >
          <v-row>
            <v-col
              v-for="card in Acards"
              :key="card.id"
              cols="12"
            >
            <!-- card是agenda -->
            
              <v-card>
                <!-- toolbar是agenda的表头，包含删除功能 -->
                <v-toolbar :title="card.title" density="compact">
                  <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
                      <!-- 添加投票Vote -->
                      <v-dialog
                      v-model="dialognewvote"
                      width="1024"
                      >
                      <template v-slot:activator="{ props }">
                        <v-btn
                          color="primary"
                          v-bind="props"
                        >
                          Add Vote
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Add Vote for current Agenda! </span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row >

                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                :model-value="card.title"
                                label="Your current agenda:"
                                hint=""
                                readonly
                                >
                              </v-text-field>
                              </v-col>

                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <v-text-field
                                  label="Name for your new Vote: "
                                  hint="example: Please vote for Donald Biden!"
                                  required
                                ></v-text-field>
                              </v-col>

                                <v-col cols="12" sm="6" md="8">
                                  <v-select
                                  :items="['1', '2', '3', '4']"
                                    label="Number of Choices in your new Agenda*"
                                    required
                                    size="large"
                                    align-self="center"
                                    v-model="CreateVote_SelectedItem"
                                  ></v-select>  
                                </v-col>  
                                <v-col cols="auto" sm="6" md="4">
                                  <v-btn prepend-icon="mdi-check-circle" size="large" align-self="center" color="blue-darken-4"
                                  @click=" dialogCreateVote = true"
                                  >
                                    Customize choices! 
                                  </v-btn>
                                </v-col>
                                

                            </v-row>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                      </v-card>

                      <v-dialog
                      v-model="dialogCreateVote"
                      width="720">
                      <v-list lines="two">

                        <template v-for="i in VoteCount" :key="i">
                          <v-list-item>

                            <v-card :title="'Choice: '+i">

                              <v-text-field
                              label="Insert customized text here! "
                              prefix="/"></v-text-field>

                            </v-card>        

                            <!-- <v-list-item-title :title="`Message ${n}`"></v-list-item-title>  -->
        
                            <!-- <v-list-item-subtitle title="imilique"></v-list-item-subtitle> -->
                          </v-list-item>
        
                          <v-divider
                            v-if="i !== VoteCount"
                            :key="`divider-${n}`"
                          ></v-divider>
                        </template>

                        <v-list-item>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="red-darken-1"
                              variant="text"
                              @click="dialogCreateVote = false"
                              :ripple="{ class: 'text-red' }"
                            >
                              Discard
                            </v-btn>
                            <v-btn
                              color="blue-darken-4"
                              variant="text"
                              @click="dialogCreateVote = false"
                              :ripple="{ class: 'text-red' }"
                            >
                              SUBMIT
                            </v-btn>
                          </v-card-actions>
                        </v-list-item>

                      </v-list>
                    
                    </v-dialog>

                    </v-dialog>
          
                  <v-menu :location="end">
                    <template v-slot:activator="{ props }">
          
                      <v-btn 
                      icon="mdi-dots-vertical"
                      v-bind="props"
                      ></v-btn>
          
                    </template>
                      <!-- 删除议程Agenda -->
                        <v-btn
                    prepend-icon="mdi-delete"
                    :ripple="{ class: 'text-red' }"                   
                    @click="removeCard(card.id)">
                      Delete
                    </v-btn>
          
                  </v-menu>
                  
                </v-toolbar>
                
                <!-- 下面是每个agenda的具体投票项目 -->
                <v-list lines="two">
                  <!-- <v-list-subheader :title="card"></v-list-subheader> -->
                  <template v-for="n in 6" :key="n">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-avatar color="grey-darken-1"></v-avatar>
                      </template>
  
                      <v-list-item-title :title="`Message ${n}`"></v-list-item-title>
  
                      <!-- <v-list-item-subtitle title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique"></v-list-item-subtitle> -->
                    </v-list-item>
  
                    <v-divider
                      v-if="n !== 6"
                      :key="`divider-${n}`"
                      inset
                    ></v-divider>
                  </template>
                </v-list>
                <!-- 提交按钮Submit -->
                <v-btn align="right">

                </v-btn> 
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import addVote from '@/components/AddVote.vue'

    const drawer = ref(null)
  </script>
  
  <script>
    export default {
      
//下面是数据
      data: () => ({

        VoteCount: 1,
        CreateVote_SelectedItem: null,
        dialognewagenda: false,
        dialognewvote: false,
        dialogCreateVote: false,

        NameOf_NewAgenda: null,

        Acards: [
          {id: '1', title: 'Agenda1'},
          {id: '2', title: 'Agenda2'},
          {id: '3', title: 'agenda3'}
        ],
        drawer: null,
        links : [
        ['mdi-inbox-arrow-down', 'not decided'],
        ['mdi-send', 'Create Vote'],
        ['mdi-delete', 'Create Agenda'],
        ['mdi-alert-octagon', 'Help'],
    ],
      }),



// 下面是方法
      methods: {

        submitAgenda() {
          this.AddNewAgenda();
          this.dialognewagenda = false;
        
      },

      AddNewAgenda() {
        alert(this.NameOf_NewAgenda);
        const newcard = {
          id: this.Acards.length + 1,
          title: this.NameOf_NewAgenda,
        };
        this.AContainer.Acards.push(newcard);
        alert(JSON.stringify(this.Acards));
      },

      removeCard(cardID) {
        const index = this.Acards.findIndex((card) => card.id === cardID);
        this.Acards.splice(index, 1);
      },
      LogOut() {
            this.$router.push({ path: '/LogAndReg' })
        },

    },

    components: {
        addVote
      },
    computed: {
      VoteCount() {
        return parseInt(this.CreateVote_SelectedItem, 10);
      }
    }  
    }


  </script>
